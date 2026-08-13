## Visão geral
Site clínico estático construído com Next.js (App Router) + TypeScript e Tailwind CSS.
Conteúdo mantido em arquivos locais sob `src/data/`; sem CMS nem APIs internas.

## Como rodar
- Instalar dependências: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Start (produção): `npm start`

## Stack & configs principais
- Next.js (app router), React, TypeScript — [package.json](package.json)
- Tailwind CSS + PostCSS — [tailwind.config.ts](tailwind.config.ts), [postcss.config.js](postcss.config.js)
- Next config e imagens: [next.config.ts](next.config.ts)
- Global styles: [src/app/globals.css](src/app/globals.css)

## Estrutura do projeto
- `src/app` — rotas, layout e pages; layout global e metadata centralizados em [src/app/layout.tsx](src/app/layout.tsx)
- `src/components` — componentes reutilizáveis (Header, Footer, GalleryLightbox, TestimonialsCarousel, WhatsAppButton)
- `src/data` — conteúdo: `config.ts`, `services.ts`, `posts.ts`, `gallery.ts`, `team.ts`, `testimonials.ts`
- `public/images` — imagens de galeria, equipe e depoimentos

## Fluxo de dados e rotas
- Conteúdo é lido diretamente de `src/data/*` e injetado nas páginas; mudanças em `src/data` exigem novo build para SSG.
- Páginas dinâmicas usam `generateStaticParams()` / `generateMetadata()` (ex.: [src/app/especialidades/[slug]/page.tsx](src/app/especialidades/[slug]/page.tsx)).
- Blog e posts são data-driven a partir de `src/data/posts.ts`.

## Componentes-chave (onde editar)
- Header: [src/components/Header.tsx](src/components/Header.tsx)
- Footer: [src/components/Footer.tsx](src/components/Footer.tsx)
- Gallery / Lightbox: [src/components/GalleryLightbox.tsx](src/components/GalleryLightbox.tsx)
- Testimonials Carousel: [src/components/TestimonialsCarousel.tsx](src/components/TestimonialsCarousel.tsx)
- WhatsApp CTA: [src/components/WhatsAppButton.tsx](src/components/WhatsAppButton.tsx)

## Pontos de atenção imediatos (prioridade alta)
- IDs duplicados em [src/data/team.ts](src/data/team.ts) — causa problemas com chaves React e rotas; corrigir para IDs únicos.
- Uso de thumbnails externos (YouTube) em `TestimonialsCarousel` pode exigir adicionar domínios em [next.config.ts](next.config.ts) para `next/image`.
- `GalleryLightbox` precisa de foco/trapping e `aria-modal` para acessibilidade.
- Carousel: revisar cálculo de `transform` e comportamento responsivo para evitar layout jitter.

## Acessibilidade & SEO
- Layout centraliza `metadata` e JSON-LD em [src/app/layout.tsx](src/app/layout.tsx) — verifique títulos/descriptions únicos por página.
- Auditar elementos interativos (botões, toggles) para `aria-label`, keyboard focus e `alt` em imagens.

## Testes, linting e CI (recomendações)
- Adicionar ESLint com regras Next/React/TypeScript e `plugin:jsx-a11y`.
- Adicionar Prettier e integração com ESLint.
- Testes unitários: `Header`, `GalleryLightbox`, `TestimonialsCarousel`, `WhatsAppButton`.
- E2E: navegação básica e checagem de geração SSG para `especialidades`.
- Criar pipeline CI (GitHub Actions) que rode lint + testes no PR.

## Tarefas sugeridas (curto prazo)
1. Corrigir IDs duplicados em `src/data/team.ts`.
2. Atualizar `next.config.ts` se `next/image` for usado com domínios externos (ex.: `img.youtube.com`).
3. Implementar focus trap e `aria-modal` no lightbox.
4. Adicionar ESLint + Prettier e rodar correções automáticas.
5. Cobrir componentes interativos com testes unitários.

## Arquivos de referência rápidos
- [package.json](package.json) — scripts e dependências
- [next.config.ts](next.config.ts) — imagens/domínios
- [src/app/layout.tsx](src/app/layout.tsx) — metadata e schema
- [src/app/especialidades/[slug]/page.tsx](src/app/especialidades/[slug]/page.tsx) — SSG hooks
- [src/data/team.ts](src/data/team.ts) — corrigir IDs duplicados
- [src/components/GalleryLightbox.tsx](src/components/GalleryLightbox.tsx) — acessibilidade modal
- [src/components/TestimonialsCarousel.tsx](src/components/TestimonialsCarousel.tsx) — thumbnails/carousel

## Checklist antes de PR
- [ ] `npm run build` sem erros
- [ ] ESLint sem erros (ou corrigidos)
- [ ] Testes unitários essenciais verdes
- [ ] Revisão de acessibilidade nas mudanças

---

Documento gerado automaticamente com base na inspeção do repositório. Atualize `agents.md` no repositório quando aprovar o conteúdo.
