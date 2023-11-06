import Link from 'next/link';
import NextImage from 'next/image';
import { getArticles } from '@/lib/blog-helper';
import Author from '@/components/author';

export default async function Home() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error('Internal error.');
  }

  const articles = await getArticles(databaseId);

  return (
    <div className="sm:py-10 py-5 lg:max-w-screen-xl mx-auto">
      <h1 className="font-bold sm:text-4xl text-2xl sm:mb-6 mb-3">n2zm Blog</h1>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-8 gap-y-20 sm:gap-y-40">
        {articles.map((article) => (
          <Link href={`/article/${article.id}`} key={article.id} itemProp="url">
            <article>
              <div className="aspect-w-16 aspect-h-9 rounded overflow-hidden shadow-lg mb-2 relative">
                <NextImage
                  src={`/article/cover/${article.id}`}
                  alt="Card"
                  fill
                />
              </div>
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <div className="mb-2 text-gray-500">
                <time>{article.publishedAt}</time>
              </div>
              <Author userId={article.author} />
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
