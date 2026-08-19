import Image from 'next/image'
import { whatsappLink, WHATSAPP_MENSAGENS, CLINICA } from '@/data/config'
import { GALERIA, CATEGORIAS_LABELS, type CategoriaGaleria } from '@/data/gallery'
import GalleryLightbox from '@/components/GalleryLightbox'

export const metadata = {
  title: 'A Clínica | Santé — Fisioterapia em Belém',
  description: 'Conheça a Santé: estrutura, missão e o ambiente pensado para o seu conforto e recuperação.',
}

// ── Galeria com filtro por categoria ──────────────────────────
// O filtro funciona via CSS (sem JS para não precisar de 'use client')
// Cada foto tem um data-categoria, e os botões filtram via :checked

export default function SobrePage() {
  const categorias = Object.keys(CATEGORIAS_LABELS) as CategoriaGaleria[]

  return (
    <div className="pt-24">

      {/* Hero */}
      <div className="bg-cream section pb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge mb-4 inline-block">A clínica</span>
            <h1 className="font-serif text-4xl md:text-5xl text-navy mb-6">
              Um espaço feito para a sua recuperação
            </h1>
            {/* EDITE o texto abaixo conforme a história da clínica */}
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              A Santé nasceu com uma proposta clara: oferecer fisioterapia e pilates de alta qualidade
              com atenção real a cada paciente. Desde o início, investimos em uma estrutura moderna e acolhedora,
              onde cada detalhe é pensado para que você se sinta em casa. Nossa equipe é formada por profissionais experientes e dedicados, que compartilham a missão de transformar vidas através do cuidado especializado.
            </p>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              Aqui, cada sessão é um momento de cuidado exclusivo. Garantimos que você tenha toda a atenção do seu fisioterapeuta durante os 50 minutos de cada sessão. Porque acreditamos que a recuperação é um processo único e merece dedicação total.
              Cada sessão tem 50 minutos dedicados exclusivamente a você.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Nossa estrutura foi pensada para que você se sinta confortável e seguro
              desde a recepção até a sala de tratamento. Modernos equipamentos, profissionais
              especializados e um ambiente acolhedor — tudo para que sua recuperação
              seja mais eficaz e agradável.
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-square shadow-xl">
            {/* TROQUE: /public/images/clinica-fachada.jpg */}
            <Image
              src="/images/clinica-fisioterapia-belem.png"
              alt="Clínica Santé em Belém"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Missão / Valores */}
      <div className="section bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-12 text-center">Nossa missão</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* EDITE os valores abaixo */}
            {[
              { icone: '❤️', titulo: 'Cuidado humanizado', texto: 'Cada paciente é único. Ouvimos, avaliamos e criamos protocolos individualizados para cada história.' },
              { icone: '🔬', titulo: 'Ciência aplicada', texto: 'Técnicas baseadas em evidências, atualizadas constantemente por uma equipe comprometida com a evolução da fisioterapia.' },
              { icone: '🏆', titulo: 'Excelência clínica', texto: 'Atendimento individual de 50 minutos com fisioterapeuta especializado. Sem divisão de atenção.' },
            ].map((item) => (
              <div key={item.titulo} className="text-center p-6">
                <div className="text-4xl mb-4">{item.icone}</div>
                <h3 className="font-serif text-xl text-navy mb-3">{item.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

     {/* Galeria */}
      <div className="section bg-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-4">Conheça nosso espaço</h2>
          <p className="text-gray-500 mb-10">Fotos da clínica, consultórios e studio de Pilates.</p>
          <GalleryLightbox />
        </div>
      </div>

      {/* CTA */}
      <div className="section bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl mb-4">Venha nos conhecer pessoalmente</h2>
          <p className="text-white/60 mb-8">{CLINICA.endereco}</p>
          <a
            href={whatsappLink(WHATSAPP_MENSAGENS.localizacao)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Como chegar
          </a>
        </div>
      </div>
    </div>
  )
}
