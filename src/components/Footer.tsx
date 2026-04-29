import Link from 'next/link'
import Image from 'next/image'
import { CLINICA, REDES_SOCIAIS, whatsappLink, WHATSAPP_MENSAGENS } from '@/data/config'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Coluna 1 — Marca */}
        <div>
          <Image
            src="/images/logo-branca.png"
            alt="Santé"
            width={120}
            height={48}
            className="object-contain h-10 w-auto mb-4 brightness-0 invert"
          />
          <p className="text-white/60 text-sm leading-relaxed">
            {CLINICA.descricao}
          </p>
          {/* Redes Sociais */}
          <div className="flex gap-3 mt-4">
            {REDES_SOCIAIS.instagram && (
              <a href={REDES_SOCIAIS.instagram} target="_blank" rel="noopener noreferrer"
                 className="text-white/60 hover:text-gold transition-colors text-sm">
                Instagram
              </a>
            )}
            {REDES_SOCIAIS.facebook && (
              <a href={REDES_SOCIAIS.facebook} target="_blank" rel="noopener noreferrer"
                 className="text-white/60 hover:text-gold transition-colors text-sm">
                Facebook
              </a>
            )}
          </div>
        </div>

        {/* Coluna 2 — Links */}
        <div>
          <h4 className="text-gold font-medium mb-4 text-sm tracking-wide uppercase">Menu</h4>
          <nav className="flex flex-col gap-2">
            {[
              ['Início', '/'],
              ['A Clínica', '/sobre'],
              ['Especialidades', '/especialidades'],
              ['Profissionais', '/profissionais'],
              ['Blog', '/blog'],
              ['Contato', '/contato'],
            ].map(([label, href]) => (
              <Link key={href} href={href}
                    className="text-white/60 hover:text-white text-sm transition-colors">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Coluna 3 — Contato */}
        <div>
          <h4 className="text-gold font-medium mb-4 text-sm tracking-wide uppercase">Contato</h4>
          <div className="flex flex-col gap-3 text-sm text-white/60">
            <p>{CLINICA.endereco}</p>
            {CLINICA.horarios.map((h) => (
              <p key={h.dia}><span className="text-white">{h.dia}:</span> {h.hora}</p>
            ))}
            <a
              href={whatsappLink(WHATSAPP_MENSAGENS.geral)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              WhatsApp: (91) 98060-9411
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-4 text-white/30 text-xs">
        © {new Date().getFullYear()} Santé — Centro de Terapia Especializada. Todos os direitos reservados.
      </div>
    </footer>
  )
}
