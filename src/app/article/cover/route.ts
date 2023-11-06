import { NotionPropertyMappings } from '@/const/notion-key-mappings';
import NotionToZennMd from 'notion-to-zenn-md';
import CoverImageResponse from '../../../lib/cover-image-response';

export async function GET(request: Request) {
  console.log('request.url', request.url);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id == null) {
    return Response.error();
  }

  const secret = process.env.NOTION_TOKEN;
  if (!secret) {
    throw new Error('Internal error.');
  }

  const n2zm = new NotionToZennMd(secret);

  const { title } = await n2zm.getFrontMatter(id, NotionPropertyMappings);

  return CoverImageResponse({ id, title });
}
