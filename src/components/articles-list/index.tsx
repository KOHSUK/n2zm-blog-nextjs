import { getArticles } from '@/lib/blog-helper';
import ArticleTypeLinks from '../article-type-links';
import Author from '../author';
import Link from 'next/link';

export default async function ArticlesList({
  databaseId,
  articleType,
}: {
  databaseId: string;
  articleType?: string;
}) {
  const articles = await getArticles(databaseId, { type: articleType });

  return (
    <div className="xl:max-w-screen-xl md:max-w-screen-md mx-auto">
      <div className="md:mb-12 mb-8">
        <ArticleTypeLinks databaseId={databaseId} currentType={articleType} />
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-8 md:gap-x-12 gap-y-20 md:gap-y-24">
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
