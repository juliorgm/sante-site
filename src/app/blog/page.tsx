// ================================================================
// 📝  BLOG — para adicionar artigos:
//
// 1. Crie um arquivo em: src/app/blog/[slug]/page.tsx
//    (copie o template de src/app/blog/_template.tsx)
//
// 2. Adicione um objeto ao array POSTS abaixo:
//    { slug, titulo, resumo, data, categoria, capa }
//
// 3. O artigo já ficará disponível em /blog/[slug]
// ================================================================

import Link from 'next/link'
import { POSTS } from '@/data/posts'

export const metadata = {
  title: 'Blog | Santé — Fisioterapia em Belém',
  description: 'Artigos sobre fisioterapia, postura, dor e qualidade de vida.',
}

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  return (
    <div className="pt-24">
      <div className="bg-cream section pb-12">
        <div className="max-w-6xl mx-auto">
          <span className="badge mb-4 inline-block">Blog</span>
          <h1 className="font-serif text-4xl md:text-5xl text-navy mb-4">
            Artigos e dicas de saúde
          </h1>
          <p className="text-gray-500 text-lg">
            Conteúdo educativo sobre fisioterapia, postura e qualidade de vida.
          </p>
        </div>
      </div>

      <div className="section bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card hover:shadow-md transition-shadow group">
              {/* Foto do artigo — descomente quando tiver imagem
              {post.capa && (
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 -mx-6 -mt-6">
                  <Image src={post.capa} alt={post.titulo} fill className="object-cover" />
                </div>
              )} */}
              <span className="badge text-xs mb-3 inline-block">{post.categoria}</span>
              <h2 className="font-serif text-lg text-navy mb-2 group-hover:text-teal transition-colors">
                {post.titulo}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.resumo}</p>
              <p className="text-gray-400 text-xs">{formatarData(post.data)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
