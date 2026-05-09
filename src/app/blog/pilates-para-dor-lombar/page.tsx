import Link from 'next/link'
import { whatsappLink, WHATSAPP_MENSAGENS } from '@/data/config'

export const metadata = {
  title: '5 benefícios do Pilates para quem tem dor lombar | Santé',
  description: 'A dor lombar é a queixa mais comum em consultórios de fisioterapia. O Pilates Clínico pode ser um aliado poderoso — veja como.',
}

export default function Artigo3() {
  return (
    <div className="pt-24">
      <div className="bg-cream section pb-12">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-teal text-sm hover:underline mb-6 inline-block">
            ← Voltar para o blog
          </Link>
          <span className="badge mb-4 inline-block">Pilates</span>
          <h1 className="font-serif text-4xl md:text-5xl text-navy mb-4">
            5 benefícios do Pilates para quem tem dor lombar
          </h1>
          <p className="text-gray-400 text-sm">20 de dezembro de 2023</p>
        </div>
      </div>

      <div className="section bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">

            <p>
              A dor lombar é a queixa mais comum em consultórios de fisioterapia no Brasil e no mundo.
              Estima-se que 80% das pessoas terão pelo menos um episódio significativo de dor na região
              lombar ao longo da vida. E o Pilates Clínico — conduzido por fisioterapeutas — tem se
              mostrado um dos recursos mais eficazes tanto para o tratamento quanto para a prevenção.
            </p>

            <h2 className="font-serif text-2xl text-navy mt-8">
              Por que o Pilates Clínico é diferente do Pilates de academia
            </h2>
            <p>
              Antes de falar nos benefícios, é importante fazer essa distinção. O Pilates Clínico é
              conduzido por fisioterapeutas com formação específica, que adaptam os exercícios para
              a condição de cada paciente. Não é uma aula genérica — é um recurso terapêutico com
              indicação e progressão individualizadas.
            </p>

            <h2 className="font-serif text-2xl text-navy mt-8">Os 5 principais benefícios</h2>

            {[
              {
                num: '1',
                titulo: 'Fortalecimento do core',
                texto: 'O Pilates é reconhecido mundialmente por sua eficácia no fortalecimento da musculatura profunda do abdômen e da coluna — o chamado core. Essa musculatura funciona como um colete natural que protege a lombar durante os movimentos do dia a dia.',
              },
              {
                num: '2',
                titulo: 'Melhora da mobilidade e flexibilidade',
                texto: 'Muitos casos de dor lombar têm relação direta com encurtamento muscular — especialmente em isquiotibiais, flexores de quadril e musculatura paravertebral. O Pilates trabalha esses grupos de forma progressiva e segura.',
              },
              {
                num: '3',
                titulo: 'Correção postural',
                texto: 'Postura anteriorizada, hiperlordose e desequilíbrios musculares são fatores que sobrecarregam a lombar. O Pilates trabalha o alinhamento corporal de forma ativa — não apenas corrige a postura estática, mas reprograma o padrão de movimento.',
              },
              {
                num: '4',
                titulo: 'Redução da dor crônica',
                texto: 'Estudos mostram que programas regulares de Pilates reduzem significativamente a intensidade da dor lombar crônica e melhoram a função física. O efeito é progressivo e se mantém com a prática contínua.',
              },
              {
                num: '5',
                titulo: 'Prevenção de recidivas',
                texto: 'Quem já teve um episódio de dor lombar tem grande chance de ter outro. O Pilates, ao fortalecer a musculatura estabilizadora e melhorar a consciência corporal, reduz significativamente esse risco.',
              },
            ].map((item) => (
              <div key={item.num} className="flex gap-5 py-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-teal/10 text-teal font-serif text-lg flex items-center justify-center shrink-0">
                  {item.num}
                </div>
                <div>
                  <h3 className="font-medium text-navy mb-1">{item.titulo}</h3>
                  <p className="text-sm leading-relaxed">{item.texto}</p>
                </div>
              </div>
            ))}

            <h2 className="font-serif text-2xl text-navy mt-8">Para quem é indicado</h2>
            <p>
              O Pilates Clínico é indicado para praticamente qualquer pessoa com dor lombar —
              desde episódios agudos em fase de recuperação até dores crônicas de longa data.
              A chave está na avaliação prévia e na individualização dos exercícios.
            </p>
            <p>
              Contraindicações são raras e geralmente temporárias — como fase aguda de hérnia com
              comprometimento neurológico severo. Nesses casos, o fisioterapeuta adapta o protocolo
              ou indica outro recurso até que o Pilates possa ser introduzido com segurança.
            </p>

            <div className="bg-cream rounded-2xl p-8 mt-10 text-center">
              <h3 className="font-serif text-2xl text-navy mb-3">
                Tem dor lombar e quer saber se o Pilates é pra você?
              </h3>
              <p className="text-gray-500 mb-6">
                Fale com nossa equipe. A gente analisa o seu caso e indica o melhor caminho.
              </p>
              
               <a href={whatsappLink(WHATSAPP_MENSAGENS.funcionamento)}
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