import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://xiu.celestial';
  
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/login', '/register'],
      disallow: ['/chat', '/dashboard', '/profile', '/bazi', '/artifacts', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
