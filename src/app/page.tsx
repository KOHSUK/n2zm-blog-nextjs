import ArticlesList from '@/components/articles-list';

export const revalidate = 60 * 5; // revalidate at most every 5 minits

export default async function Page() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error('Internal error.');
  }

  return <ArticlesList databaseId={databaseId} />;
}
