import CoverImageResponse from '@/lib/cover-image-response';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = '';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

type Props = {
  params: {
    slug: string;
  };
};

export default async function OpenGraphImage({ params: { slug } }: Props) {
  const secret = process.env.NOTION_TOKEN;
  if (!secret) {
    throw new Error('Internal error.');
  }

  return CoverImageResponse({ id: '0', title: 'n2zm Blog' });
}
