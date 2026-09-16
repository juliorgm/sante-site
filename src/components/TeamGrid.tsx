'use client'
// ================================================================
// 👥 GRADE DA EQUIPE + PERFIL COMPLETO
//
// Desktop: modal centralizado. Mobile: bottom sheet.
// Acessibilidade: role="dialog", aria-modal, focus trap, Escape,
// travamento de scroll e devolução do foco ao fechar.
//
// Separa fisioterapeutas (com CREFITO e formação) da equipe de
// atendimento (sem credencial clínica — campos opcionais).
// Dados: src/data/team.ts · Fonte: docs/context/equipe.md
// ================================================================

import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
import type { Profissional, Formacao } from '@/data/team'
import { WHATSAPP_MENSAGENS } from '@/data/config'
import WhatsAppLink from '@/components/WhatsAppLink'

const ROTULO_TIPO: Record<Formacao['tipo'], string> = {
  graduacao: 'Graduação',
  pos:       'Pós-graduação',
  mestrado:  'Mestrado',
  formacao:  'Formação',
}

/** Monta a linha de formação. "em curso" NUNCA vira "concluída". */
function linhaFormacao(f: Formacao) {
  const partes = [f.titulo]
  if (f.instituicao) partes.push(f.instituicao)
  if (f.ano) partes.push(String(f.ano))
  return partes.join(' · ') + (f.emCurso ? ' (em curso)' : '')
}

// ⚠️ A mensagem do WhatsApp é GENÉRICA de propósito.
// O agendamento na Santé é feito conforme a disponibilidade da equipe —
// quem monta a agenda é a recepção, não o paciente. Um CTA "Agendar com
// a Natália" prometeria algo que a clínica não opera assim.
// A identificação de QUAL perfil gerou o contato vai no evento de
// analytics (perfil_equipe:<id>), não na mensagem.

// ── Perfil completo ─────────────────────────────────────────────
function PerfilDialog({ prof, onClose }: { prof: Profissional; onClose: () => void }) {
  const painelRef = useRef<HTMLDivElement>(null)
  const anteriorRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    anteriorRef.current = document.activeElement as HTMLElement
    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    painelRef.current?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const painel = painelRef.current
      if (!painel) return
      const focaveis = painel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focaveis.length === 0) return
      const primeiro = focaveis[0]
      const ultimo = focaveis[focaveis.length - 1]

      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primeiro.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflowAnterior
      anteriorRef.current?.focus()
    }
  }, [onClose])

  const tituloId = 'perfil-' + prof.id
  const temFormacao = Boolean(prof.formacao && prof.formacao.length > 0)

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-navy/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={painelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full sm:max-w-lg max-h-[90vh] overflow-y-auto
                   rounded-t-3xl sm:rounded-3xl shadow-xl outline-none"
      >
        {/* Alça do bottom sheet (só mobile) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <span className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
              <Image src={prof.foto} alt="" fill className="object-cover" sizes="80px" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 id={tituloId} className="font-serif text-xl text-navy leading-tight">
                {prof.nome}
              </h2>
              <p className="text-teal text-sm font-medium">{prof.titulo}</p>
              {prof.crefito && (
                <p className="text-gray-400 text-xs mt-1">{prof.crefito}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar perfil"
              className="p-2 -m-2 text-navy/40 hover:text-navy transition-colors shrink-0"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {prof.destaqueTexto && (
            <p className="text-navy font-medium text-sm mb-5">{prof.destaqueTexto}</p>
          )}

          {prof.especializacoes.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {prof.especializacoes.map((esp) => (
                <span key={esp} className="text-xs bg-teal/10 text-teal px-2.5 py-1 rounded-full">
                  {esp}
                </span>
              ))}
            </div>
          )}

          {temFormacao && (
            <>
              <h3 className="text-xs uppercase tracking-wide text-navy/50 font-medium mb-3">
                Formação
              </h3>
              <ul className="flex flex-col gap-2.5 mb-6">
                {prof.formacao?.map((f, i) => (
                  <li key={i} className="text-sm leading-snug">
                    <span className="text-navy/40 text-xs block">{ROTULO_TIPO[f.tipo]}</span>
                    <span className="text-gray-600">{linhaFormacao(f)}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {prof.bio && (
            <p className="text-gray-500 text-sm leading-relaxed mb-6 pb-6 border-b border-gray-100">
              {prof.bio}
            </p>
          )}

          <WhatsAppLink
            mensagem={WHATSAPP_MENSAGENS.funcionamento}
            secao="perfil_equipe"
            assunto={prof.id}
            className="btn-primary w-full justify-center"
          >
            Falar com a gente
          </WhatsAppLink>
        </div>
      </div>
    </div>
  )
}

// ── Card ────────────────────────────────────────────────────────
function Card({ prof, onAbrir }: { prof: Profissional; onAbrir: () => void }) {
  const ehFisio = prof.categoria === 'fisioterapeuta'

  return (
    <div className="card flex flex-col md:flex-row gap-6">
      <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0 mx-auto md:mx-0">
        <Image src={prof.foto} alt={prof.nome} fill className="object-cover" sizes="128px" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-serif text-xl text-navy">{prof.nome}</h3>
        <p className="text-teal font-medium text-sm mb-1">{prof.titulo}</p>
        {prof.crefito && <p className="text-gray-400 text-xs mb-3">{prof.crefito}</p>}

        {prof.especializacoes.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {prof.especializacoes.map((esp) => (
              <span key={esp} className="text-xs bg-cream text-navy/70 px-2 py-1 rounded-full">
                {esp}
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={onAbrir}
          aria-haspopup="dialog"
          className="btn-outline text-xs"
        >
          {ehFisio ? 'Ver currículo' : 'Ver perfil'}
        </button>
      </div>
    </div>
  )
}

// ── Grade ───────────────────────────────────────────────────────
export default function TeamGrid({ equipe }: { equipe: Profissional[] }) {
  const [aberto, setAberto] = useState<Profissional | null>(null)
  const fechar = useCallback(() => setAberto(null), [])

  const fisios = equipe.filter((p) => p.categoria === 'fisioterapeuta')
  const apoio  = equipe.filter((p) => p.categoria === 'atendimento')

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {fisios.map((prof) => (
          <Card key={prof.id} prof={prof} onAbrir={() => setAberto(prof)} />
        ))}
      </div>

      {apoio.length > 0 && (
        <div className="mt-20">
          <h2 className="section-title">Quem recebe você</h2>
          <p className="section-subtitle mb-10">
            O cuidado começa antes da sessão — na porta, no telefone e no WhatsApp.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {apoio.map((prof) => (
              <Card key={prof.id} prof={prof} onAbrir={() => setAberto(prof)} />
            ))}
          </div>
        </div>
      )}

      {aberto && <PerfilDialog prof={aberto} onClose={fechar} />}
    </>
  )
}
