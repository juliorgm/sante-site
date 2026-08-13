import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Permite imagens do seu domínio e domínios externos se precisar
    domains: ['img.youtube.com', 'i.ytimg.com'],
  },
}

export default nextConfig
