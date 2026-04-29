import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // ============================================================
      // CORES DA MARCA — extraídas da logo
      // ============================================================
      colors: {
        teal:  '#0B9DB3',  // azul-petróleo (símbolo S — parte de cima)
        navy:  '#1B3B72',  // azul-marinho escuro (texto da logo)
        gold:  '#F5C41A',  // dourado/amarelo (símbolo S — parte de baixo)
        cream: '#F8F6F1',  // fundo off-white quente
      },
      // ============================================================
      // FONTES
      // ============================================================
      fontFamily: {
        serif: ['DM Serif Display', 'serif'],
        sans:  ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
