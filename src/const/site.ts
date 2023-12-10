import { Env } from './env';

export const Site = {
  title: 'n2zm Blog',
  description: 'Demo Blog using Next.js, Notion, and notion-to-zenn-md',
  url: Env.BaseUrl,
  locale: 'en_US',
  icon: '🌵',
  userName: '',
} as const;
