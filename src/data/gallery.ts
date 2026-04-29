// ================================================================
// 📸  GALERIA DE FOTOS
// ADICIONAR FOTO: coloque em /public/images/galeria/ e adicione
//                um objeto no array da categoria correspondente
// ADICIONAR CATEGORIA: adicione a chave em CategoriaGaleria,
//                      no GALERIA e em CATEGORIAS_LABELS
// ================================================================

export type CategoriaGaleria = 'recepcao' | 'consultorio' | 'studio' | 'equipe'

export interface FotoGaleria {
  id:        string
  src:       string   // '/images/galeria/nome-do-arquivo.jpg'
  alt:       string   // descrição pra SEO e acessibilidade
  categoria: CategoriaGaleria
}

export const GALERIA: FotoGaleria[] = [
  // ── RECEPÇÃO ──────────────────────────────────────────────────
  {
    id:        'recepcao-1',
    src:       '/images/galeria/recepcao-1.jpg',
    alt:       'Recepção da clínica Santé — ambiente acolhedor',
    categoria: 'recepcao',
  },
  // { id: 'recepcao-2', src: '/images/galeria/recepcao-2.jpg', alt: '...', categoria: 'recepcao' },

  // ── CONSULTÓRIOS ──────────────────────────────────────────────
  {
    id:        'consultorio-1',
    src:       '/images/galeria/consultorio-1.jpg',
    alt:       'Consultório 1 — fisioterapia ortopédica',
    categoria: 'consultorio',
  },
  {
    id:        'consultorio-2',
    src:       '/images/galeria/consultorio-2.jpg',
    alt:       'Consultório 2 — terapia manual',
    categoria: 'consultorio',
  },
  // { id: 'consultorio-3', src: '/images/galeria/consultorio-3.jpg', alt: '...', categoria: 'consultorio' },

  // ── STUDIO DE PILATES ─────────────────────────────────────────
  {
    id:        'studio-1',
    src:       '/images/galeria/studio-1.jpg',
    alt:       'Studio de Pilates — aparelhos Reformer',
    categoria: 'studio',
  },
  // { id: 'studio-2', src: '/images/galeria/studio-2.jpg', alt: '...', categoria: 'studio' },

  // ── EQUIPE ────────────────────────────────────────────────────
  {
    id:        'equipe-1',
    src:       '/images/galeria/equipe-1.jpg',
    alt:       'Equipe de fisioterapeutas da Santé',
    categoria: 'equipe',
  },

  // ────────────────────────────────────────────────────────────
  // ✅ PARA ADICIONAR NOVA FOTO:
  // { id: 'nome-unico', src: '/images/galeria/arquivo.jpg', alt: 'Descrição', categoria: 'studio' },
]

export const CATEGORIAS_LABELS: Record<CategoriaGaleria, string> = {
  recepcao:    'Recepção',
  consultorio: 'Consultórios',
  studio:      'Studio de Pilates',
  equipe:      'Equipe',
}