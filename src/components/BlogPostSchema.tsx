import { SEO, CLINICA } from '@/data/config'

// ── Schema Markup para artigos do blog (JSON-LD) ───────────────
// Ajuda o Google a entender que é um artigo (pode aparecer com
// destaque na busca: autor, data, imagem). Recebe os dados do
// post (de src/data/posts.ts) e monta o schema automaticamente.
export default function BlogPostSchema({
  titulo,
  resumo,
  data,
  slug,
}: {
  titulo: string
  resumo: string
  data: string
  slug: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: titulo,
    description: resumo,
    datePublished: data,
    dateModified: data,
    url: `${SEO.url}/blog/${slug}`,
    author: {
      '@type': 'Organization',
      name: CLINICA.nome,
    },
    publisher: {
      '@type': 'Organization',
      name: CLINICA.nome,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SEO.url}/blog/${slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
