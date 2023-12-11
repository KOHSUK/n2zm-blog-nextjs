import { cache } from 'react';
import NotionToZennMd from 'notion-to-zenn-md';
import { NotionPropertyMappings } from '@/const/notion-property-mappings';
import markdownToHtml from 'zenn-markdown-html';
import {
  getDatabase,
  getNotionClient,
  getUser,
  isDateProperty,
  isEmojiProperty,
  isMultiSelectProperty,
  isSelectProperty,
  isTitleProperty,
  retrieveDatabase,
} from '../notion';
import { Site } from '@/const/site';
import { Env } from '@/const/env';
import 'server-only';

/**
 * Returns a new instance of NotionToZennMd with the provided secret.
 * @param {string} secret - The secret to use for the NotionToZennMd instance.
 * @returns {NotionToZennMd} - A new instance of NotionToZennMd.
 */
const getN2zm = cache((secret: string) => {
  return new NotionToZennMd(secret, {
    getImageUrl: ({ id }) => `/image/${id}`,
  });
});

/**
 * Returns the markdown of a page.
 * @param {string} secret - The secret to use for the NotionToZennMd instance.
 * @param {string} pageId - The ID of the page to get the markdown of.
 * @returns {Promise<string>} - The markdown of the page.
 */
export const getPageMarkdown = cache(async (secret: string, pageId: string) => {
  const n2zm = getN2zm(secret);

  const markdown = await n2zm.pageToZennMarkdown(pageId);

  return markdown;
});

/**
 * Returns the metadata of a page.
 * @param {string} secret - The secret to use for the NotionToZennMd instance.
 * @param {string} pageId - The ID of the page to get the metadata of.
 * @returns {Promise<object>} - The metadata of the page.
 */
export const getPageMetadata = cache(async (secret: string, pageId: string) => {
  const n2zm = getN2zm(secret);

  const metadata = await n2zm.getFrontMatter(pageId, NotionPropertyMappings);

  return metadata;
});

/**
 * Converts a page from Notion to HTML.
 * @param {string} secret - The secret to use for the NotionToZennMd instance.
 * @param {string} pageId - The ID of the page to convert to HTML.
 * @returns {Promise<string>} - The HTML of the page.
 */
export const notionToHtml = cache(async (secret: string, pageId: string) => {
  const markdown = await getPageMarkdown(secret, pageId);

  const html = markdownToHtml(markdown, {
    embedOrigin: 'https://embed.zenn.studio',
  });

  return html;
});

export type GetArticlesOption = {
  type?: string;
};

/**
 * Returns all articles from a database.
 * If the type option is set, filters the returned articles by type.
 * @param {string} databaseId - The ID of the database to get the articles from.
 * @param {GetArticlesOption} option - The options to use when getting the articles.
 * @returns {Promise<Array>} - The articles from the database.
 */
export const getArticles = cache(
  async (databaseId: string, option?: GetArticlesOption) => {
    const notion = getNotionClient(process.env.NOTION_TOKEN);
    const pages = await getDatabase(notion, databaseId);

    let articles = pages.map((page) => {
      let title = 'Title';
      const titleProp = page.properties[NotionPropertyMappings.title];
      if (isTitleProperty(titleProp)) {
        title = titleProp.title.map((t) => t.plain_text).join('');
      }

      let type = 'misc';
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
      const publishedAtProp =
        page.properties[NotionPropertyMappings.publishedAt];
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

    if (option?.type) {
      articles = articles.filter((article) => article.type === option.type);
    }

    return articles;
  },
);

/**
 * Returns all topics from a database.
 * @param {string} databaseId - The ID of the database to get the topics from.
 * @returns {Promise<Array>} - The topics from the database.
 */
export const getAllTopics = cache(async (databaseId: string) => {
  const articles = await getArticles(databaseId);

  const topics = Array.from(
    new Set(articles.flatMap((article) => article.topics)),
  ).sort((a, b) => a.localeCompare(b));

  return topics;
});

/**
 * Returns all article types from a database.
 * @param {string} databaseId - The ID of the database to get the article types from.
 * @returns {Promise<Array>} - The article types from the database.
 */
export const getAllArticleTypes = cache(async (databaseId: string) => {
  const articles = await getArticles(databaseId);

  const articleTypes = Array.from(
    new Set(articles.flatMap((article) => article.type)),
  ).sort((a, b) => a.localeCompare(b));

  return articleTypes;
});

/**
 * Retrieves site information from a Notion database.
 * @param {string} databaseId - The ID of the Notion database to retrieve the site information from.
 * @returns {Promise<Object>} - The site information including title, description, and url.
 */
export const getSiteInfo = cache(async (databaseId: string) => {
  const notion = getNotionClient(process.env.NOTION_TOKEN);
  const database = await retrieveDatabase(notion, databaseId);

  let icon: string = Site.icon;
  if (database.icon && isEmojiProperty(database.icon)) {
    icon = database.icon.emoji;
  }

  const user = await getUser(notion, database.created_by.id);

  return {
    ...Site,
    title: database.title.map((item) => item.plain_text).join(''),
    description: database.description.map((item) => item.plain_text).join(''),
    url: Env.BaseUrl,
    icon,
    userName: user.name || '',
  };
});
