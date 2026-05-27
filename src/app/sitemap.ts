import { MetadataRoute } from 'next'
import { SERVICOS } from '@/data/services'
import { POSTS } from '@/data/posts'
import { SEO } from '@/data/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO.url.replace(/\/$/, '') // Remove barra no final se existir

  // 1. Rotas estáticas principais
  const staticRoutes = [
    '',
    '/sobre',
    '/especialidades',
    '/profissionais',
    '/blog',
    '/contato',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // 2. Rotas dinâmicas das Especialidades (Serviços)
  const especialidadesRoutes = SERVICOS.map((servico) => ({
    url: `${baseUrl}/especialidades/${servico.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 3. Rotas dinâmicas dos artigos do Blog
  const blogRoutes = POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.data),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...especialidadesRoutes, ...blogRoutes]
}
