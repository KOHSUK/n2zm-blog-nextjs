import { getDatabase, getNotionClient } from '@/lib/notion/api';
import 'zenn-content-css';
import Link from 'next/link';
import ArticleType from '@/components/article-type';
import Topic from '@/components/topic';
import { Metadata } from 'next';
import { Env } from '@/const/env';
import { Site } from '@/const/site';
import urlJoin from 'url-join';
import { getPageMetadata, notionToHtml } from '@/lib/blog-helper';

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const secret = process.env.NOTION_TOKEN;
  if (!secret) {
    throw new Error('Internal error.');
  }

  const { title } = await getPageMetadata(secret, slug);

  return {
    metadataBase: new URL(Env.BaseUrl),
    title: `${title} | ${Site.name}`,
    description: title,
    openGraph: {
      title,
      description: title,
      url: urlJoin(Env.BaseUrl, 'article', slug),
      siteName: Site.name,
      locale: Site.locale,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error('Internal error.');
  }

  const notion = getNotionClient(process.env.NOTION_TOKEN);
  const pages = await getDatabase(notion, databaseId);

  return pages.map((page) => ({
    slug: page.id,
  }));
}

export default async function ArticlePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const secret = process.env.NOTION_TOKEN;
  if (!secret) {
    throw new Error('Internal error.');
  }

  const html = await notionToHtml(secret, slug);

  const { title, type, topics } = await getPageMetadata(secret, slug);

  return (
    <div className="py-10 max-w-screen-md mx-auto">
      <header className="mb-6">
        <h1 className="font-bold text-4xl mb-6">{title}</h1>
        <div className="flex">
          <ArticleType type={type.toUpperCase()} className="mr-1" />
          <div className="grow" />
          <div className="flex">
            {topics.map((topic) => (
              <Topic key={topic} topic={topic} className="mr-1" />
            ))}
          </div>
        </div>
      </header>
      <article>
        <div className="znc" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      <hr className="my-4" />
      <footer>
        <Link href="/">
          <span className="text-blue-500 cursor-pointer">&#x2190; Go home</span>
        </Link>
      </footer>
    </div>
  );
}