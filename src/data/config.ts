// ================================================================
// ⚙️  CONFIGURAÇÃO GERAL DO SITE
// Edite este arquivo para atualizar dados da clínica sem mexer
// em nenhum outro arquivo.
// ================================================================

export const CLINICA = {
  nome:     'Santé',
  subtitulo: 'Fisioterapia e Pilates em Belém',
  slogan:   'Cuide do seu corpo. Viva sem dor.',
  descricao: 'Na Santé, unimos técnica avançada e cuidado humanizado para devolver qualidade de vida a cada paciente.',

  // Endereço completo
  endereco:  'Ed. Urbe Office - Av. Serzedelo Corrêa, 805 - loja 06 - térreo - Batista Campos, Belém - PA, 66033-770',
  // ↑ Troque pelo endereço real

  // Horários de atendimento
  horarios: [
    { dia: 'Segunda a Sexta', hora: '06:30h às 20:30h' },
    { dia: 'Sábado',          hora: '08h às 12h' },
  ],

  email: 'administracao@santefisioterapia.com.br',
}

// ================================================================
// 📱 WHATSAPP — número e mensagens pré-preenchidas por botão
// ================================================================
// Formato do número: código do país + DDD + número (sem + ou espaços)
const WHATSAPP_NUMERO = '5591980609411'

// Função que gera o link do WhatsApp com a mensagem escolhida
export function whatsappLink(mensagem: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`
}

// Mensagens pré-definidas — adicione quantas quiser aqui
// Cada entrada vira um botão diferente no site
export const WHATSAPP_MENSAGENS = {
  geral:         'Olá! Gostaria de saber mais sobre os serviços da Santé.',
  agendamento:   'Olá! Gostaria de saber como funciona o atendimento na Santé.',
  funcionamento: 'Olá! Gostaria de saber como funciona o atendimento na Santé.',
  pilates:       'Olá! Gostaria de saber mais sobre as aulas de Pilates da Santé.',
  preco:         'Olá! Gostaria de mais informações sobre os serviços da Santé.',
  localizacao:   'Olá! Gostaria de saber como chegar à clínica.',
}

// ================================================================
// 🔗 REDES SOCIAIS — deixe vazio ("") para esconder o ícone
// ================================================================
export const REDES_SOCIAIS = {
  instagram: 'https://instagram.com/sante.fisio', // ← troque pela URL real
  facebook:  'https://www.facebook.com/sante.fisio.belem/',  // ← troque pela URL real
  youtube:   '',  // deixe vazio para não exibir
}

// ================================================================
// 📊 GOOGLE TAG — envia dados pro GA4 e pro Google Ads (conta da Nat)
// ================================================================
// ID "guarda-chuva" da conta da Nat. Alimenta tanto o GA4 quanto o
// Google Ads (conversões de anúncio) com um único snippet — por
// isso usamos o GT-, e não o G- do GA4 sozinho.
// Se precisar trocar/atualizar, pegue o ID em: Google Ads ou
// Analytics da conta da Nat → "Tag do Google".
export const GOOGLE_TAG_ID = 'GT-KF63NMB5'

// ================================================================
// 🗺️  SEO — aparece no Google
// ================================================================
export const SEO = {
  title:       'Santé — Fisioterapia e Pilates em Belém',
  description: 'Fisioterapia ortopédica, Pilates, RPG e Terapia Manual em Belém do Pará. Agende sua avaliação!',
  keywords:    'fisioterapia Belém, pilates Belém, RPG fisioterapia, terapia manual, Santé fisioterapia',
  url:         'https://santefisioterapia.com.br',
}
