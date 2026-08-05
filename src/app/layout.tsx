import type { Metadata } from 'next'
import './globals.css'
import { SEO, CLINICA } from '@/data/config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import Analytics2 from '@/components/Analytics'

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
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday']
        opens: '06:30',
        closes: '20:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday'],
        opens: '06:30',
        closes: '12:30',
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
        {/* Google Tag Manager (head) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P9CC938Z');`,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P9CC938Z" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <SpeedInsights />
        <Analytics />
        <Analytics2 />
      </body>
    </html>
  )
}
