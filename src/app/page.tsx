import Link from 'next/link';
import NextImage from 'next/image';
import Topic from '@/components/topic';
import ArticleType from '@/components/article-type';
import { getArticles } from '@/lib/blog-helper';

export default async function Home() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error('Internal error.');
  }

  const articles = await getArticles(databaseId);

  return (
    <div className="py-10 max-w-screen-xl mx-auto">
      <h1 className="font-bold text-4xl mb-6">n2zm Blog</h1>
      <div className="grid grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link href={`/article/${article.id}`} key={article.id} itemProp="url">
            <div className="w-full h-60 rounded overflow-hidden shadow-lg mb-2 relative">
              <NextImage
                src={`/article/cover?id=${article.id}`}
                alt="Card"
                fill
              />
            </div>
            <div className="mb-1 text-right text-gray-500">
              <time>{article.publishedAt}</time>
            </div>
            <article>
              {/* <h2 className="text-xl font-bold mb-2">{article.title}</h2> */}
              <div className="flex">
                <ArticleType
                  type={article.type.toUpperCase()}
                  className="mr-1"
                />
                <div className="grow" />
                <div className="flex truncate">
                  {article.topics.map((topic) => (
                    <Topic
                      key={`${article.id}-${topic}`}
                      topic={topic}
                      className="mr-1"
                    />
                  ))}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
