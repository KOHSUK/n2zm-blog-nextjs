import { Page, getNotionClient } from '@/lib/notion';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;

  const notion = getNotionClient(process.env.NOTION_TOKEN);
  const { cover } = (await notion.pages.retrieve({ page_id: slug })) as Page;

  if (!cover) {
    return new Response('Not Found', { status: 404 });
  }

  // `external` type
  if (cover.type === 'external') {
    const url = cover.external.url;
    // fetch image from the url and return it as response
    const response = await fetch(url);
    const headers = new Headers(response.headers);
    headers.set('cache-control', 'public, max-age=31536000');
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
  headers.set('cache-control', 'public, max-age=31536000');
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
