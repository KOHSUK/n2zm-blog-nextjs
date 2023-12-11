import NotionToZennMd from 'notion-to-zenn-md';
import { NotionPropertyMappings } from '@/const/notion-property-mappings';
import CoverImageResponse from '@/lib/cover-image-response';

// Route segment config
export const runtime = 'nodejs';

// Image metadata
export const alt = 'ogp';

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

  const n2zm = new NotionToZennMd(secret);

  const { title } = await n2zm.getFrontMatter(slug, NotionPropertyMappings);

  return CoverImageResponse({ id: slug, title });
}
