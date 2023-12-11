import { getSiteInfo } from '@/lib/blog-helper';
import CoverImageResponse from '@/lib/cover-image-response';

// Route segment config
export const runtime = 'nodejs';

// Image metadata
export const alt = '';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const secret = process.env.NOTION_TOKEN;
  if (!secret) {
    throw new Error('Internal error.');
  }
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error('Internal error.');
  }

  const { title } = await getSiteInfo(databaseId);

  return CoverImageResponse({ id: '0', title });
}
