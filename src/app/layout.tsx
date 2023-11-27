import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Site } from '@/const/site';
import { Env } from '@/const/env';
import Header from '@/components/header';
import { Footer } from '@/components/footer';

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
      <body className={`${inter.className} bg-screen flex flex-col min-h-full`}>
        <div className="md:mb-24 mb-8">
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
