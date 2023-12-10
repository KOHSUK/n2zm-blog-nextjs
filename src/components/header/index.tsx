import { getSiteInfo } from '@/lib/blog-helper';
import Link from 'next/link';

export default async function Header() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error('Internal error.');
  }

  const site = await getSiteInfo(databaseId);

  return (
    <header className="w-full font-bold md:text-4xl text-2xl px-4 md:px-0">
      <div className="xl:max-w-screen-xl md:max-w-screen-md mx-auto">
        <h1 className="w-full font-bold text-2xl py-4 text-screen-text">
          <Link href="/">{site.title}</Link>
        </h1>
      </div>
      <hr className="w-full border-1 border-tertiary" />
    </header>
  );
}
