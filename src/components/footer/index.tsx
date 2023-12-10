import Link from 'next/link';
import { GitHubIcon, XIcon } from '../icons';
import { getSiteInfo } from '@/lib/blog-helper';

export async function Footer() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error('Internal error.');
  }

  const { userName } = await getSiteInfo(databaseId);

  return (
    <footer className="w-full bg-footer text-footer-text px-4 md:px-0">
      <div className="xl:max-w-screen-xl md:max-w-screen-md mx-auto py-4 flex">
        <h5 className="text-sm leading-6 h-6">© 2023 {userName}</h5>
        <div className="grow" />
        <div className="flex">
          <div className="mr-4">
            <Link
              href="https://twitter.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <XIcon width={24} height={24} />
            </Link>
          </div>
          <div>
            <Link
              href="https://github.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <GitHubIcon width={24} height={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
