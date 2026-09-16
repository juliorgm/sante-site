import Image from 'next/image'
import Link from 'next/link'
import { CLINICA, WHATSAPP_MENSAGENS } from '@/data/config'
import WhatsAppLink from '@/components/WhatsAppLink'
import { SERVICOS } from '@/data/services'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import { EQUIPE } from '@/data/team'
import { MIDIA } from '@/data/midia'
import VideoFacade from '@/components/VideoFacade'

// ── SEÇÃO HERO ─────────────────────────────────────────────────
function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-cream pt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center py-20">

        {/* Texto */}
        <div>
          {/* Badge diferencial — EDITE em CLINICA.slogan no config.ts */}
          <span className="badge mb-6 inline-block">
            ✦ Atendimento individual de 50 minutos
          </span>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-navy leading-tight mb-6">
            {/* EDITE em CLINICA.slogan no config.ts */}
            {CLINICA.slogan}
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
            {CLINICA.descricao}
          </p>

          <div className="flex flex-wrap gap-3">
            <WhatsAppLink
              mensagem={WHATSAPP_MENSAGENS.agendamento}
              secao="hero"
              assunto="agendamento"
              className="btn-primary"
            >
              Fale com a gente
            </WhatsAppLink>
            <WhatsAppLink
              mensagem={WHATSAPP_MENSAGENS.funcionamento}
              secao="hero"
              assunto="funcionamento"
              className="btn-outline"
            >
              Como funciona?
            </WhatsAppLink>
          </div>

          {/* Stats de confiança */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-gray-200">
            {/* EDITE estes números conforme a realidade da clínica */}
            {[
              { numero: '50min',  label: 'de atendimento\nindividual' },
              { numero: '100%',   label: 'sessões com\nfisioterapeuta' },
              { numero: 'Belém',  label: 'do Pará' },
            ].map((stat) => (
              <div key={stat.numero}>
                <div className="text-2xl font-serif text-teal font-bold">{stat.numero}</div>
                <div className="text-xs text-gray-400 mt-1 leading-tight whitespace-pre-line">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Imagem hero */}
        {/* TROQUE a foto: coloque em /public/images/hero.jpg */}
        <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-xl">
          <Image
            src="/images/hero-2.jpg"
            alt="Fisioterapeuta atendendo paciente na Santé"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay com card de CTA */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <p className="text-navy font-medium text-sm mb-2">
              Primeira consulta — avaliação completa
            </p>
            <WhatsAppLink
              mensagem={WHATSAPP_MENSAGENS.funcionamento}
              secao="hero_card"
              assunto="funcionamento"
              className="btn-primary text-xs w-full justify-center"
            >
              Como funciona a avaliação
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── SEÇÃO DIFERENCIAL ──────────────────────────────────────────
function Diferencial() {
  return (
    <section className="bg-navy text-white py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
        <h2 className="font-serif text-3xl md:text-4xl mb-4">
          Por que escolher a Santé?
        </h2>
        <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto">
          Não somos uma clínica de atendimento em massa. Cada paciente tem atenção exclusiva.
        </p>

        {/* EDITE os diferenciais abaixo conforme a realidade da clínica */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icone: '⏱️',
              titulo: '50 minutos só pra você',
              texto: 'Cada sessão é dedicada inteiramente ao seu tratamento. Sem divisão de atenção, sem pressa.',
            },
            {
              icone: '🎓',
              titulo: 'Fisioterapeutas especializados',
              texto: 'Toda sessão é conduzida por fisioterapeuta com especialização comprovada na sua área de tratamento.',
            },
            {
              icone: '📋',
              titulo: 'Protocolo personalizado',
              texto: 'Avaliação detalhada na primeira consulta e plano de tratamento criado especificamente para o seu caso.',
            },
          ].map((item) => (
            <div key={item.titulo} className="text-left p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl mb-4">{item.icone}</div>
              <h3 className="font-serif text-xl text-gold mb-2">{item.titulo}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── SEÇÃO SERVIÇOS ─────────────────────────────────────────────
function Servicos() {
  // Mostra apenas serviços com destaque: true (máx 3)
  const destaques = SERVICOS.filter((s) => s.destaque).slice(0, 3)

  return (
    <section className="section bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="badge mb-3 inline-block">Especialidades</span>
          <h2 className="section-title">O que tratamos</h2>
          <p className="section-subtitle">
            Cada especialidade com protocolo próprio, conduzida por profissional especializado.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {destaques.map((servico) => (
            <div key={servico.id} className="card hover:shadow-md transition-shadow group">
              <div className="text-3xl mb-4">{servico.icone}</div>
              <h3 className="font-serif text-xl text-navy mb-2">{servico.nome}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{servico.resumo}</p>
              <WhatsAppLink
                mensagem={servico.cta || WHATSAPP_MENSAGENS.geral}
                secao="card_servico"
                assunto={servico.id}
                className="text-teal text-sm font-medium hover:underline"
              >
                Saiba mais →
              </WhatsAppLink>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/especialidades" className="btn-outline">
            Ver todas as especialidades
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── SEÇÃO DEPOIMENTOS ──────────────────────────────────────────
// ── SEÇÃO DEPOIMENTOS ──────────────────────────────────────────
function Depoimentos() {
  return (
    <section className="section bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="badge mb-3 inline-block">Depoimentos</span>
          <h2 className="section-title text-center">O que dizem nossos pacientes</h2>
          <p className="section-subtitle mx-auto text-center">
            Histórias reais de quem recuperou a qualidade de vida na Santé.
          </p>
        </div>
        <TestimonialsCarousel />
      </div>
    </section>
  )
}

// ── SEÇÃO SANTÉ NA MÍDIA ───────────────────────────────────────
// Autoridade de terceiros: a validação vem de fora, não da própria
// clínica. Por isso fica DEPOIS dos depoimentos e ANTES da equipe —
// fecha o bloco de prova social e abre o de credenciais.
function Midia() {
  const destaque = MIDIA.find((m) => m.destaque)
  if (!destaque) return null

  const capa =
    'https://img.youtube.com/vi/' + destaque.youtubeId + '/maxresdefault.jpg'

  // Rich snippet de vídeo. Só emitimos o schema se publicadoEm estiver
  // preenchido: o Google exige uploadDate, e data inventada é pior que
  // schema ausente. Ver TODO-DATA em src/data/midia.ts.
  const schema = destaque.publicadoEm
    ? {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: destaque.titulo,
        description: destaque.resumo,
        thumbnailUrl: capa,
        uploadDate: destaque.publicadoEm,
        duration: destaque.duracaoISO,
        embedUrl:
          'https://www.youtube-nocookie.com/embed/' + destaque.youtubeId,
      }
    : null

  return (
    <section className="section bg-navy">
      <div className="max-w-4xl mx-auto">
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}

        <div className="mb-10 text-center">
          <span className="inline-block bg-gold/15 text-gold text-xs font-medium px-3 py-1 rounded-full mb-3">
            Santé na mídia
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            {destaque.participante} no {destaque.veiculo}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {destaque.resumo}
          </p>
        </div>

        <VideoFacade item={destaque} />
      </div>
    </section>
  )
}

// ── SEÇÃO EQUIPE ───────────────────────────────────────────────
function Equipe() {
  const destaques = EQUIPE.filter((p) => p.destaque)

  return (
    <section className="section bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="badge mb-3 inline-block">Nossa equipe</span>
          <h2 className="section-title">Profissionais especializados</h2>
          <p className="section-subtitle">
            Fisioterapeutas com registro no CREFITO e especializações comprovadas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {destaques.map((prof) => (
            <div key={prof.id} className="flex gap-5 card">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={prof.foto}
                  alt={prof.nome}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-lg text-navy">{prof.nome}</h3>
                <p className="text-teal text-sm font-medium mb-1">{prof.titulo}</p>
                <p className="text-gray-400 text-xs mb-2">{prof.crefito}</p>
                <div className="flex flex-wrap gap-1">
                  {prof.especializacoes.map((esp) => (
                    <span key={esp} className="text-xs bg-navy/5 text-navy/70 px-2 py-0.5 rounded-full">
                      {esp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/profissionais" className="btn-outline">
            Conhecer toda a equipe
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── CTA FINAL ──────────────────────────────────────────────────
function CTAFinal() {
  return (
    <section className="section bg-teal text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl mb-4">
          Pronto para viver sem dor?
        </h2>
        <p className="text-white/80 text-lg mb-8">
          Fale com nossa equipe e tire todas as dúvidas antes de dar o primeiro passo.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <WhatsAppLink
            mensagem={WHATSAPP_MENSAGENS.agendamento}
            secao="cta_final"
            assunto="agendamento"
            className="bg-white text-teal px-8 py-3 rounded-full font-medium hover:bg-cream transition-colors"
          >
            Fale com a gente
          </WhatsAppLink>
          <WhatsAppLink
            mensagem={WHATSAPP_MENSAGENS.funcionamento}
            secao="cta_final"
            assunto="funcionamento"
            className="border border-white/40 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
          >
            Tirar dúvidas primeiro
          </WhatsAppLink>
        </div>
      </div>
    </section>
  )
}

// ── PAGE EXPORT ────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <Diferencial />
      <Servicos />
      <Depoimentos />
      <Midia />
      <Equipe />
      <CTAFinal />
    </>
  )
}
