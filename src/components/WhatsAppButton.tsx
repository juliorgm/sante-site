'use client'
// ================================================================
// 📱 BOTÃO FLUTUANTE DE WHATSAPP
// Aparece em todas as páginas, fixo no canto inferior direito.
//
// Para mudar a mensagem padrão do botão flutuante:
//   → src/data/config.ts → WHATSAPP_MENSAGENS.geral
// ================================================================

import { whatsappLink, WHATSAPP_MENSAGENS } from '@/data/config'
import { useState } from 'react'
import { trackWhatsAppClick } from '@/lib/analytics'

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)

  // Opções que aparecem ao expandir o botão
  // Para adicionar/remover opções, edite este array:
  const opcoes = [
    { label: 'Agendar avaliação',      msg: WHATSAPP_MENSAGENS.agendamento },
    { label: 'Como funciona?',         msg: WHATSAPP_MENSAGENS.funcionamento },
    { label: 'Informações sobre Pilates', msg: WHATSAPP_MENSAGENS.pilates },
    { label: 'Valores e planos',       msg: WHATSAPP_MENSAGENS.preco },
    { label: 'Como chegar',            msg: WHATSAPP_MENSAGENS.localizacao },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">

      {/* Menu expandido de opções */}
      {open && (
        <div className="flex flex-col gap-2 mb-2 animate-fade-in-up">
          {opcoes.map((opcao) => (
            <a
              key={opcao.label}
              href={whatsappLink(opcao.msg)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-navy text-sm font-medium px-4 py-2 rounded-full shadow-lg border border-gray-100 hover:bg-green-50 hover:border-green-200 transition-all whitespace-nowrap"
              onClick={() => {
                trackWhatsAppClick(opcao.label)
                setOpen(false)
              }}
            >
              {opcao.label}
            </a>
          ))}
        </div>
      )}

      {/* Botão principal */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg whatsapp-pulse transition-transform hover:scale-105"
        style={{ backgroundColor: '#25D366' }}
        aria-label="Fale conosco pelo WhatsApp"
      >
        {open ? (
          // Ícone X quando aberto
          <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        ) : (
          // Ícone WhatsApp quando fechado
          <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2 22l5.25-1.326A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fillRule="evenodd" clipRule="evenodd"/>
          </svg>
        )}
      </button>
    </div>
  )
}
