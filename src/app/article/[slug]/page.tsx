import { NotionPropertyMappings } from "@/const/notion-key-mappings";
import { getDatabase, getNotionClient } from "@/lib/notion/api";
import NotionToZennMd from "notion-to-zenn-md";
import markdownToHtml from "zenn-markdown-html";
import "zenn-content-css";
import Link from "next/link";
import ArticleType from "@/components/article-type";
import Topic from "@/components/topic";

export async function generateStaticParams() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error("Internal error.");
  }

  const notion = getNotionClient(process.env.NOTION_TOKEN);
  const pages = await getDatabase(notion, databaseId);

  return pages.map((page) => {
    return {
      slug: page.id,
    };
  });
}

export default async function ArticlePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const secret = process.env.NOTION_TOKEN;
  if (!secret) {
    throw new Error("Internal error.");
  }

  // convert Notion page to Zenn markdown
  const n2zm = new NotionToZennMd(secret);
  const markdown = await n2zm.pageToZennMarkdown(slug);

  // convert markdown to HTML
  const html = markdownToHtml(markdown);

  const { title, type, topics } = await n2zm.getFrontMatter(
    slug,
    NotionPropertyMappings
  );

  return (
    <div className="py-10 max-w-screen-md mx-auto">
      <header className="mb-6">
        <h1 className="font-bold text-4xl mb-6">{title}</h1>
        <div className="flex">
          <ArticleType type={type.toUpperCase()} />
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
