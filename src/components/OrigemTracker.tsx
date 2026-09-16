'use client'
// ================================================================
// 🎯 CAPTURA DE ORIGEM
//
// Montado no layout: garante que gclid e UTM sejam guardados na
// chegada, mesmo que a pessoa não clique em nada nessa primeira
// página. Sem isso, quem chega por anúncio na home e só conversa
// três páginas depois perde a atribuição.
//
// Não renderiza nada.
// ================================================================

import { useEffect } from 'react'
import { capturarOrigem } from '@/lib/analytics'

export default function OrigemTracker() {
  useEffect(() => {
    capturarOrigem()
  }, [])
  return null
}
