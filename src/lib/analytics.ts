// ================================================================
// 📊 MEDIÇÃO — modelo de eventos da Santé
//
// Ver docs/plano-ads-analytics.md para o racional completo.
//
// REGRA: todo clique que leva ao WhatsApp dispara `whatsapp_click`.
// CTA sem evento é considerado bug — cria um buraco de atribuição
// que ninguém percebe até a hora de decidir orçamento de anúncio.
//
// ⚠️ NÃO renomeie eventos nem parâmetros depois que houver histórico.
//    Renomear evento no GA4 não migra o histórico: ele se perde.
// ================================================================

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void
  }
}

const CHAVE = 'sante_origem'

export interface Origem {
  /** Código curto que vai na mensagem do WhatsApp. Ex: SA-ADS-0916 */
  codigo:       string
  fonte:        string
  gclid?:       string
  utm_source?:  string
  utm_medium?:  string
  utm_campaign?: string
  utm_term?:    string
  utm_content?: string
  referrer?:    string
  capturadoEm:  string
}

function dd(n: number) {
  return n < 10 ? '0' + n : String(n)
}

/** Classifica a origem em três letras, legíveis para quem atende. */
function classificarFonte(p: URLSearchParams, referrer: string): string {
  // gbraid/wbraid substituem o gclid quando o usuário está em iOS
  // com restrição de rastreamento — ainda é tráfego pago.
  if (p.get('gclid') || p.get('gbraid') || p.get('wbraid')) return 'ADS'

  const utm = (p.get('utm_source') || '').toLowerCase()
  if (utm) {
    if (utm.indexOf('instagram') >= 0) return 'INS'
    if (utm.indexOf('facebook') >= 0) return 'FCB'
    if (utm.indexOf('negocio') >= 0 || utm.indexOf('gmb') >= 0 || utm.indexOf('maps') >= 0) return 'GMN'
    return utm.slice(0, 3).toUpperCase()
  }

  const r = referrer.toLowerCase()
  if (!r) return 'DIR'                                   // acesso direto
  if (r.indexOf('instagram') >= 0) return 'INS'
  if (r.indexOf('facebook') >= 0) return 'FCB'
  if (r.indexOf('google.') >= 0 || r.indexOf('bing.') >= 0 || r.indexOf('duckduckgo') >= 0) return 'ORG'
  return 'REF'                                           // outro site
}

/**
 * Captura gclid/UTM na chegada e guarda na sessão.
 *
 * Este é o item central da medição: sem ele o identificador da campanha
 * é destruído no momento em que a pessoa sai para o WhatsApp, e toda
 * conversa chega indistinguível. A PRIMEIRA origem da sessão prevalece —
 * navegar entre páginas não sobrescreve de onde a pessoa veio.
 *
 * Idempotente: pode ser chamada quantas vezes for.
 */
export function capturarOrigem(): Origem | null {
  if (typeof window === 'undefined') return null

  try {
    const p = new URLSearchParams(window.location.search)
    const temParametro = Boolean(
      p.get('gclid') || p.get('gbraid') || p.get('wbraid') || p.get('utm_source')
    )

    const guardado = sessionStorage.getItem(CHAVE)
    if (guardado && !temParametro) {
      return JSON.parse(guardado) as Origem
    }
    if (guardado && temParametro) {
      // Já há origem e chegou parâmetro novo: a primeira continua valendo.
      const anterior = JSON.parse(guardado) as Origem
      if (anterior.fonte === 'ADS') return anterior
    }

    const agora = new Date()
    const referrer = document.referrer || ''
    const fonte = classificarFonte(p, referrer)

    const origem: Origem = {
      codigo: 'SA-' + fonte + '-' + dd(agora.getMonth() + 1) + dd(agora.getDate()),
      fonte,
      gclid:        p.get('gclid') || p.get('gbraid') || p.get('wbraid') || undefined,
      utm_source:   p.get('utm_source') || undefined,
      utm_medium:   p.get('utm_medium') || undefined,
      utm_campaign: p.get('utm_campaign') || undefined,
      utm_term:     p.get('utm_term') || undefined,
      utm_content:  p.get('utm_content') || undefined,
      referrer:     referrer || undefined,
      capturadoEm:  agora.toISOString(),
    }

    sessionStorage.setItem(CHAVE, JSON.stringify(origem))
    return origem
  } catch {
    // sessionStorage bloqueado (aba anônima, cookies desativados).
    // A medição degrada, o site continua funcionando.
    return null
  }
}

/** Lê a origem da sessão, capturando se ainda não houver. */
export function origemAtual(): Origem | null {
  return capturarOrigem()
}

/** Acrescenta o código de origem à mensagem pré-preenchida. */
export function mensagemComRef(mensagem: string, origem: Origem | null): string {
  return origem ? mensagem + ' [ref ' + origem.codigo + ']' : mensagem
}

export interface DadosClique {
  /** Onde na página: hero, header, cta_final, card_servico... */
  secao:   string
  /** Qual intenção: agendamento, pilates, preco, <slug do serviço>... */
  assunto: string
}

/**
 * CONVERSÃO PRINCIPAL. É este evento que deve estar marcado como ação
 * de conversão no Google Ads.
 */
export function trackWhatsApp({ secao, assunto }: DadosClique) {
  if (typeof window === 'undefined' || !window.gtag) return
  const origem = origemAtual()

  window.gtag('event', 'whatsapp_click', {
    event_category: 'contact',
    // event_label mantido por compatibilidade com o histórico existente
    event_label: secao + ':' + assunto,
    pagina:  window.location.pathname,
    secao,
    assunto,
    origem:  origem ? origem.codigo : 'SA-DIR',
    fonte:   origem ? origem.fonte : 'DIR',
    campanha: origem?.utm_campaign || '',
  })
}

/** Micro-conversões: sinal de intenção que não é a conversa. */
export function trackEvento(nome: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', nome, { pagina: window.location.pathname, ...params })
}
