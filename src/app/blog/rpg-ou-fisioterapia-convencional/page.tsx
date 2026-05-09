import Link from 'next/link'
import { whatsappLink, WHATSAPP_MENSAGENS } from '@/data/config'

export const metadata = {
  title: 'RPG ou Fisioterapia Convencional: qual a diferença? | Santé',
  description: 'Muitos pacientes chegam com dúvida: qual técnica é melhor para minha dor postural? A resposta depende do seu caso — veja como decidir.',
}

export default function Artigo2() {
  return (
    <div className="pt-24">
      <div className="bg-cream section pb-12">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-teal text-sm hover:underline mb-6 inline-block">
            ← Voltar para o blog
          </Link>
          <span className="badge mb-4 inline-block">RPG</span>
          <h1 className="font-serif text-4xl md:text-5xl text-navy mb-4">
            RPG ou Fisioterapia Convencional: qual a diferença?
          </h1>
          <p className="text-gray-400 text-sm">08 de janeiro de 2024</p>
        </div>
      </div>

      <div className="section bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">

            <p>
              É uma das perguntas mais comuns no nosso consultório: "Devo fazer RPG ou fisioterapia
              convencional?" A resposta honesta é: depende. Mas entender a diferença entre os dois
              já ajuda muito a tomar a decisão certa.
            </p>

            <h2 className="font-serif text-2xl text-navy mt-8">O que é a Fisioterapia Convencional</h2>
            <p>
              A fisioterapia convencional trabalha de forma localizada — foca no ponto de dor ou na
              estrutura lesionada. Se você tem uma tendinite no ombro, o tratamento vai se concentrar
              no ombro: mobilização, fortalecimento da musculatura local, recursos como ultrassom ou
              eletroterapia, exercícios específicos.
            </p>
            <p>
              É altamente eficaz para lesões agudas, pós-operatório, traumas e condições ortopédicas
              bem definidas.
            </p>

            <h2 className="font-serif text-2xl text-navy mt-8">O que é o RPG</h2>
            <p>
              A Reeducação Postural Global (RPG) parte de uma premissa diferente: o corpo é uma cadeia
              integrada, e a dor num ponto muitas vezes tem origem em outro. Uma lombalgia crônica pode
              estar relacionada à tensão nos isquiotibiais, que por sua vez vem de uma postura anteriorizada
              da cabeça.
            </p>
            <p>
              O RPG trabalha essas cadeias musculares de forma global, usando posturas ativas mantidas
              por períodos prolongados para promover uma reprogramação postural profunda.
            </p>

            <h2 className="font-serif text-2xl text-navy mt-8">Quando escolher cada um</h2>
            <div className="grid md:grid-cols-2 gap-6 my-6">
              {[
                {
                  titulo: 'Fisioterapia Convencional',
                  cor: 'border-teal',
                  itens: [
                    'Lesão aguda ou recente',
                    'Pós-operatório',
                    'Trauma específico',
                    'Dor localizada com causa clara',
                    'Reabilitação funcional',
                  ],
                },
                {
                  titulo: 'RPG',
                  cor: 'border-gold',
                  itens: [
                    'Dor crônica sem causa estrutural clara',
                    'Desvios posturais (escoliose, hipercifose)',
                    'Dores que migram ou recidivam',
                    'Cefaleia tensional e dor cervical crônica',
                    'Prevenção e qualidade de vida',
                  ],
                },
              ].map((col) => (
                <div key={col.titulo} className={`border-l-4 ${col.cor} pl-4`}>
                  <h3 className="font-medium text-navy mb-3">{col.titulo}</h3>
                  <ul className="space-y-2">
                    {col.itens.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <span className="text-teal shrink-0 mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h2 className="font-serif text-2xl text-navy mt-8">E se eu não souber qual escolher?</h2>
            <p>
              Na maioria dos casos, uma boa avaliação resolve essa dúvida. O fisioterapeuta vai analisar
              sua postura, histórico de dor, exames e queixas para indicar o caminho mais eficaz —
              que muitas vezes combina as duas abordagens.
            </p>

            <div className="bg-cream rounded-2xl p-8 mt-10 text-center">
              <h3 className="font-serif text-2xl text-navy mb-3">
                Ainda com dúvida?
              </h3>
              <p className="text-gray-500 mb-6">
                Fale com nossa equipe. A gente te ajuda a entender qual abordagem faz mais sentido
                para o seu caso.
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