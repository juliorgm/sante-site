// ================================================================
// 🏥  SERVIÇOS DA CLÍNICA
// ADICIONAR: copie um bloco { ... }, e cole antes do fechamento ]
// REMOVER:   apague o bloco { ... } do serviço
// REORDENAR: mova os blocos na ordem desejada
// ================================================================

export interface Servico {
  id:        string   // identificador único (sem espaços/acentos) → vira a URL /especialidades/[id]
  nome:      string   // nome exibido no site
  resumo:    string   // frase curta para cards (máx. 2 linhas)
  descricao: string   // texto completo da página do serviço
  beneficios: string[] // lista de benefícios (aparece como tópicos)
  icone:     string   // emoji representativo
  destaque?: boolean  // true = aparece na home em destaque (recomendado: máx 3)
  cta?:      string   // mensagem pré-preenchida no WhatsApp ao clicar neste serviço
                      // deixe undefined para usar a mensagem padrão
}

export const SERVICOS: Servico[] = [
  // ────────────────────────────────────────────────────────────
  {
    id:       'fisioterapia-ortopedica',
    nome:     'Fisioterapia Ortopédica',
    resumo:   'Tratamento especializado de dores musculares, lesões articulares e reabilitação pós-cirúrgica.',
    descricao: `A Fisioterapia Ortopédica na Santé é realizada em sessões individuais de 50 minutos, com avaliação completa e protocolo personalizado para cada paciente.

Tratamos lesões musculoesqueléticas, dores crônicas, recuperação após cirurgias e traumas. Cada sessão é dedicada exclusivamente a você — sem divisão de atenção com outros pacientes.`,
    beneficios: [
      'Sessão individual de 50 minutos com foco total em você',
      'Protocolo personalizado após avaliação detalhada',
      'Alívio de dores agudas e crônicas',
      'Reabilitação pós-operatória segura e eficaz',
      'Profissionais com especialização comprovada',
    ],
    icone:    '🦴',
    destaque: true,
    cta:      'Olá! Tenho interesse na Fisioterapia Ortopédica. Como funciona o atendimento?',
  },
  // ────────────────────────────────────────────────────────────
  {
    id:       'pilates',
    nome:     'Pilates',
    resumo:   'Método que fortalece o corpo, corrige postura e melhora a qualidade de movimento.',
    descricao: `O Pilates na Santé vai além das academias tradicionais. Nosso método é conduzido por fisioterapeutas especializados, unindo os princípios clássicos do Pilates com a visão clínica de quem entende o corpo em profundidade.

Indicado para reabilitação, melhora de postura, fortalecimento muscular e qualidade de vida. Aulas individuais e em pequenos grupos com supervisão constante.`,
    beneficios: [
      'Conduzido por fisioterapeutas, não apenas instrutores',
      'Melhora de postura e alinhamento corporal',
      'Fortalecimento do core e da musculatura profunda',
      'Redução de dores crônicas nas costas',
      'Aulas individuais e em grupos reduzidos',
    ],
    icone:    '🧘',
    destaque: true,
    cta:      'Olá! Tenho interesse nas aulas de Pilates da Santé. Como funciona?',
  },
  // ────────────────────────────────────────────────────────────
  {
    id:       'rpg',
    nome:     'RPG',
    resumo:   'Reeducação Postural Global para corrigir desvios e aliviar dores causadas por má postura.',
    descricao: `A Reeducação Postural Global (RPG) é uma abordagem terapêutica que trata o corpo como um todo. Em vez de focar apenas no ponto de dor, analisa as cadeias musculares que conectam toda a estrutura corporal.

Ideal para escoliose, hipercifose, hiperlordose, dores cervicais e lombares crônicas. O tratamento utiliza posturas ativas mantidas por longos períodos para promover uma reprogramação postural profunda e duradoura.`,
    beneficios: [
      'Correção de desvios posturais crônicos',
      'Tratamento global do corpo, não apenas do sintoma',
      'Alívio de dores cervicais, lombares e nos joelhos',
      'Melhora da respiração e da consciência corporal',
      'Resultados duradouros e progressivos',
    ],
    icone:    '🏥',
    destaque: true,
    cta:      'Olá! Gostaria de saber mais sobre o RPG. Como funciona o tratamento?',
  },
  // ────────────────────────────────────────────────────────────
  {
    id:       'terapia-manual',
    nome:     'Terapia Manual',
    resumo:   'Técnicas hands-on para mobilização articular, alívio de tensões e restauração do movimento.',
    descricao: `A Terapia Manual é um conjunto de técnicas realizadas pelas mãos do fisioterapeuta para restaurar a mobilidade articular, aliviar tensões musculares e melhorar a função do sistema musculoesquelético.

Inclui técnicas de mobilização, manipulação, liberação miofascial e neuromuscular. É uma abordagem altamente eficaz para dores agudas e crônicas, com resultados perceptíveis desde as primeiras sessões.`,
    beneficios: [
      'Alívio imediato de dores articulares e musculares',
      'Restauração da mobilidade e amplitude de movimento',
      'Técnicas seguras aplicadas por profissionais especializados',
      'Combinável com outros recursos terapêuticos',
      'Eficaz para cervicalgias, lombalgias e disfunções articulares',
    ],
    icone:    '🤲',
    destaque: false,
    cta:      'Olá! Gostaria de saber mais sobre a Terapia Manual. Como funciona?',
  },
  // ────────────────────────────────────────────────────────────
  {
    id:       'pilates-classico',
    nome:     'Pilates Clássico',
    resumo:   'Método original de Joseph Pilates com aparelhos e sequências tradicionais.',
    descricao: `O Pilates Clássico segue a ordem e os princípios originais desenvolvidos por Joseph Pilates, utilizando todos os aparelhos tradicionais: Reformer, Cadillac, Chair, Barrel e Mat.

É indicado para quem busca a prática fiel ao método, com foco em controle, fluidez e precisão de movimentos. Na Santé, unimos a tradição do método clássico com o olhar clínico do fisioterapeuta.`,
    beneficios: [
      'Método original fiel às sequências de Joseph Pilates',
      'Uso de todos os aparelhos clássicos',
      'Desenvolvimento de força, equilíbrio e coordenação',
      'Supervisionado por fisioterapeutas especializados',
      'Adequado a diferentes níveis de condicionamento',
    ],
    icone:    '⚖️',
    destaque: false,
    cta:      'Olá! Tenho interesse no Pilates Clássico. Como funcionam as aulas?',
  },
  // ────────────────────────────────────────────────────────────
  {
    id:       'reforco-muscular',
    nome:     'Reforço Muscular',
    resumo:   'Fortalecimento terapêutico para prevenção de lesões e melhora do desempenho físico.',
    descricao: `O Reforço Muscular Terapêutico é um programa estruturado de fortalecimento supervisionado por fisioterapeutas, diferente do treino de academia convencional.

O foco é corrigir desequilíbrios musculares, proteger articulações e preparar o corpo para as demandas do dia a dia ou do esporte. Indicado para quem está em reabilitação, quer prevenir lesões ou retornar às atividades físicas com segurança.`,
    beneficios: [
      'Programa personalizado por fisioterapeuta',
      'Correção de desequilíbrios musculares',
      'Prevenção de lesões e recidivas',
      'Retorno seguro ao esporte e atividades físicas',
      'Acompanhamento contínuo da evolução',
    ],
    icone:    '💪',
    destaque: false,
    cta:      'Olá! Gostaria de saber mais sobre o Reforço Muscular terapêutico.',
  },

  // ────────────────────────────────────────────────────────────
  // ✅ PARA ADICIONAR UM NOVO SERVIÇO, COPIE O BLOCO ABAIXO:
  // ────────────────────────────────────────────────────────────
  // {
  //   id:       'nome-do-servico',          // sem espaços ou acentos
  //   nome:     'Nome do Serviço',
  //   resumo:   'Frase curta de impacto.',
  //   descricao: `Descrição completa aqui.`,
  //   beneficios: [
  //     'Benefício 1',
  //     'Benefício 2',
  //     'Benefício 3',
  //   ],
  //   icone:    '🔧',
  //   destaque: false,
  //   cta:      'Olá! Tenho interesse em [Nome do Serviço].',
  // },
]
