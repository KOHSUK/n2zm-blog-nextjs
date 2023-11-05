import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Site } from '@/const/site';
import { Env } from '@/const/env';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(Env.BaseUrl),
  title: Site.name,
  description: Site.description,
  openGraph: {
    title: Site.name,
    description: Site.description,
    url: Site.url,
    siteName: Site.name,
    locale: Site.locale,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="px-4 mx-auto">{children}</div>
      </body>
    </html>
  );
}
