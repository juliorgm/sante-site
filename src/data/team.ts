// ================================================================
// 👥  EQUIPE DA CLÍNICA — dados profissionais
//
// ⚠️  REGRA CRÍTICA: nunca invente, deduza ou "complete" registro
//     profissional, formação, instituição ou ano. Dado profissional
//     errado publicado é infração ética perante o CREFITO.
//     Fonte da verdade dos currículos: docs/context/equipe.md
//
// ⚠️  PENDÊNCIA ABERTA: o CREFITO da Liane NÃO está confirmado.
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
    crefito:   'CREFITO-8 / 100885-F',
    crefitoConfirmado: false, // TODO-CREFITO: não veio no currículo de 16/09. Confirmar.
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
    foto:     '/images/equipe/fisioterapeuta-em-belém.png',
    destaque: true,
  },

  {
    id:        'liane-melo',
    nome:      'Dra. Liane Melo',
    nomeCurto: 'Liane',
    titulo:    'Fisioterapeuta',
    categoria: 'fisioterapeuta',

    // ────────────────────────────────────────────────────────────
    // 🚨 TODO-CREFITO — JÚLIO, TROCAR MANUALMENTE
    //
    // O número abaixo é o que já estava publicado no site, mas ele
    // aparecia DUPLICADO com o da Camila. O currículo de 16/09
    // esclareceu que o registro da Camila é 395039.1.F, o que sugere
    // — mas NÃO confirma — que 168221-F pertence à Liane.
    //
    // Não deduza. Peça o número à Liane, substitua a linha abaixo e
    // troque crefitoConfirmado para true.
    // ────────────────────────────────────────────────────────────
    crefito:   'CREFITO-8 / 168221-F',
    crefitoConfirmado: false,

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
    foto:     '/images/equipe/professora-pilates-em-belém.png',
    destaque: true,
  },

  {
    id:        'camila-nobre',
    nome:      'Dra. Camila Nobre de Souza',
    nomeCurto: 'Camila',
    titulo:    'Fisioterapeuta',
    categoria: 'fisioterapeuta',
    crefito:   '395039.1.F',
    crefitoConfirmado: true, // formato divergente dos demais — conferir grafia oficial
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
    foto:     '/images/equipe/professora-pilates-em-batista-campos-belém.png',
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

    // 💬 JÚLIO: a Juliana é atleta de jiu-jitsu. Isso é contexto pessoal,
    //    NÃO credencial clínica — por isso vai em "bio" e nunca nos chips.
    //    Descomente a linha abaixo DEPOIS de confirmar com ela que
    //    tem interesse em aparecer assim. Ver docs/context/equipe.md.
    // bio: 'Atleta de jiu-jitsu.',

    foto:     '/images/equipe/fisioterapeuta-na-batista-campos.png',
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

// ================================================================
// 📋 PENDÊNCIAS ABERTAS — não publique nada daqui como resolvido
// ================================================================
export const PENDENCIAS_EQUIPE = [
  'CREFITO da Liane Melo — número no site NÃO confirmado (TODO-CREFITO)',
  'CREFITO da Natália Silva — não veio no currículo de 16/09',
  'Região do CREFITO — Juliana é CREFITO-12 (abrange o Pará); Natália e Liane constam como CREFITO-8. Conferir.',
  'Grafia oficial do número da Camila (395039.1.F) — formato divergente dos demais',
  'Sobrenome da Liane — site publicava "Oliveira", currículo diz "Melo" (aplicado: Melo)',
  'Confirmar se Milos Eduardo ainda faz parte da equipe',
] as const
