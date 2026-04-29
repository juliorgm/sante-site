import Image from 'next/image'
import { EQUIPE } from '@/data/team'
import { whatsappLink, WHATSAPP_MENSAGENS } from '@/data/config'

export const metadata = {
  title: 'Profissionais | Santé — Fisioterapia em Belém',
  description: 'Conheça a equipe de fisioterapeutas especializados da Santé.',
}

export default function ProfissionaisPage() {
  return (
    <div className="pt-24">
      <div className="bg-cream section pb-12">
        <div className="max-w-6xl mx-auto">
          <span className="badge mb-4 inline-block">Nossa equipe</span>
          <h1 className="font-serif text-4xl md:text-5xl text-navy mb-4">
            Profissionais especializados
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Conheça os fisioterapeutas que irão cuidar de você — todos com registro no CREFITO
            e especializações comprovadas.
          </p>
        </div>
      </div>

      <div className="section bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {EQUIPE.map((prof) => (
            <div key={prof.id} className="card flex flex-col md:flex-row gap-6">
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0 mx-auto md:mx-0">
                <Image
                  src={prof.foto}
                  alt={prof.nome}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-xl text-navy">{prof.nome}</h2>
                <p className="text-teal font-medium text-sm mb-1">{prof.titulo}</p>
                <p className="text-gray-400 text-xs mb-3">{prof.crefito}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {prof.especializacoes.map((esp) => (
                    <span key={esp} className="text-xs bg-cream text-navy/70 px-2 py-1 rounded-full">
                      {esp}
                    </span>
                  ))}
                </div>
                <a
                  href={whatsappLink(WHATSAPP_MENSAGENS.agendamento)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs"
                >
                  Agendar com {prof.nome.split(' ')[0]}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
