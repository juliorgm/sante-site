// ================================================================
// ⭐  DEPOIMENTOS DE PACIENTES
// ADICIONAR: copie um bloco { ... } e cole antes do fechamento ]
// REMOVER:   apague o bloco do depoimento
// FOTO:      coloque em /public/images/depoimentos/nome.jpg
// VÍDEO:     coloque em /public/videos/depoimento-nome.mp4
//            OU use um link do YouTube no campo videoUrl
// ================================================================

export interface Depoimento {
  id:        string
  nome:      string
  idade?:    number           // opcional
  problema:  string           // o que tratou (aparece como badge)
  texto:     string           // texto do depoimento
  foto?:     string           // '/images/depoimentos/nome.jpg'
  videoUrl?: string           // URL YouTube (ex: 'https://youtu.be/xxxxx')
                              // OU caminho local '/videos/depoimento-nome.mp4'
  nota:      1 | 2 | 3 | 4 | 5  // número de estrelas
  destaque?: boolean          // true = aparece na home
}

export const DEPOIMENTOS: Depoimento[] = [
  // ────────────────────────────────────────────────────────────
  // ⚠️ Substitua pelos depoimentos reais dos seus pacientes
  // ────────────────────────────────────────────────────────────
  {
    id:       'paciente-1',
    nome:     'Isabela Meschede',
    problema: 'Fortalecimento da lombar',
    texto:    'Sem dúvidas, o pilates foi essencial durante minha gestação, para o fortalecimento da lombar e ajudar nas dores no corpo durante este período. Aprendi a respirar melhor, controlar minha pelve, dentre outros muitos benefícios!! Indico a todas as gestantes e não gestantes 😍',
    foto:     '/images/depoimentos/sante-fisioterapia-e-pilates-isabela-meschede.jpg',
    nota:     5,
    destaque: true,
  },
  {
    id:       'paciente-2',
    nome:     'Ana Clara Barcessat',  
    problema: 'Pilates pós-parto',
    texto:    'Já conhecia o trabalho da Natália no pilates pois toda minha família faz e adora, e na minha gestação foi essencial poder contar com o auxílio dela nos exercícios próprios para essa fase. Já no pós parto fui atendida pela Liane que me auxiliou bastante no atendimento individualizado e terapia manual. Sou muito grata à Santé por todo esse cuidado! ',
    foto:     '/images/depoimentos/sante-fisioterapia-e-pilates-ana-clara-barcessat.jpg',
    nota:     5,
    destaque: true,
  },
  {
    id:       'paciente-3',
    nome:     'Mauro Bonna',
    problema: 'Pilates',
    texto:    'Pratico Pilates há mais de 20 anos. No passado tive problemas na lombar. Para dirigir a Salinas, parava quatro vezes para me alongar. Hoje, sou capaz de ir e voltar só parar por causa do BRT. Lembra dor de coluna, os mesmo a minha no jornal. \n Sinto também que o Pilates me ajuda no equilíbrio. Quando caio é besteira, tiro a bronca rápido! Sou um pilateiro! Aliás, pretendo praticar Pilates até os 99 anos.',
    //videoUrl: 'https://youtube.com/shorts/DG8NZGJZWec?feature=share', 
    foto:     '/images/depoimentos/sante-fisioterapia-e-pilates-mauro-bonna.jpg',
    nota:     5,
    destaque: true,
  },

  // ────────────────────────────────────────────────────────────
  // ✅ PARA ADICIONAR NOVO DEPOIMENTO, COPIE O BLOCO ABAIXO:
  // ────────────────────────────────────────────────────────────
  // {
  //   id:       'nome-paciente',
  //   nome:     'Nome Completo',
  //   idade:    30,
  //   problema: 'O que foi tratado',
  //   texto:    'Depoimento aqui...',
  //   foto:     '/images/depoimentos/nome-paciente.jpg',
  //   // videoUrl: 'https://youtu.be/xxxxx',
  //   nota:     5,
  //   destaque: false,
  // },
]
