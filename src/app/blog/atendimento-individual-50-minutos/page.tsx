import Link from 'next/link'
import { whatsappLink, WHATSAPP_MENSAGENS } from '@/data/config'
import BlogPostSchema from '@/components/BlogPostSchema'

export const metadata = {
  title: 'Por que o atendimento individual de 50 minutos faz diferença? | Santé',
  description: 'Em clínicas convencionais, o fisioterapeuta atende múltiplos pacientes ao mesmo tempo. Entenda por que isso compromete o resultado do tratamento.',
}

export default function Artigo1() {
  return (
    <div className="pt-24">
      <BlogPostSchema
        titulo="Por que o atendimento individual de 50 minutos faz diferença no resultado?"
        resumo="Em clínicas convencionais, o fisioterapeuta atende múltiplos pacientes ao mesmo tempo. Entenda por que isso compromete o resultado do tratamento."
        data="2024-01-15"
        slug="atendimento-individual-50-minutos"
      />
      <div className="bg-cream section pb-12">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-teal text-sm hover:underline mb-6 inline-block">
            ← Voltar para o blog
          </Link>
          <span className="badge mb-4 inline-block">Fisioterapia</span>
          <h1 className="font-serif text-4xl md:text-5xl text-navy mb-4">
            Por que o atendimento individual de 50 minutos faz diferença no resultado?
          </h1>
          <p className="text-gray-400 text-sm">15 de janeiro de 2024</p>
        </div>
      </div>

      <div className="section bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">

            <p>
              Se você já foi a uma clínica de fisioterapia convencional, provavelmente viveu essa cena:
              o fisioterapeuta coloca um aparelho em você, vai atender outro paciente, volta alguns minutos depois,
              faz uma manobra rápida e segue para o próximo. Isso é o chamado atendimento em série —
              e ele compromete diretamente o resultado do seu tratamento.
            </p>

            <h2 className="font-serif text-2xl text-navy mt-8">O que acontece no atendimento em série</h2>
            <p>
              Quando um fisioterapeuta atende múltiplos pacientes ao mesmo tempo, o tempo dedicado a cada um
              é fragmentado. A avaliação contínua — fundamental para ajustar o tratamento em tempo real —
              simplesmente não acontece. O profissional não consegue observar como seu corpo responde a cada
              técnica, adaptar a pressão, mudar o protocolo se necessário.
            </p>
            <p>
              O resultado: sessões mecânicas, sem personalização real, onde o paciente é tratado como
              um diagnóstico, não como uma pessoa.
            </p>

            <h2 className="font-serif text-2xl text-navy mt-8">Por que 50 minutos muda tudo</h2>
            <p>
              Na Santé, cada sessão tem 50 minutos dedicados exclusivamente a você. Nenhum outro paciente
              divide esse tempo. Isso permite que o fisioterapeuta:
            </p>
            <ul className="list-none space-y-3">
              {[
                'Faça uma avaliação contínua durante toda a sessão',
                'Ajuste as técnicas em tempo real conforme a resposta do seu corpo',
                'Combine diferentes recursos terapêuticos na mesma sessão',
                'Converse, esclareça dúvidas e entenda sua rotina para orientar melhor',
                'Evolua o protocolo a cada encontro com base no que realmente observou',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-teal mt-1 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-serif text-2xl text-navy mt-8">O impacto nos resultados</h2>
            <p>
              Pacientes que passam por atendimento individual tendem a precisar de menos sessões para
              atingir o mesmo resultado — justamente porque cada sessão é mais eficaz. Não há tempo
              perdido, não há distração, não há protocolo genérico.
            </p>
            <p>
              Mais do que um diferencial, o atendimento individual de 50 minutos é, na nossa visão,
              o mínimo que um paciente merece quando confia sua saúde a um profissional.
            </p>

            <div className="bg-cream rounded-2xl p-8 mt-10 text-center">
              <h3 className="font-serif text-2xl text-navy mb-3">
                Quer experimentar a diferença?
              </h3>
              <p className="text-gray-500 mb-6">
                Fale com nossa equipe e entenda como funciona o atendimento na Santé.
              </p>
              
              <a  href={whatsappLink(WHATSAPP_MENSAGENS.funcionamento)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Fale com a gente
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}