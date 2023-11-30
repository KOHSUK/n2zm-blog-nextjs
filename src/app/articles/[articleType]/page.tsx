import ArticlesList from '@/components/articles-list';

export default async function Page({
  params: { articleType },
}: {
  params: { articleType: string };
}) {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error('Internal error.');
  }

  return <ArticlesList databaseId={databaseId} articleType={articleType} />;
}
