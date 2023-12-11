import IconImageResponse from '@/lib/icon-image-response';
import { getNotionClient, getUser } from '@/lib/notion';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;

  const notion = getNotionClient(process.env.NOTION_TOKEN);
  const user = await getUser(notion, slug);

  if (!user.avatar_url) {
    return IconImageResponse({ emoji: '👨‍' });
  }

  const response = await fetch(user.avatar_url);
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
