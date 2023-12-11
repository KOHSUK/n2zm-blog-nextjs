import { getPageMetadata } from '@/lib/blog-helper';
import CoverImageResponse from '@/lib/cover-image-response';
import { Page, getNotionClient } from '@/lib/notion';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;

  const notion = getNotionClient(process.env.NOTION_TOKEN);
  const { cover } = (await notion.pages.retrieve({ page_id: slug })) as Page;

  if (!cover) {
    const secret = process.env.NOTION_TOKEN;
    if (!secret) {
      throw new Error('Internal error.');
    }

    const { title } = await getPageMetadata(secret, slug);

    return CoverImageResponse({ id: slug, title });
  }

  // `external` type
  if (cover.type === 'external') {
    const url = cover.external.url;
    // fetch image from the url and return it as response
    const response = await fetch(url);
    const headers = new Headers(response.headers);
    headers.set(
      'content-type',
      response.headers.get('content-type') || 'image/png',
    );
    headers.set('content-length', response.headers.get('content-length') || '');

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  }

  // `file` type
  const url = cover.file.url;
  const response = await fetch(url);
  const headers = new Headers(response.headers);
  headers.set(
    'content-type',
    response.headers.get('content-type') || 'image/png',
  );
  headers.set('content-length', response.headers.get('content-length') || '');

  return new Response(response.body, {
    status: response.status,
    headers,
  });
}
