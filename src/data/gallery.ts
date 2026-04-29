// ================================================================
// 📸  GALERIA DE FOTOS
// ADICIONAR: coloque a foto em /public/images/galeria/
//            e adicione um bloco { ... } no array abaixo
// REMOVER:   apague o bloco correspondente
// ORDEM:     mova os blocos para reordenar
// ================================================================

export type CategoriaGaleria = 'recepcao' | 'consultorio' | 'studio' | 'equipe'

export interface FotoGaleria {
  id:         string
  src:        string              // '/images/galeria/nome-da-foto.jpg'
  alt:        string              // descrição da foto (importante para SEO e acessibilidade)
  categoria:  CategoriaGaleria    // usado para filtrar as fotos por aba
}

export const GALERIA: FotoGaleria[] = [
  // ── RECEPÇÃO ──────────────────────────────────────────────
  {
    id:        'recepcao-1',
    src:       '/images/galeria/recepcao-1.jpg',
    alt:       'Recepção da clínica Santé — ambiente acolhedor e moderno',
    categoria: 'recepcao',
  },

  // ── CONSULTÓRIO ───────────────────────────────────────────
  {
    id:        'consultorio-1',
    src:       '/images/galeria/consultorio-1.jpg',
    alt:       'Consultório 1 — equipado para fisioterapia ortopédica',
    categoria: 'consultorio',
  },
  {
    id:        'consultorio-2',
    src:       '/images/galeria/consultorio-2.jpg',
    alt:       'Consultório 2 — ambiente individual para terapia manual',
    categoria: 'consultorio',
  },

  // ── STUDIO DE PILATES ─────────────────────────────────────
  {
    id:        'studio-1',
    src:       '/images/galeria/studio-1.jpg',
    alt:       'Studio de Pilates — equipado com aparelhos Reformer',
    categoria: 'studio',
  },

  // ── EQUIPE ────────────────────────────────────────────────
  {
    id:        'equipe-1',
    src:       '/images/galeria/equipe-1.jpg',
    alt:       'Equipe de fisioterapeutas da Santé',
    categoria: 'equipe',
  },

  // ────────────────────────────────────────────────────────────
  // ✅ PARA ADICIONAR NOVA FOTO, COPIE O BLOCO ABAIXO:
  // ────────────────────────────────────────────────────────────
  // {
  //   id:        'nome-unico',
  //   src:       '/images/galeria/nome-do-arquivo.jpg',
  //   alt:       'Descrição da foto para o Google',
  //   categoria: 'recepcao',  // recepcao | consultorio | studio | equipe
  // },
]

// Rótulos das categorias que aparecem nos botões de filtro
export const CATEGORIAS_LABELS: Record<CategoriaGaleria, string> = {
  recepcao:    'Recepção',
  consultorio: 'Consultórios',
  studio:      'Studio de Pilates',
  equipe:      'Equipe',
}
