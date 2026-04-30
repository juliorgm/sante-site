import type { Metadata } from 'next'
import './globals.css'
import { SEO, CLINICA } from '@/data/config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'

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
    telephone: '+5591980609411',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CLINICA.endereco,
      addressLocality: 'Belém',
      addressRegion: 'PA',
      addressCountry: 'BR',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '12:00',
      },
    ],
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
      </body>
    </html>
  )
}
