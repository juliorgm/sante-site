import type { Metadata } from 'next'
import './globals.css'
import { SEO, CLINICA, WHATSAPP_NUMERO } from '@/data/config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import GoogleTag from '@/components/GoogleTag'

// ── SEO automático ────────────────────────────────────────────
// Edite os valores em src/data/config.ts → SEO
export const metadata: Metadata = {
  title:       SEO.title,
  description: SEO.description,
  keywords:    SEO.keywords,
  metadataBase: new URL(SEO.url),
  openGraph: {
    title:       SEO.title,
    description: SEO.description,
    url:         SEO.url,
    siteName:    CLINICA.nome,
    locale:      'pt_BR',
    type:        'website',
  },
}

// ── Schema Markup (JSON-LD) ───────────────────────────────────
// Diz ao Google exatamente o que é o site (aparece nas buscas com estrelas, horário etc.)
// Edite os dados em src/data/config.ts
function SchemaMarkup() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: `${CLINICA.nome} — ${CLINICA.subtitulo}`,
    description: CLINICA.descricao,
    url: SEO.url,
    telephone: '+' + WHATSAPP_NUMERO,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CLINICA.endereco,
      addressLocality: 'Belém',
      addressRegion: 'PA',
      addressCountry: 'BR',
    },
    // ⚠️ GERADO a partir de CLINICA.horarios — não redeclare aqui.
    // Um bloco por TURNO. Declarar um único bloco 06:30–20:30 faz o
    // Google exibir a clínica como aberta no almoço, todos os dias.
    openingHoursSpecification: CLINICA.horarios.flatMap((h) =>
      h.turnos.map((t) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.diasSchema,
        opens: t.abre,
        closes: t.fecha,
      }))
    ),
    medicalSpecialty: 'PhysicalTherapy',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <SchemaMarkup />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <SpeedInsights />
        <Analytics />
        <GoogleTag />
      </body>
    </html>
  )
}
