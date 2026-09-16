'use client'
// ================================================================
// 💬 LINK PARA O WHATSAPP — use SEMPRE este componente
//
// Nunca escreva <a href={whatsappLink(...)}> direto. Este componente
// existe para garantir duas coisas que se perdem quando cada página
// monta o próprio link:
//
//  1. o clique SEMPRE dispara o evento whatsapp_click (a conversão)
//  2. o código de origem (gclid/UTM) entra na mensagem, para quem
//     atende saber de qual campanha aquela conversa veio
//
// O href renderizado no servidor já é válido sem JavaScript; o código
// de origem é acrescentado depois da hidratação, o que evita
// divergência entre servidor e cliente.
// ================================================================

import { useEffect, useState, type ReactNode } from 'react'
import { whatsappLink } from '@/data/config'
import { origemAtual, mensagemComRef, trackWhatsApp } from '@/lib/analytics'

export default function WhatsAppLink({
  mensagem,
  secao,
  assunto,
  className,
  children,
  ariaLabel,
  aoClicar,
}: {
  /** Texto pré-preenchido. Use WHATSAPP_MENSAGENS de @/data/config. */
  mensagem:  string
  /** Onde na página: hero, header, cta_final, card_servico... */
  secao:     string
  /** Qual intenção: agendamento, funcionamento, pilates, <slug>... */
  assunto:   string
  className?: string
  children:  ReactNode
  ariaLabel?: string
  /** Roda DEPOIS do tracking. Ex: fechar um menu. */
  aoClicar?: () => void
}) {
  const [href, setHref] = useState(() => whatsappLink(mensagem))

  useEffect(() => {
    setHref(whatsappLink(mensagemComRef(mensagem, origemAtual())))
  }, [mensagem])

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={() => {
        trackWhatsApp({ secao, assunto })
        aoClicar?.()
      }}
    >
      {children}
    </a>
  )
}
