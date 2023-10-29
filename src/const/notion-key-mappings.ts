export const NotionPropertyMappings = {
  title: process.env.NOTION_PROP_TITLE || 'Title',
  type: process.env.NOTION_PROP_TYPE || 'Type',
  topics: process.env.NOTION_PROP_TOPICS || 'Topics',
} as const;

