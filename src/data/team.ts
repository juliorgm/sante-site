// ================================================================
// 👥  EQUIPE DA CLÍNICA — dados profissionais
//
// ⚠️  REGRA CRÍTICA: nunca invente, deduza ou "complete" registro
//     profissional, formação, instituição ou ano. Dado profissional
//     errado publicado é infração ética perante o CREFITO.
//     Fonte da verdade dos currículos: docs/context/equipe.md
//
// ⚠️  PENDÊNCIA ABERTA: o CREFITO da Natália ainda NÃO foi confirmado.
//     Procure por "TODO-CREFITO" abaixo.
//
// ADICIONAR: copie um bloco { ... } e cole antes do fechamento ]
// FOTO:      coloque em /public/images/equipe/ e atualize "foto"
// ================================================================

/** Um item de formação acadêmica ou técnica. */
export interface Formacao {
  tipo:         'graduacao' | 'pos' | 'mestrado' | 'formacao'
  titulo:       string
  instituicao?: string
  ano?:         number
  /** true = ainda cursando. NUNCA publique como concluída. */
  emCurso?:     boolean
}

export interface Profissional {
  id:              string
  nome:            string    // nome público completo
  nomeCurto:       string    // usado em CTAs ("Agendar com Natália")
  titulo:          string    // ex: "Fisioterapeuta" | "Recepção e atendimento"
  /** Separa quem atende clinicamente de quem compõe a equipe de apoio. */
  categoria:       'fisioterapeuta' | 'atendimento'
  /** Só para quem tem registro. Equipe de apoio não tem — deixe fora. */
  crefito?:        string
  /** false = número ainda não confirmado pela profissional. */
  crefitoConfirmado?: boolean
  especializacoes: string[]  // chips públicos — só o que o currículo comprova
  formacao?:       Formacao[]
  /** Uma linha de destaque. Vira o subtítulo do perfil. */
  destaqueTexto?:  string
  /** Nota pessoal/humanizadora. NÃO é credencial clínica. */
  bio?:            string
  foto:            string
  destaque?:       boolean   // true = aparece na home
}

