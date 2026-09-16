// ================================================================
// ⚙️  CONFIGURAÇÃO GERAL DO SITE
// Edite este arquivo para atualizar dados da clínica sem mexer
// em nenhum outro arquivo.
// ================================================================

// ── Tipos de horário ─────────────────────────────────────────────
export interface Turno {
  abre:  string   // 'HH:MM'
  fecha: string   // 'HH:MM'
}

export interface HorarioDia {
  label:      string    // como aparece no site
  diasSchema: string[]  // nomes em inglês, para o schema.org
  turnos:     Turno[]   // um ou mais turnos no mesmo dia
}

/** 'Segunda a quinta' -> '06:30 às 12:30 e 14:30 às 20:30' */
export function formatarTurnos(turnos: Turno[]): string {
  return turnos.map((t) => t.abre + ' às ' + t.fecha).join(' e ')
}

export const CLINICA = {
  nome:     'Santé',
  subtitulo: 'Fisioterapia e Pilates em Belém',
  slogan:   'Cuide do seu corpo. Viva sem dor.',
  descricao: 'Na Santé, unimos técnica avançada e cuidado humanizado para devolver qualidade de vida a cada paciente.',

  // Endereço completo
  endereco:  'Ed. Urbe Office - Av. Serzedelo Corrêa, 805 - loja 06 - térreo - Batista Campos, Belém - PA, 66033-770',
  // ↑ Troque pelo endereço real

  // ── Horários de atendimento ──────────────────────────────────
  // ⚠️ FONTE DA VERDADE. Confirmado pelo Júlio em 16/09/2026.
  //    O JSON-LD em layout.tsx é GERADO a partir daqui. Nunca
  //    redeclare horário em outro arquivo — foi assim que o site
  //    passou a anunciar a clínica aberta no horário de almoço.
  //    Cada turno vira um bloco separado no schema.
  //
  // ⚠️ SÁBADO: a clínica não atende. Se isso mudar, acrescente um
  //    bloco aqui e o site e o Google se atualizam sozinhos.
  horarios: [
    {
      label: 'Segunda a quinta',
      diasSchema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      turnos: [
        { abre: '06:30', fecha: '12:30' },
        { abre: '14:30', fecha: '20:30' },
      ],
    },
    {
      label: 'Sexta',
      diasSchema: ['Friday'],
      turnos: [{ abre: '06:30', fecha: '12:30' }],
    },
  ] as HorarioDia[],

  /** A agenda encerra antes do fechamento — regra de agendamento. */
  ultimoAtendimento: '19:30',

  /** O que acontece no intervalo entre os turnos. */
  avisoIntervalo:
    'Entre 12:30 e 14:30 recebemos mensagens no WhatsApp e respondemos a partir das 14:30.',

  email: 'administracao@santefisioterapia.com.br',
}

// ================================================================
// 📱 WHATSAPP — número e mensagens pré-preenchidas por botão
// ================================================================
// Formato do número: código do país + DDD + número (sem + ou espaços)
export const WHATSAPP_NUMERO = '5591980609411'

// Função que gera o link do WhatsApp com a mensagem escolhida
export function whatsappLink(mensagem: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`
}

// Mensagens pré-definidas — adicione quantas quiser aqui
// Cada entrada vira um botão diferente no site
export const WHATSAPP_MENSAGENS = {
  geral:         'Olá! Gostaria de saber mais sobre os serviços da Santé.',
  // ℹ️ Usada pelo CTA principal ("Fale com a gente", cabeçalho e hero).
  //    O rótulo convida a conversar e a mensagem fala em agendar — a
  //    assimetria é DELIBERADA. Ver docs/decisions/0001-cta-principal.md.
  //    Não "corrija" sem decisão nova do Júlio.
  agendamento:   'Olá! Gostaria de agendar uma avaliação na Santé.',
  funcionamento: 'Olá! Gostaria de saber como funciona o atendimento na Santé.',
  fisioterapia:  'Olá! Gostaria de saber mais sobre os atendimentos de fisioterapia da Santé.',
  pilates:       'Olá! Gostaria de saber mais sobre as aulas de Pilates da Santé.',
  domiciliar:    'Olá! Gostaria de saber sobre o atendimento domiciliar da Santé.',
  // ⏸️ Desativada em 16/09/2026 a pedido do Júlio ("por hora").
  //    A mensagem fica aqui para o botão voltar sem reescrever nada:
  //    basta repor a opção em WhatsAppButton.tsx e contato/page.tsx
  //    com assunto: 'preco'.
  preco:         'Olá! Gostaria de saber sobre valores e planos da Santé.',
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
