import { Client } from '@notionhq/client';
import { cache } from 'react';
import 'server-only';
import { Block, Database, Page } from './types';

/**
 * Returns a new Notion client instance.
 * @param auth - The Notion API key.
 * @returns A new Notion client instance.
 */
export const getNotionClient = cache(
  (auth: string | undefined): Client =>
    new Client({
      auth,
    }),
);

/**
 * Retrieves a Notion database by its ID.
 * @param notion - The Notion client instance.
 * @param databaseId - The ID of the database to retrieve.
 * @returns The database object.
 */
export const getDatabase = cache(
  async (notion: Client, databaseId: string): Promise<Database> => {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Published', // The name of the property in your database that you want to filter by.
        checkbox: {
          equals: true,
        },
      },
    });

    return response.results as Database;
  },
);

/**
 * Retrieves a Notion page by its ID.
 * @param notion - The Notion client instance.
 * @param pageId - The ID of the page to retrieve.
 * @returns The page object.
 */
export const getPage = cache(
  async (notion: Client, pageId: string): Promise<Page> => {
    const response = await notion.pages.retrieve({ page_id: pageId });

    return response as Page;
  },
);

/**
 * Retrieves a Notion block by its ID.
 * @param notion - The Notion client instance.
 * @param blockId - The ID of the block to retrieve.
 * @returns The block object.
 */
export const getBlock = cache(
  async (notion: Client, blockId: string): Promise<Block> => {
    const response = await notion.blocks.retrieve({
      block_id: blockId,
    });

    return response as Block;
  },
);
