import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Permite imagens de domínios externos (thumbnails do YouTube nos depoimentos)
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
}

export default nextConfig
