import Link from 'next/link'
import { SERVICOS } from '@/data/services'
import { whatsappLink, WHATSAPP_MENSAGENS } from '@/data/config'

export const metadata = {
  title: 'Especialidades | Santé — Fisioterapia em Belém',
  description: 'Conheça todas as especialidades da Santé: Fisioterapia Ortopédica, Pilates, RPG, Terapia Manual e mais.',
}

export default function EspecialidadesPage() {
  return (
    <div className="pt-24">
      {/* Cabeçalho */}
      <div className="bg-cream section pb-12">
        <div className="max-w-6xl mx-auto">
          <span className="badge mb-4 inline-block">Especialidades</span>
          <h1 className="font-serif text-4xl md:text-5xl text-navy mb-4">
            Nossas especialidades
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Cada especialidade com protocolo individualizado e atendimento exclusivo de 50 minutos.
          </p>
        </div>
      </div>

      {/* Grid de serviços */}
      <div className="section bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICOS.map((servico) => (
            <div key={servico.id} className="card hover:shadow-md transition-shadow flex flex-col">
              <div className="text-3xl mb-4">{servico.icone}</div>
              <h2 className="font-serif text-xl text-navy mb-2">{servico.nome}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{servico.resumo}</p>

              <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-gray-100">
                <Link
                  href={`/especialidades/${servico.id}`}
                  className="btn-outline text-center text-sm"
                >
                  Saiba mais
                </Link>
                <a
                  href={whatsappLink(servico.cta || WHATSAPP_MENSAGENS.agendamento)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center text-sm"
                >
                  Agendar
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
