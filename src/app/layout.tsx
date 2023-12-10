import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Env } from '@/const/env';
import Header from '@/components/header';
import { Footer } from '@/components/footer';
import { getSiteInfo } from '@/lib/blog-helper';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error('Internal error.');
  }

  const site = await getSiteInfo(databaseId);

  const metadata: Metadata = {
    metadataBase: new URL(Env.BaseUrl),
    title: site.title,
    description: site.description,
    openGraph: {
      title: site.title,
      description: site.description,
      url: site.url,
      siteName: site.title,
      locale: site.locale,
      type: 'website',
    },
  };
  return metadata;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-screen flex flex-col min-h-full`}>
        <div className="md:mb-12 mb-8">
          <Header />
        </div>
        <div className="w-full flex-1 md:mb-24 mb-3">
          <div className="px-4 md:px-0 mx-auto">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
