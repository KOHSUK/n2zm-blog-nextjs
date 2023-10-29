import { getDatabase, getNotionClient } from "@/lib/notion/api";
import {
  isMultiSelectProperty,
  isSelectProperty,
  isTitleProperty,
} from "@/lib/notion";
import { NotionPropertyMappings } from "@/const/notion-key-mappings";
import Link from "next/link";
import NextImage from "next/image";
import Topic from "@/components/topic";
import ArticleType from "@/components/article-type";

async function getArticles(databaseId: string) {
  const notion = getNotionClient(process.env.NOTION_TOKEN);
  const pages = await getDatabase(notion, databaseId);

  const articles = pages.map((page) => {
    let title = "Title";
    let titleProp = page.properties[NotionPropertyMappings.title];
    if (isTitleProperty(titleProp)) {
      title = titleProp.title.map((t) => t.plain_text).join("");
    }

    let type = "tech";
    let typeProp = page.properties[NotionPropertyMappings.type];
    if (isSelectProperty(typeProp)) {
      type = typeProp.select.name;
    }

    let topics: string[] = [];
    let topicsProp = page.properties[NotionPropertyMappings.topics];
    if (isMultiSelectProperty(topicsProp)) {
      topics = topicsProp.multi_select.map((t) => t.name);
    }

    return {
      id: page.id,
      title,
      type,
      topics,
    };
  });

  return articles;
}

export default async function Home() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error("Internal error.");
  }

  const articles = await getArticles(databaseId);

  return (
    <div className="py-10 max-w-screen-xl mx-auto">
      <h1 className="font-bold text-4xl mb-6">n2zm Blog</h1>
      <div className="grid grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link href={`/article/${article.id}`} key={article.id} itemProp="url">
            <div
              className={`w-full h-60 rounded overflow-hidden shadow-lg mb-4 relative`}
            >
              <NextImage
                src={`/article/cover?id=${article.id}`}
                alt="Card"
                fill
              />
            </div>
            <article>
              {/* <h2 className="text-xl font-bold mb-2">{article.title}</h2> */}
              <div className="flex">
                <ArticleType type={article.type.toUpperCase()} />
                <div className="grow" />
                <div className="flex">
                  {
                    article.topics.map((topic) => (
                      <Topic key={`${article.id}-${topic}`} topic={topic} className="mr-1" />
                    ))
                  }
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
