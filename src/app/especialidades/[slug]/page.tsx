import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICOS } from '@/data/services'
import { whatsappLink, WHATSAPP_MENSAGENS } from '@/data/config'

// Gera as URLs de todas as especialidades em build time (SSG = super rápido)
export function generateStaticParams() {
  return SERVICOS.map((s) => ({ slug: s.id }))
}

// SEO dinâmico por serviço
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const servico = SERVICOS.find((s) => s.id === params.slug)
  if (!servico) return {}
  return {
    title: `${servico.nome} | Santé — Fisioterapia em Belém`,
    description: servico.resumo,
  }
}

export default function EspecialidadePage({ params }: { params: { slug: string } }) {
  const servico = SERVICOS.find((s) => s.id === params.slug)
  if (!servico) notFound()

  // Outros serviços para sugerir no final
  const outros = SERVICOS.filter((s) => s.id !== servico.id).slice(0, 3)

  return (
    <div className="pt-24">
      {/* Hero do serviço */}
      <div className="bg-cream section pb-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/especialidades" className="text-teal text-sm hover:underline mb-6 inline-block">
            ← Voltar para especialidades
          </Link>
          <div className="text-5xl mb-4">{servico.icone}</div>
          <h1 className="font-serif text-4xl md:text-5xl text-navy mb-4">
            {servico.nome}
          </h1>
          <p className="text-gray-500 text-lg">{servico.resumo}</p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="section bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12">

          {/* Descrição */}
          <div className="md:col-span-2">
            <h2 className="font-serif text-2xl text-navy mb-4">Sobre o tratamento</h2>
            {/* O texto do campo descricao vem do services.ts */}
            {servico.descricao.split('\n\n').map((paragrafo, i) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-4">
                {paragrafo}
              </p>
            ))}

            {/* Benefícios */}
            <h3 className="font-serif text-xl text-navy mt-8 mb-4">Benefícios</h3>
            <ul className="flex flex-col gap-3">
              {servico.beneficios.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="text-teal mt-1 shrink-0">✓</span>
                  <span className="text-gray-600 text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar CTA */}
          <div>
            <div className="card sticky top-24 bg-cream border-0">
              <h3 className="font-serif text-lg text-navy mb-2">
                Tem interesse em {servico.nome}?
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Fale com a nossa equipe e tire todas as suas dúvidas antes de agendar.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={whatsappLink(servico.cta || WHATSAPP_MENSAGENS.agendamento)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center"
                >
                  Agendar agora
                </a>
                <a
                  href={whatsappLink(servico.cta || WHATSAPP_MENSAGENS.funcionamento)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-center"
                >
                  Tirar dúvidas
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-400 text-center">
                  Atendimento individual · 50 minutos · Fisioterapeuta especializado
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outros serviços */}
      {outros.length > 0 && (
        <div className="section bg-cream">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-2xl text-navy mb-8">Outras especialidades</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {outros.map((s) => (
                <Link key={s.id} href={`/especialidades/${s.id}`} className="card hover:shadow-md transition-shadow group">
                  <div className="text-2xl mb-3">{s.icone}</div>
                  <h3 className="font-serif text-lg text-navy group-hover:text-teal transition-colors">{s.nome}</h3>
                  <p className="text-gray-500 text-sm mt-2">{s.resumo}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
