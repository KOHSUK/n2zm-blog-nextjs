import { Env } from '@/const/env';
import { MetadataRoute } from 'next';
import urlJoin from 'url-join';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: urlJoin(Env.BaseUrl, 'sitemap.xml'),
  };
}
