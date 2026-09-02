import Link from 'next/link'
import { whatsappLink, WHATSAPP_MENSAGENS } from '@/data/config'

export const metadata = {
  title: 'Pilates em Belém | Fisioterapeuta Especializado — Santé',
  description: 'Pilates com fisioterapeuta em Belém. Avaliação individual, acompanhamento de perto e cuidado contínuo pra dor, gestação, pós-parto ou movimento. Fale com a gente.',
}

const CTA_CONVERSAR    = 'Olá! Gostaria de saber mais sobre o Pilates da Santé.'
const CTA_AGENDAMENTO  = 'Olá! Quero agendar minha avaliação para o Pilates.'

export default function PilatesPage() {
  return (
    <div className="pt-24">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="bg-cream section pb-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/especialidades" className="text-teal text-sm hover:underline mb-8 inline-block">
            ← Voltar para especialidades
          </Link>

          {/* SEO H1 visível mas discreto */}
          <p className="text-teal text-sm font-medium tracking-wide uppercase mb-3">
            Pilates em Belém
          </p>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-navy leading-tight mb-6">
            Seu corpo está pedindo isso há um tempo
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-2xl">
            Aquela dor que já virou rotina. Aquela postura que você promete corrigir
            "segunda-feira". Aquela vontade de se mover com mais liberdade, sem pensar
            duas vezes antes de abaixar ou levantar. A gente conhece essa história —
            e sabe como ela pode mudar.
          </p>

          
           <a href={whatsappLink(CTA_CONVERSAR)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary">
            Quero começar essa mudança
          </a>

          {/* FOTO AQUI — quando tiver a imagem:
          <div className="relative rounded-3xl overflow-hidden aspect-video mt-12 shadow-xl">
            <Image
              src="/images/especialidades/pilates-studio.jpg"
              alt="Studio de Pilates da Santé em Belém — ambiente acolhedor com luz natural"
              fill
              className="object-cover"
              priority
            />
          </div>
          */}
        </div>
      </section>

      {/* ── BLOCO 1 — A dor com nome ──────────────────────────── */}
      <section className="section bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Talvez você tenha se acostumado. A dor na lombar depois de um dia sentado.
              O ombro travado. A sensação de que o corpo não responde mais como antes.
              Ou talvez esteja grávida, ou tenha acabado de ter um bebê, e sinta que o
              corpo é outro agora — e ninguém te ensinou como lidar com isso.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Não tem nada de errado com você. O corpo fala, e a maioria de nós aprendeu
              a não escutar.
            </p>
             <p className="text-gray-600 leading-relaxed">
              O Pilates que fazemos na Santé começa exatamente aí: <strong className="font-medium text-navy">escutando</strong>.
              Tudo parte de uma avaliação individual, feita por fisioterapeuta, pra entender
              de onde vem a sua dor, o que o seu corpo está tentando dizer, e o que ele
              realmente precisa. É esse cuidado no início que faz toda a diferença lá na frente.
            </p>
          </div>

          {/* FOTO AQUI — quando tiver a imagem:
          <div className="relative rounded-2xl overflow-hidden aspect-square shadow-lg">
            <Image
              src="/images/especialidades/pilates-avaliacao.jpg"
              alt="Fisioterapeuta conversando com paciente durante avaliação na Santé"
              fill
              className="object-cover"
            />
          </div>
          */}

          {/* Placeholder visual até ter a foto */}
          <div className="bg-cream rounded-2xl p-8 flex flex-col gap-4">
            {[
              { icone: '🫀', texto: 'Dor lombar crônica' },
              { icone: '🤰', texto: 'Pilates na gestação' },
              { icone: '👶', texto: 'Recuperação pós-parto' },
              { icone: '🧍', texto: 'Correção postural' },
              { icone: '⚡', texto: 'Retorno ao movimento' },
            ].map((item) => (
              <div key={item.texto} className="flex items-center gap-3">
                <span className="text-xl">{item.icone}</span>
                <span className="text-navy text-sm font-medium">{item.texto}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOCO 2 — Como a mudança acontece ────────────────── */}
      <section className="section bg-navy text-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* FOTO AQUI — quando tiver a imagem:
          <div className="relative rounded-2xl overflow-hidden aspect-square shadow-lg">
            <Image
              src="/images/especialidades/pilates-sessao.jpg"
              alt="Fisioterapeuta acompanhando exercício de Pilates de perto"
              fill
              className="object-cover"
            />
          </div>
          */}

          {/* Destaque do diferencial */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <div className="font-serif text-6xl text-gold mb-2">50</div>
            <div className="text-white/80 text-lg mb-1">minutos</div>
            <div className="text-white/50 text-sm">dedicados exclusivamente a você</div>
          </div>

          <div>
            <h2 className="font-serif text-3xl text-gold mb-6">
              Como a mudança acontece
            </h2>
                        <p className="text-white/70 leading-relaxed mb-4">
              Isso não é uma aula de academia adaptada. Cada sessão é conduzida por um
              fisioterapeuta, com atenção que é sua — cada exercício é ajustado ao seu corpo,
              ao seu limite, ao seu objetivo, do jeito que só um profissional especializado
              sabe fazer.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              Tudo começa com uma avaliação completa — postura, histórico, limitações,
              objetivos. É a partir dela que o plano é construído pra sua realidade,
              não copiado de um roteiro padrão.
            </p>
            <p className="text-white/70 leading-relaxed">
              Conforme você evolui, ele evolui junto. O Pilates aqui não é o fim —
              é parte de um cuidado que continua com você, na medida em que seu corpo
              for pedindo.
            </p>
          </div>
        </div>
      </section>

      {/* ── BLOCO 3 — Depoimentos ─────────────────────────────── */}
      <section className="section bg-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-10 text-center">
            Quem já viveu essa virada
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                texto: 'O Pilates foi essencial durante minha gestação, para o fortalecimento da lombar e pra ajudar nas dores no corpo. Aprendi a respirar melhor, controlar minha pelve, entre outros benefícios.',
                nome:  'Isabela Meschede',
                tema:  'Pilates na gestação',
              },
              {
                texto: 'No pós-parto fui atendida pela Liane, que me auxiliou bastante no atendimento individualizado. Sou muito grata à Santé por todo esse cuidado.',
                nome:  'Ana Clara Barcessat',
                tema:  'Pilates pós-parto',
              },
              {
                texto: 'Pratico Pilates há mais de 20 anos. Tive problemas na lombar no passado — hoje sinto que o Pilates até me ajuda no equilíbrio. Pretendo praticar até os 99 anos.',
                nome:  'Mauro Bonna',
                tema:  'Dor lombar',
              },
            ].map((dep) => (
              <div key={dep.nome} className="bg-white rounded-2xl p-6 shadow-sm flex flex-col">
                <span className="inline-block bg-teal/10 text-teal text-xs font-medium px-3 py-1 rounded-full mb-4 w-fit">
                  {dep.tema}
                </span>
                <p className="text-gray-600 text-sm leading-relaxed italic flex-1 mb-4">
                  &ldquo;{dep.texto}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  {/* FOTO AQUI — quando tiver:
                  <Image src={`/images/depoimentos/${dep.nome.toLowerCase().replace(' ','-')}.jpg`}
                    alt={dep.nome} width={36} height={36} className="rounded-full object-cover w-9 h-9" />
                  */}
                  <div className="w-9 h-9 rounded-full bg-teal/20 flex items-center justify-center text-teal text-sm font-medium shrink-0">
                    {dep.nome.charAt(0)}
                  </div>
                  <p className="text-navy text-sm font-medium">{dep.nome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOCO 4 — Equipe ──────────────────────────────────── */}
      <section className="section bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-navy mb-4">
            Quem vai caminhar com você
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
            Fisioterapeutas com registro no CREFITO e especialização em Pilates.
            Gente que entende de corpo, de reabilitação, e trata cada sessão como
            parte de um cuidado — não como uma aula qualquer.
          </p>

          {/* FOTO DA EQUIPE AQUI — quando tiver:
          <div className="relative rounded-2xl overflow-hidden aspect-video max-w-2xl mx-auto shadow-lg mb-8">
            <Image src="/images/equipe/equipe-pilates.jpg" alt="Equipe de Pilates da Santé"
              fill className="object-cover" />
          </div>
          */}

          <Link href="/profissionais" className="btn-outline">
            Conhecer quem vai te acompanhar →
          </Link>
        </div>
      </section>

      {/* ── FECHAMENTO — CTA ──────────────────────────────────── */}
      <section className="section bg-teal text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Você não precisa continuar convivendo com isso
          </h2>
                    <p className="text-white/80 text-lg mb-8">
            A mudança começa com uma avaliação de verdade — feita por quem entende
            do assunto, pra te mostrar exatamente o que o seu corpo precisa.
            Fala com a gente e tira suas dúvidas antes de dar esse passo.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={whatsappLink(CTA_CONVERSAR)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-teal px-8 py-3 rounded-full font-medium hover:bg-cream transition-colors"
            >
              Quero saber mais
            </a>
            <a
              href={whatsappLink(CTA_AGENDAMENTO)}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/40 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Já quero agendar minha avaliação
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}