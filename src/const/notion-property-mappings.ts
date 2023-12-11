export const NotionPropertyMappings = {
  title: process.env.NOTION_PROP_TITLE || 'Title',
  type: process.env.NOTION_PROP_TYPE || 'Type',
  topics: process.env.NOTION_PROP_TOPICS || 'Topics',
  published: process.env.NOTION_PROP_PUBLISHED || 'Published',
  publishedAt: process.env.NOTION_PROP_PUBLISHED_AT || 'Published At',
} as const;