export const EQUIPE: Profissional[] = [
  {
    id:        'natalia-silva',
    nome:      'Dra. Natália Silva',
    nomeCurto: 'Natália',
    titulo:    'Fisioterapeuta',
    categoria: 'fisioterapeuta',
    crefito:   'CREFITO- / 100885-F',
    crefitoConfirmado: true,
    especializacoes: [
      'RPG',
      'Método Busquet',
      'Maitland',
      'Isostretching',
      'Pilates Clássico',
      'Fisioterapia Esportiva',
    ],
    formacao: [
      { tipo: 'graduacao', titulo: 'Fisioterapia', instituicao: 'UNAMA', ano: 2008 },
      { tipo: 'pos',       titulo: 'Ortopedia e Traumatologia Clínica' },
      { tipo: 'mestrado',  titulo: 'Fisioterapia Desportiva', instituicao: 'Portugal' },
      { tipo: 'formacao',  titulo: 'RPG' },
      { tipo: 'formacao',  titulo: 'Maitland' },
      { tipo: 'formacao',  titulo: 'Método Busquet' },
      { tipo: 'formacao',  titulo: 'Isostretching' },
      { tipo: 'formacao',  titulo: 'Pilates Contemporâneo e Clássico' },
    ],
    destaqueTexto: 'Mestre em Fisioterapia Desportiva',
    bio: 'Ministrante de cursos de formação em Pilates e de treinamentos de equipe.',
    foto:     '/images/equipe/natalia-silva-fisioterapeuta-batista-campos-belem.webp',
    destaque: true,
  },

  {
    id:        'liane-melo',
    nome:      'Dra. Liane Melo',
    nomeCurto: 'Liane',
    titulo:    'Fisioterapeuta',
    categoria: 'fisioterapeuta',

    // ✅ Número confirmado pelo Júlio em 17/09/2026: era da Liane mesmo.
    //    A duplicação vinha do lado da Camila, corrigida em 16/09.
    crefito:   'CREFITO-12 / 168221-F',
    crefitoConfirmado: true,

    especializacoes: [
      'Pilates Clássico — Nível 3',
      "Tutora do Instituto D'Jati",
    ],
    formacao: [
      { tipo: 'graduacao', titulo: 'Fisioterapia', instituicao: 'Escola Superior da Amazônia', ano: 2011 },
      { tipo: 'pos',       titulo: 'Fisioterapia', instituicao: 'Instituto Inverty', ano: 2013 },
      { tipo: 'formacao',  titulo: 'Pilates Clássico — Formação completa, Nível 3', instituicao: "Método D'Jati", ano: 2024 },
    ],
    destaqueTexto: "Tutora do Instituto D'Jati em Pilates Clássico",
    bio: 'Acompanha alunos em sua jornada de aprofundamento no método Clássico.',
    foto:    '/images/equipe/liane-melo-fisioterapeuta-batista-campos-belem.webp',
    destaque: true,
  },

  {
    id:        'camila-nobre',
    nome:      'Dra. Camila Nobre de Souza',
    nomeCurto: 'Camila',
    titulo:    'Fisioterapeuta',
    categoria: 'fisioterapeuta',
    crefito:   'CREFITO-12 / 395039.1-F',
    crefitoConfirmado: true,
    especializacoes: [
      'Gerontologia e Geriatria',
      'Doenças Cardiorrespiratórias',
      'Pilates',
    ],
    formacao: [
      { tipo: 'graduacao', titulo: 'Fisioterapia', instituicao: 'Faculdade Ideal (FACI Wyden)' },
      { tipo: 'formacao',  titulo: 'Método Pilates', instituicao: 'Instituto Corpore' },
      { tipo: 'pos',       titulo: 'Fisioterapia Gerontológica e Geriátrica', instituicao: 'Faculdade Líbano' },
      { tipo: 'pos',       titulo: 'Fisioterapia nas Doenças Cardiorrespiratórias', instituicao: 'Faculdade Líbano' },
      { tipo: 'pos',       titulo: 'Fisioterapia em Terapia Intensiva', instituicao: 'Cesupa', emCurso: true },
    ],
    destaqueTexto: 'Especialista em Geriatria e Doenças Cardiorrespiratórias',
    foto:     '/images/equipe/camila-nobre-fisioterapeuta-batista-campos-belem.webp',
    destaque: true,
  },

  {
    id:        'juliana-gomes',
    nome:      'Dra. Maria Juliana Pantoja Gomes',
    nomeCurto: 'Juliana',
    titulo:    'Fisioterapeuta',
    categoria: 'fisioterapeuta',
    crefito:   'CREFITO-12 / 444859-F',
    crefitoConfirmado: true,
    especializacoes: [
      'Traumato-Ortopedia e Esportiva',
      'Pilates',
    ],
    formacao: [
      { tipo: 'graduacao', titulo: 'Fisioterapia', instituicao: 'Universidade Federal do Pará' },
      { tipo: 'formacao',  titulo: 'Método Pilates', instituicao: "Instituto D'Jati" },
      { tipo: 'pos',       titulo: 'Traumato-Ortopedia e Esportiva', instituicao: 'Cesupa', emCurso: true },
    ],
    destaqueTexto: 'Graduada pela Universidade Federal do Pará',
    foto:     '/images/equipe/maria-juliana-fisioterapeuta-batista-campos-belem.webp',
    destaque: true,
  },

  // ────────────────────────────────────────────────────────────
  // 👋 EQUIPE DE ATENDIMENTO
  //
  // JÚLIO: descomente e preencha quando tiver a foto e um texto
  // aprovado pela Aline. Repare que NÃO há crefito nem formacao —
  // os dois campos viraram opcionais exatamente para isto, para
  // que a equipe de apoio não precise fingir credencial clínica.
  // ────────────────────────────────────────────────────────────
  // {
  //   id:        'aline',
  //   nome:      'Aline',                    // sobrenome, se ela quiser
  //   nomeCurto: 'Aline',
  //   titulo:    'Recepção e atendimento',
  //   categoria: 'atendimento',
  //   especializacoes: ['Acolhimento', 'Agendamento'],
  //   destaqueTexto: 'É quem recebe você na Santé',
  //   bio:  'TEXTO A APROVAR COM A ALINE',
  //   foto: '/images/equipe/aline.jpg',
  //   destaque: false,                       // true = aparece na home
  // },
]
