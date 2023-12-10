import { getSiteInfo } from '@/lib/blog-helper';
import IconImageResponse from '@/lib/icon-image-response';

// Route segment config
export const runtime = 'nodejs';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default async function Icon() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error('Internal error.');
  }

  const { icon } = await getSiteInfo(databaseId);

  return IconImageResponse({ emoji: icon });
}
