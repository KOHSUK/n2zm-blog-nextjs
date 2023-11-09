import { cache } from 'react';
import NotionToZennMd from 'notion-to-zenn-md';
import { NotionPropertyMappings } from '@/const/notion-key-mappings';
import markdownToHtml from 'zenn-markdown-html';
import {
  getDatabase,
  getNotionClient,
  isDateProperty,
  isMultiSelectProperty,
  isSelectProperty,
  isTitleProperty,
} from '../notion';
import { Site } from '@/const/site';
import 'server-only';

const getN2zm = cache((secret: string) => {
  return new NotionToZennMd(secret, {
    getImageUrl: ({ id }) => `/image/${id}`,
  });
});

export const getPageMarkdown = cache(async (secret: string, pageId: string) => {
  const n2zm = getN2zm(secret);

  const markdown = await n2zm.pageToZennMarkdown(pageId);

  return markdown;
});

export const getPageMetadata = cache(async (secret: string, pageId: string) => {
  const n2zm = getN2zm(secret);

  const metadata = await n2zm.getFrontMatter(pageId, NotionPropertyMappings);

  return metadata;
});

export const notionToHtml = cache(async (secret: string, pageId: string) => {
  const markdown = await getPageMarkdown(secret, pageId);

  const html = markdownToHtml(markdown, {
    embedOrigin: 'https://embed.zenn.studio',
  });

  return html;
});

export const getArticles = cache(async (databaseId: string) => {
  const notion = getNotionClient(process.env.NOTION_TOKEN);
  const pages = await getDatabase(notion, databaseId);

  const articles = pages.map((page) => {
    let title = 'Title';
    const titleProp = page.properties[NotionPropertyMappings.title];
    if (isTitleProperty(titleProp)) {
      title = titleProp.title.map((t) => t.plain_text).join('');
    }

    let type = 'tech';
    const typeProp = page.properties[NotionPropertyMappings.type];
    if (isSelectProperty(typeProp)) {
      type = typeProp.select.name;
    }

    let topics: string[] = [];
    const topicsProp = page.properties[NotionPropertyMappings.topics];
    if (isMultiSelectProperty(topicsProp)) {
      topics = topicsProp.multi_select.map((t) => t.name);
    }

    let publishedAt = '';
    const publishedAtProp = page.properties[NotionPropertyMappings.publishedAt];
    if (isDateProperty(publishedAtProp)) {
      publishedAt = new Date(publishedAtProp.date.start).toLocaleString(
        Site.locale.replace('_', '-'),
        {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        },
      );
    }

    return {
      id: page.id,
      title,
      type,
      topics,
      publishedAt,
      author: page.created_by.id,
    };
  });

  return articles;
});
