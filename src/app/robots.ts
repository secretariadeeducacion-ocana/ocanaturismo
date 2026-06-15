import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.ocanaturismo.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
