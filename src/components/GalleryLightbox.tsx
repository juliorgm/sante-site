'use client'
// ================================================================
// 🖼️  GALERIA COM LIGHTBOX
// Clica numa foto → abre em tela cheia com navegação entre fotos
// do mesmo ambiente. Edite as fotos em src/data/gallery.ts
// ================================================================

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { GALERIA, CATEGORIAS_LABELS, type CategoriaGaleria } from '@/data/gallery'

export default function GalleryLightbox() {
  const categorias = Object.keys(CATEGORIAS_LABELS) as CategoriaGaleria[]
  const [categoria, setCategoria] = useState<CategoriaGaleria>(categorias[0])
  const [lightbox, setLightbox] = useState<{ fotos: typeof GALERIA; index: number } | null>(null)

  const fotosDaCategoria = GALERIA.filter((f) => f.categoria === categoria)

  // Abre o lightbox na foto clicada
  function abrirLightbox(foto: typeof GALERIA[0]) {
    const fotos = GALERIA.filter((f) => f.categoria === foto.categoria)
    const index = fotos.findIndex((f) => f.id === foto.id)
    setLightbox({ fotos, index })
  }

  const fecharLightbox = useCallback(() => setLightbox(null), [])

  const irPara = useCallback((index: number) => {
    setLightbox((prev) => prev ? { ...prev, index } : null)
  }, [])

  const anterior = useCallback(() => {
    if (!lightbox) return
    irPara((lightbox.index - 1 + lightbox.fotos.length) % lightbox.fotos.length)
  }, [lightbox, irPara])

  const proximo = useCallback(() => {
    if (!lightbox) return
    irPara((lightbox.index + 1) % lightbox.fotos.length)
  }, [lightbox, irPara])

  // Teclado: ← → Esc
  useEffect(() => {
    if (!lightbox) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft')  anterior()
      if (e.key === 'ArrowRight') proximo()
      if (e.key === 'Escape')     fecharLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, anterior, proximo, fecharLightbox])

  // Trava scroll quando lightbox aberto
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const fotoAtual = lightbox ? lightbox.fotos[lightbox.index] : null

  return (
    <>
      {/* Filtros por categoria */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              categoria === cat
                ? 'bg-teal text-white'
                : 'bg-white text-navy border border-gray-200 hover:border-teal hover:text-teal'
            }`}
          >
            {CATEGORIAS_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Grade de fotos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {fotosDaCategoria.map((foto) => (
          <button
            key={foto.id}
            onClick={() => abrirLightbox(foto)}
            className="relative aspect-square rounded-2xl overflow-hidden group cursor-zoom-in"
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all scale-0 group-hover:scale-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B9DB3" strokeWidth="2" strokeLinecap="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </div>
            </div>
          </button>
        ))}

        {fotosDaCategoria.length === 0 && (
          <p className="col-span-3 text-gray-400 text-sm text-center py-12">
            Nenhuma foto nesta categoria ainda.
          </p>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && fotoAtual && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={fecharLightbox}
        >
          {/* Fechar */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            onClick={fecharLightbox}
            aria-label="Fechar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          {/* Anterior */}
          {lightbox.fotos.length > 1 && (
            <button
              className="absolute left-4 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors"
              onClick={(e) => { e.stopPropagation(); anterior() }}
              aria-label="Anterior"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
          )}

          {/* Foto */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={fotoAtual.src}
              alt={fotoAtual.alt}
              width={1200}
              height={800}
              className="object-contain w-full h-full max-h-[85vh] rounded-lg"
            />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 text-center py-3">
              <p className="text-white/60 text-sm">{fotoAtual.alt}</p>
              <p className="text-white/40 text-xs mt-1">
                {lightbox.index + 1} / {lightbox.fotos.length}
              </p>
            </div>
          </div>

          {/* Próximo */}
          {lightbox.fotos.length > 1 && (
            <button
              className="absolute right-4 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors"
              onClick={(e) => { e.stopPropagation(); proximo() }}
              aria-label="Próximo"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          )}

          {/* Dots */}
          {lightbox.fotos.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {lightbox.fotos.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); irPara(i) }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === lightbox.index ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}