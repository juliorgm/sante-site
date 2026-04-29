'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { whatsappLink, WHATSAPP_MENSAGENS } from '@/data/config'

// ── Links de navegação ──────────────────────────────────────────
// Para adicionar/remover uma página do menu, edite este array:
const NAV_LINKS = [
  { label: 'Início',         href: '/' },
  { label: 'A Clínica',      href: '/sobre' },
  { label: 'Especialidades', href: '/especialidades' },
  { label: 'Profissionais',  href: '/profissionais' },
  { label: 'Blog',           href: '/blog' },
  { label: 'Contato',        href: '/contato' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-v2.png"
            alt="Santé — Fisioterapia e Pilates em Belém"
            width={120}
            height={48}
            className="object-contain h-10 w-auto"
            priority
          />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-navy/70 hover:text-teal transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + menu mobile */}
        <div className="flex items-center gap-3">
          <a
            href={whatsappLink(WHATSAPP_MENSAGENS.agendamento)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex btn-primary text-xs"
          >
            Fale com a gente
          </a>

          {/* Hambúrguer mobile */}
          <button
            className="md:hidden p-2 text-navy"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen
                ? <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>
                : <><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile expandido */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-navy font-medium py-2 border-b border-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappLink(WHATSAPP_MENSAGENS.agendamento)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-center mt-2"
          >
            Fale com a gente
          </a>
        </div>
      )}
    </header>
  )
}
