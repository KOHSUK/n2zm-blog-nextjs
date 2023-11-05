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
    <div className="sm:py-10 py-5 lg:max-w-screen-xl mx-auto">
      <h1 className="font-bold sm:text-4xl text-2xl sm:mb-6 mb-3">n2zm Blog</h1>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {articles.map((article) => (
          <Link href={`/article/${article.id}`} key={article.id} itemProp="url">
            <div className="aspect-w-16 aspect-h-9 rounded overflow-hidden shadow-lg mb-2 relative">
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
