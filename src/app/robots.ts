import { MetadataRoute } from 'next'
import { SEO } from '@/data/config'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SEO.url.replace(/\/$/, '') // Remove barra no final se existir

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
