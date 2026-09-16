'use client'
// ================================================================
// ▶️  PLAYER DE VÍDEO COM "FACADE"
//
// POR QUE NÃO UM IFRAME DIRETO:
// O embed do YouTube grava cookie de terceiro no carregamento da
// página, antes de qualquer consentimento. Como o site ainda não tem
// banner de LGPD (ver docs/specs/0001-lgpd-consentimento.md), isso
// seria uma violação nova a cada visita.
//
// Aqui só a CAPA aparece. O player do YouTube é montado apenas depois
// do clique — e o clique é o consentimento para aquele carregamento.
// Domínio youtube-nocookie.com, que não rastreia antes do play.
//
// Bônus: tira ~1 MB de JavaScript do carregamento inicial da home.
//
// A capa vem por next/image a partir de img.youtube.com. O otimizador
// de imagem da Vercel busca do lado do SERVIDOR e serve pelo domínio
// da Santé — então o navegador do visitante não fala com o YouTube em
// nenhum momento antes do play.
// ================================================================

import Image from 'next/image'
import { useState } from 'react'
import type { Midia } from '@/data/midia'

export default function VideoFacade({ item }: { item: Midia }) {
  const [tocando, setTocando] = useState(false)

  const capa = 'https://img.youtube.com/vi/' + item.youtubeId + '/maxresdefault.jpg'
  const embed =
    'https://www.youtube-nocookie.com/embed/' + item.youtubeId +
    '?autoplay=1&rel=0&modestbranding=1'

  function tocar() {
    setTocando(true)
    // Micro-conversão do plano de medição (docs/plano-ads-analytics.md)
    window.gtag?.('event', 'video_play', {
      event_category: 'midia',
      event_label: item.id,
    })
  }

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl bg-navy aspect-video">
      {tocando ? (
        <iframe
          src={embed}
          title={item.titulo}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={tocar}
          aria-label={'Assistir: ' + item.titulo + ' (' + item.duracaoLabel + ')'}
          className="group absolute inset-0 w-full h-full cursor-pointer"
        >
          <Image
            src={capa}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 800px"
          />

          {/* Escurecimento para o play e o texto ficarem legíveis */}
          <span className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-navy/10" />

          {/* Botão de play */}
          <span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95
                       flex items-center justify-center shadow-lg
                       transition-transform duration-300 group-hover:scale-110"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#0B9DB3" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>

          {/* Legenda sobre a capa */}
          <span className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-left">
            <span className="block text-gold text-xs uppercase tracking-wide font-medium mb-1">
              {item.veiculo} · {item.duracaoLabel}
            </span>
            <span className="block font-serif text-white text-lg md:text-2xl leading-tight">
              {item.titulo}
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
