import { CLINICA, whatsappLink, WHATSAPP_MENSAGENS, REDES_SOCIAIS } from '@/data/config'

export const metadata = {
  title: 'Contato | Santé — Fisioterapia em Belém',
  description: 'Entre em contato com a Santé. WhatsApp, endereço, horários e localização no mapa.',
}

export default function ContatoPage() {
  return (
    <div className="pt-24">
      <div className="bg-cream section pb-12">
        <div className="max-w-6xl mx-auto">
          <span className="badge mb-4 inline-block">Contato</span>
          <h1 className="font-serif text-4xl md:text-5xl text-navy mb-4">
            Fale com a gente
          </h1>
          <p className="text-gray-500 text-lg">
            Tire dúvidas, agende sua avaliação ou venha nos visitar.
          </p>
        </div>
      </div>

      <div className="section bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          {/* Informações de contato */}
          <div className="flex flex-col gap-8">

            {/* WhatsApp com opções */}
            <div>
              <h2 className="font-serif text-2xl text-navy mb-4">WhatsApp</h2>
              <p className="text-gray-500 text-sm mb-4">
                Escolha o assunto e já abrimos a conversa com a mensagem certa:
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Agendar avaliação',          msg: WHATSAPP_MENSAGENS.agendamento },
                  { label: 'Como funciona o atendimento', msg: WHATSAPP_MENSAGENS.funcionamento },
                  { label: 'Informações sobre Pilates',   msg: WHATSAPP_MENSAGENS.pilates },
                  { label: 'Valores e planos',            msg: WHATSAPP_MENSAGENS.preco },
                  { label: 'Como chegar à clínica',       msg: WHATSAPP_MENSAGENS.localizacao },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={whatsappLink(item.msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-teal/30 hover:bg-cream transition-all group"
                  >
                    <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: '#25D366' }}>
                      <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.956 9.956 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      </svg>
                    </span>
                    <span className="text-sm text-navy group-hover:text-teal transition-colors">{item.label}</span>
                    <span className="ml-auto text-gray-300 group-hover:text-teal">→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Endereço e horários */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-serif text-lg text-navy mb-2">Endereço</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{CLINICA.endereco}</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-navy mb-2">Horários</h3>
                {CLINICA.horarios.map((h) => (
                  <div key={h.dia} className="text-sm text-gray-500 mb-1">
                    <span className="text-navy font-medium">{h.dia}:</span> {h.hora}
                  </div>
                ))}
              </div>
            </div>

            {/* Redes sociais */}
            <div>
              <h3 className="font-serif text-lg text-navy mb-3">Redes sociais</h3>
              <div className="flex gap-3">
                {REDES_SOCIAIS.instagram && (
                  <a href={REDES_SOCIAIS.instagram} target="_blank" rel="noopener noreferrer"
                     className="btn-outline text-sm">
                    Instagram
                  </a>
                )}
                {REDES_SOCIAIS.facebook && (
                  <a href={REDES_SOCIAIS.facebook} target="_blank" rel="noopener noreferrer"
                     className="btn-outline text-sm">
                    Facebook
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Mapa do Google */}
          <div className="rounded-2xl overflow-hidden shadow-sm h-[500px] bg-cream">
            {/*
              ↓ COMO ATUALIZAR O MAPA:
              1. Acesse maps.google.com e busque o endereço da clínica
              2. Clique em "Compartilhar" → "Incorporar um mapa"
              3. Copie o link do src="..." e cole abaixo
            */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1131.0580914277448!2d-48.48867443134868!3d-1.4597416308211315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a48ffaec4c8fc9%3A0x47070dffadfe2add!2sSant%C3%A9%20Fisioterapia%20e%20Pilates!5e0!3m2!1spt-BR!2sbr!4v1777610512037!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Santé Fisioterapia"
            />
            {/* ↑ Substitua o src acima pelo link real do Google Maps */}
          </div>
        </div>
      </div>
    </div>
  )
}
