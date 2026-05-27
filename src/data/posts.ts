// ================================================================
// 📝 ARTIGOS DO BLOG
// ADICIONAR: copie um bloco { ... }, e cole antes do fechamento ]
// REMOVER:   apague o bloco { ... } do artigo
// REORDENAR: mova os blocos na ordem desejada
// ================================================================

export interface Post {
  slug:      string   // URL amigável (sem espaços/acentos) → /blog/[slug]
  titulo:    string   // Título principal do artigo
  resumo:    string   // Breve resumo para a listagem
  data:      string   // Data de publicação (AAAA-MM-DD)
  categoria: string   // Categoria (Ex: Fisioterapia, Pilates, RPG)
  capa?:     string   // Caminho da imagem de capa (opcional)
}

export const POSTS: Post[] = [
  {
    slug:      'atendimento-individual-50-minutos',
    titulo:    'Por que o atendimento individual de 50 minutos faz diferença no resultado?',
    resumo:    'Em clínicas convencionais, o fisioterapeuta atende múltiplos pacientes ao mesmo tempo. Entenda por que isso compromete o resultado do tratamento.',
    data:      '2024-01-15',
    categoria: 'Fisioterapia',
    // capa:   '/images/blog/artigo-1.jpg',  // descomente quando tiver a foto
  },
  {
    slug:      'rpg-ou-fisioterapia-convencional',
    titulo:    'RPG ou Fisioterapia Convencional: qual a diferença?',
    resumo:    'Muitos pacientes chegam com dúvida: qual técnica é melhor para minha dor postural? A resposta depende do seu caso — veja como decidir.',
    data:      '2024-01-08',
    categoria: 'RPG',
  },
  {
    slug:      'pilates-para-dor-lombar',
    titulo:    '5 benefícios do Pilates para quem tem dor lombar',
    resumo:    'A dor lombar é a queixa mais comum em consultórios de fisioterapia. O Pilates Clínico pode ser um aliado poderoso — veja como.',
    data:      '2023-12-20',
    categoria: 'Pilates',
  },
]
