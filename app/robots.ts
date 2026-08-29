import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/dashboard/', '/profile/'],
    },
    sitemap: 'https://english.iumorave-ac.org/sitemap.xml',
  };
}
