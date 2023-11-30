import { getAllArticleTypes } from '@/lib/blog-helper';
import Link from 'next/link';
import ArticleType from '../article-type';

export default async function ArticleTypeLinks({
  databaseId,
  currentType,
}: {
  databaseId: string;
  currentType: string | undefined;
}) {
  const articleTypes = await getAllArticleTypes(databaseId);

  return (
    <div className="flex">
      <Link className="mr-2" href="/">
        <ArticleType type="ALL" outlined={!!currentType} />
      </Link>
      {articleTypes.map((articleType) => (
        <Link
          className="mr-2"
          key={articleType}
          href={`/articles/${articleType}`}
        >
          <ArticleType
            type={articleType.toUpperCase()}
            outlined={currentType !== articleType}
          />
        </Link>
      ))}
    </div>
  );
}
