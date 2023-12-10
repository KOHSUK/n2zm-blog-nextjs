import { getDatabase, getNotionClient } from '@/lib/notion/api';
import 'zenn-content-css';
import Link from 'next/link';
import ArticleType from '@/components/article-type';
import Topic from '@/components/topic';
import { Metadata } from 'next';
import { Env } from '@/const/env';
import urlJoin from 'url-join';
import { getPageMetadata, getSiteInfo, notionToHtml } from '@/lib/blog-helper';

export const revalidate = 60 * 5; // revalidate at most every 5 minits

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error('Internal error.');
  }

  const secret = process.env.NOTION_TOKEN;

  if (!secret) {
    throw new Error('Internal error.');
  }

  const { title } = await getPageMetadata(secret, slug);

  const site = await getSiteInfo(databaseId);

  return {
    metadataBase: new URL(Env.BaseUrl),
    title: `${title} | ${site.title}`,
    description: title,
    openGraph: {
      title,
      description: title,
      url: urlJoin(Env.BaseUrl, 'article', slug),
      siteName: site.title,
      locale: site.locale,
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
    <>
      <div className="mb-6">
        <h1 className="font-bold md:text-4xl text-2xl md:mb-12 mb-8">
          {title}
        </h1>
        <div className="flex">
          <ArticleType type={type.toUpperCase()} className="mr-1" />
          <div className="grow" />
          <div className="flex">
            {topics.map((topic) => (
              <Topic key={topic} topic={topic} className="mr-1" />
            ))}
          </div>
        </div>
      </div>
      <article>
        <div className="znc" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      <hr className="my-4" />
      <div>
        <Link href="/">
          <span className="text-blue-500 cursor-pointer">&#x2190; Go home</span>
        </Link>
      </div>
    </>
  );
}
