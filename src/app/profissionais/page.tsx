import { EQUIPE } from '@/data/team'
import TeamGrid from '@/components/TeamGrid'

export const metadata = {
  title: 'Profissionais | Santé — Fisioterapia em Belém',
  description:
    'Conheça os fisioterapeutas da Santé: formação, especializações e registro no CREFITO. Atendimento individual de 50 minutos em Belém.',
}

export default function ProfissionaisPage() {
  return (
    <div className="pt-24">
      <div className="bg-cream section pb-12">
        <div className="max-w-6xl mx-auto">
          <span className="badge mb-4 inline-block">Nossa equipe</span>
          <h1 className="font-serif text-4xl md:text-5xl text-navy mb-4">
            Conheça os fisioterapeutas da Santé
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Cada sessão é conduzida por fisioterapeuta com registro no CREFITO e formação
            específica na área do seu tratamento. Veja o currículo completo de cada uma.
          </p>
        </div>
      </div>

      <div className="section bg-white">
        <div className="max-w-6xl mx-auto">
          <TeamGrid equipe={EQUIPE} />
        </div>
      </div>
    </div>
  )
}
