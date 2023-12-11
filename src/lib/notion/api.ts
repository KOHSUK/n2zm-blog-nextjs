/**
 * This module contains functions for interacting with the Notion API.
 * @packageDocumentation
 */

import { Client } from '@notionhq/client';
import { cache } from 'react';
import 'server-only';
import { Block, Pages, Page, User, Database } from './types';
import { NotionPropertyMappings } from '@/const/notion-property-mappings';

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
  async (notion: Client, databaseId: string): Promise<Pages> => {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: NotionPropertyMappings.published,
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: NotionPropertyMappings.publishedAt,
          direction: 'descending',
        },
      ],
    });

    return response.results as Pages;
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

/**
 * Retrieves a Notion user by their ID.
 * @param notion - The Notion client instance.
 * @param userId - The ID of the user to retrieve.
 * @returns The user object.
 */
export const getUser = cache(
  async (notion: Client, userId: string): Promise<User> => {
    const response = await notion.users.retrieve({
      user_id: userId,
    });

    return response as User;
  },
);

/**
 * Retrieves a Notion database by its ID.
 * @param notion - The Notion client instance.
 * @param databaseId - The ID of the database to retrieve.
 * @returns The database object.
 */
export const retrieveDatabase = cache(
  async (notion: Client, databaseId: string): Promise<Database> => {
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });

    return response as Database;
  },
);
