import { getNotionClient, isImageBlock } from '@/lib/notion';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;

  const notion = getNotionClient(process.env.NOTION_TOKEN);
  const block = await notion.blocks.retrieve({ block_id: slug });

  if (!isImageBlock(block)) {
    return new Response('Not Found', { status: 404 });
  }

  const { image } = block;

  if (image.type === 'external') {
    const url = image.external.url;
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

  const url = image.file.url;
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
