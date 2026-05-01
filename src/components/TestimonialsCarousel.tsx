  'use client'
  import { useState, useRef, useEffect } from 'react'
  import Image from 'next/image'
  import { DEPOIMENTOS } from '@/data/testimonials'

  function getYouTubeId(url: string): string | null {
    const patterns = [
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    ]
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  function CardTexto({ dep }: { dep: typeof DEPOIMENTOS[0] }) {
    return (
      <div className="flex flex-col h-full p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex gap-1 mb-3">
          {Array.from({ length: dep.nota }).map((_, i) => (
            <span key={i} className="text-gold text-sm">★</span>
          ))}
        </div>
        <span className="inline-block bg-teal/10 text-teal text-xs font-medium px-3 py-1 rounded-full mb-3 w-fit">
          {dep.problema}
        </span>
        <p className="text-gray-600 text-sm leading-relaxed italic flex-1">
          &ldquo;{dep.texto}&rdquo;
        </p>
        <div className="flex items-center gap-3 pt-4 mt-auto border-t border-gray-100">
          {dep.foto ? (
            <Image src={dep.foto} alt={dep.nome} width={36} height={36}
              className="rounded-full object-cover w-9 h-9 shrink-0" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-teal/20 flex items-center justify-center text-teal text-sm font-medium shrink-0">
              {dep.nome.charAt(0)}
            </div>
          )}
          <div>
            <p className="text-navy text-sm font-medium">{dep.nome}</p>
            {dep.idade && <p className="text-gray-400 text-xs">{dep.idade} anos</p>}
          </div>
        </div>
      </div>
    )
  }

  function CardVideo({ dep }: { dep: typeof DEPOIMENTOS[0] }) {
    const [playing, setPlaying] = useState(false)
    const videoId = dep.videoUrl ? getYouTubeId(dep.videoUrl) : null
    if (!videoId) return <CardTexto dep={dep} />
    const isShort = dep.videoUrl?.includes('/shorts/')

    return (
      <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className={`relative ${isShort ? 'aspect-[9/16]' : 'aspect-video'} bg-navy w-full`}>
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              title={`Depoimento de ${dep.nome}`}
            />
          ) : (
            <>
              <Image
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt={`Depoimento de ${dep.nome}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="Reproduzir vídeo"
              >
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0B9DB3">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </button>
              <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                ▶ Depoimento em vídeo
              </div>
            </>
          )}
        </div>
        <div className="p-4 flex flex-col gap-2 flex-1">
          <span className="inline-block bg-teal/10 text-teal text-xs font-medium px-3 py-1 rounded-full w-fit">
            {dep.problema}
          </span>
          {dep.texto && (
            <p className="text-gray-600 text-sm leading-relaxed italic flex-1">
              &ldquo;{dep.texto}&rdquo;
            </p>
          )}
          <div className="flex items-center gap-3 pt-2 mt-auto border-t border-gray-100">
            <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-teal text-sm font-medium shrink-0">
              {dep.nome.charAt(0)}
            </div>
            <p className="text-navy text-sm font-medium">{dep.nome}</p>
            <div className="ml-auto flex gap-0.5">
              {Array.from({ length: dep.nota }).map((_, i) => (
                <span key={i} className="text-gold text-xs">★</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Hook que detecta quantos cards cabem na tela ───────────────
  // Isso é o equivalente de um listener de configuração no Android
  function useVisibleCount() {
    const [visible, setVisible] = useState(1)

    useEffect(() => {
      function update() {
        const w = window.innerWidth
        if (w >= 1024) setVisible(3)
        else if (w >= 768) setVisible(2)
        else setVisible(1)
      }
      update()
      window.addEventListener('resize', update)
      return () => window.removeEventListener('resize', update)
    }, [])

    return visible
  }

  export default function TestimonialsCarousel() {
    const depoimentos = DEPOIMENTOS.filter((d) => d.destaque)
    const [current, setCurrent] = useState(0)
    const visibleCount = useVisibleCount()
    const total = depoimentos.length
    const maxIndex = Math.max(0, total - visibleCount)

    // ← FIX: quando visibleCount muda, garante que current não ultrapassa maxIndex
    useEffect(() => {
      setCurrent((c) => Math.min(c, maxIndex))
    }, [maxIndex])

      // ← ADICIONA ISSO AQUI
  function slide(dir: 'prev' | 'next') {
    setCurrent((c) => {
      if (dir === 'next') return Math.min(c + 1, maxIndex)
      return Math.max(c - 1, 0)
    })
  }

    const canPrev = current > 0
    const canNext = current < maxIndex

    if (total === 0) return null

    return (
      <div className="w-full">
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${current} * (100% / ${visibleCount} + ${24 / visibleCount}px)))`,
            }}
          >
            {depoimentos.map((dep) => (
              <div
                key={dep.id}
                className="shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                {dep.videoUrl ? <CardVideo dep={dep} /> : <CardTexto dep={dep} />}
              </div>
            ))}
          </div>
        </div>

        {/* Controles — só aparecem se houver mais cards que o visível */}
        {total > visibleCount && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => slide('prev')}
              disabled={!canPrev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-teal hover:text-teal transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Anterior"
            >
              ←
            </button>

            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? 'w-6 bg-teal' : 'w-2 bg-gray-200'
                  }`}
                  aria-label={`Ir para ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => slide('next')}
              disabled={!canNext}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-teal hover:text-teal transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Próximo"
            >
              →
            </button>
          </div>
        )}
      </div>
    )
  }