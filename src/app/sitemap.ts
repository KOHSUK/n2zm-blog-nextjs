import { Env } from '@/const/env';
import { getDatabase, getNotionClient } from '@/lib/notion';
import { MetadataRoute } from 'next';
import urlJoin from 'url-join';

const defaultSiteMap = [
  {
    url: Env.BaseUrl,
    lastModified: new Date(),
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notion = getNotionClient(process.env.NOTION_TOKEN);
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    return defaultSiteMap;
  }

  const pages = await getDatabase(notion, databaseId);

  const siteMap = pages.map((page) => ({
    url: urlJoin(Env.BaseUrl, 'article', page.id),
    lastModified: page.last_edited_time,
  }));

  return [...defaultSiteMap, ...siteMap];
}
