// ================================================================
// 👥  EQUIPE DA CLÍNICA
// ADICIONAR: copie um bloco { ... } e cole antes do fechamento ]
// REMOVER:   apague o bloco do profissional
// FOTO:      coloque a imagem em /public/images/equipe/nome-da-foto.jpg
//            e atualize o campo "foto" abaixo
// ================================================================

export interface Profissional {
  id:              string    // identificador único
  nome:            string
  titulo:          string    // ex: "Fisioterapeuta"
  crefito:         string    // registro profissional
  especializacoes: string[]  // lista de especializações
  foto:            string    // caminho da foto: '/images/equipe/nome.jpg'
                             // se não tiver foto ainda, use '/images/equipe/placeholder.jpg'
  linkedin?:       string    // URL do LinkedIn (opcional)
  destaque?:       boolean   // true = aparece na home
}

export const EQUIPE: Profissional[] = [
  // ────────────────────────────────────────────────────────────
  // ⚠️ Substitua os dados abaixo pelos dados reais da equipe
  // ────────────────────────────────────────────────────────────
  {
    id:     'profissional-1',
    nome:   'Dra. Natália Silva',
    titulo: 'Fisioterapeuta',
    crefito: 'CREFITO-8 / 100885-F',
    especializacoes: [
      'Pilates',
      'Reforço Muscular',
      'Fisioterapia Ortopédica',
      'Terapia Manual',
      'Método Busquet',
    ],
    foto:    '/images/equipe/fisioterapeuta-em-belém.png',
    destaque: true,
  },
  {
    id:     'profissional-2',
    nome:   'Dra. Liane Oliveira',
    titulo: 'Fisioterapeuta',
    crefito: 'CREFITO-8 / 168221-F',
    especializacoes: [
      'Pilates',
      'Reforço Muscular',
      'Fisioterapia Ortopédica',
      'Terapia Manual',
    ],
    foto:    '/images/equipe/professora-pilates-em-belém.png',
    destaque: true,
  },
  {
    id:     'profissional-3',
    nome:   'Dr. Milos Eduardo',
    titulo: 'Fisioterapeuta',
    crefito: 'CREFITO-8 / 405414-F',
    especializacoes: [
      'Pilates',
      'Reforço Muscular',
      'Fisioterapia Ortopédica',
      'Terapia Manual',
    ],
    foto:    '/images/equipe/fisioterapeuta-na-batista-campos.png',
    destaque: true,
  },

    {
    id:     'profissional-4',
    nome:   'Dra. Camila Nobre',
    titulo: 'Fisioterapeuta',
    crefito: 'CREFITO-8 / 168221-F',
    especializacoes: [
      'Pilates',
      'Reforço Muscular',
      'Fisioterapia Ortopédica',
      'Terapia Manual',
    ],
    foto:    '/images/equipe/professora-pilates-em-batista-campos-belém.png',
    destaque: true,
  },

  // ────────────────────────────────────────────────────────────
  // ✅ PARA ADICIONAR UM NOVO PROFISSIONAL, COPIE O BLOCO ABAIXO:
  // ────────────────────────────────────────────────────────────
  // {
  //   id:     'nome-sobrenome',
  //   nome:   'Dr(a). Nome Sobrenome',
  //   titulo: 'Fisioterapeuta',
  //   crefito: 'CREFITO-8 / XXXXX-F',
  //   especializacoes: [
  //     'Especialização 1',
  //     'Especialização 2',
  //   ],
  //   foto:    '/images/equipe/nome-sobrenome.jpg',
  //   destaque: false,
  // },
]
