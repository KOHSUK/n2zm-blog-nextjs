import Link from 'next/link';
// import NextImage from 'next/image';
import { getArticles } from '@/lib/blog-helper';
import Author from '@/components/author';

export default async function Home() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error('Internal error.');
  }

  const articles = await getArticles(databaseId);

  return (
    <div className="md:py-10 py-5 xl:max-w-screen-xl md:max-w-screen-md mx-auto">
      <h1 className="font-bold md:text-4xl text-2xl md:mb-24 mb-3">
        n2zm Blog
      </h1>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-8 md:gap-x-12 gap-y-20 md:gap-y-32">
        {articles.map((article) => (
          <Link href={`/article/${article.id}`} key={article.id} itemProp="url">
            <article>
              <div className="aspect-w-16 aspect-h-9 rounded overflow-hidden shadow-lg relative mb-2">
                {/* <NextImage
                  src={`/article/cover/${article.id}`}
                  alt="Card"
                  fill
                /> */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/article/cover/${article.id}`}
                  alt="Card"
                  className="object-cover w-full h-full"
                  style={{ aspectRatio: '16/9' }}
                />
              </div>
              <time className="text-gray-500 text-sm">
                {article.publishedAt}
              </time>
              <h2 className="text-xl font-bold my-4">{article.title}</h2>
              <Author userId={article.author} />
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
