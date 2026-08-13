declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void
  }
}

export function trackWhatsAppClick(label: string) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'whatsapp_click', {
    event_category: 'contact',
    event_label: label,
  })
}