export const Env = {
  BaseUrl: process.env.BASE_URL || 'http://localhost:3000',
  NotionToken: process.env.NOTION_TOKEN,
  NotionDatabaseId: process.env.NOTION_DATABASE_ID,
} as const;
