# Arquitetura técnica — sante-site

Atualizado em 2026-09-15.

## Stack

Next.js 16.2.4 com App Router, React 18, TypeScript e Tailwind CSS 3.4, hospedado na
Vercel. Repositório privado em `juliorgm/sante-site`.

O site é **totalmente estático**: não há backend, banco de dados, CMS ou rota de API. Todo
o conteúdo vem de arquivos TypeScript em `src/data/` e é resolvido em tempo de build. Essa
escolha é deliberada e está protegida pelo princípio 16 da constituição — a superfície de
ataque baixa e o custo de manutenção quase nulo valem mais, aqui, do que a comodidade de
um painel de administração.

Observação: a documentação anterior do projeto dizia "Next.js 14". O `package.json` diz
`^16.2.4`. A versão real é a 16.

## Estrutura

```
src/
  app/                    rotas (App Router)
    layout.tsx            metadata global + JSON-LD + Header/Footer/WhatsAppButton
    page.tsx              home (Hero, Diferencial, Servicos, Depoimentos, Equipe, CTA)
    sobre/  profissionais/  contato/
    especialidades/
      page.tsx            listagem
      [slug]/page.tsx     página dinâmica por serviço (generateStaticParams)
      pilates/page.tsx    ⚠️ override estático que sobrepõe o [slug] de "pilates"
    blog/
      page.tsx            listagem
      <slug>/page.tsx     um diretório por artigo, conteúdo em JSX
    sitemap.ts  robots.ts
  components/
    Header  Footer  WhatsAppButton
    TestimonialsCarousel  GalleryLightbox  GoogleTag  BlogPostSchema
  data/
    config.ts             ⭐ fonte da verdade: clínica, WhatsApp, redes, SEO, tag ID
    services.ts  team.ts  testimonials.ts  posts.ts  gallery.ts
  lib/
    analytics.ts          ⚠️ define trackWhatsAppClick() — atualmente não usado
public/images/            ~13 MB
```

## Convenções

Conteúdo mora em `src/data/`, nunca hardcoded na página. Cada arquivo de dados exporta uma
`interface` e um array, com comentários em português explicando como adicionar e remover
itens — o padrão foi desenhado para a Natália conseguir editar sem saber React, e isso
deve ser preservado em qualquer arquivo novo.

Cores e fontes vêm do `tailwind.config.ts` (`teal`, `navy`, `gold`, `cream`; `font-serif`
e `font-sans`). Classes de componente — `.btn-primary`, `.btn-outline`, `.badge`,
`.card`, `.section` — estão em `globals.css` sob `@layer components`. Use-as; não escreva
utilitário solto quando já existe a classe.

Páginas são Server Components por padrão. `'use client'` só onde há estado: `Header`,
`WhatsAppButton`, `TestimonialsCarousel`, `GalleryLightbox`.

Cada página exporta seu próprio `metadata`; o `layout.tsx` define apenas os valores
globais e o `metadataBase`.

## Armadilhas conhecidas

**`params` é `Promise` no Next 15+.** Rotas dinâmicas precisam de `async` e `await params`.
Já está resolvido em `especialidades/[slug]`, mas é o erro mais fácil de reintroduzir.

**Menu mobile.** O `<a>` do WhatsApp precisa ficar separado do `<button>` do hambúrguer, e
o botão precisa de `touchAction: 'manipulation'`. Juntá-los quebra o toque no iOS.

**Rota de Pilates duplicada.** `generateStaticParams()` gera `/especialidades/pilates` a
partir de `services.ts`, mas `especialidades/pilates/page.tsx` sobrepõe essa rota. O
resultado é uma rota gerada e nunca servida, e duas URLs de Pilates disputando a mesma
palavra-chave. Ver `audit-2026-09.md`, SEO-1.

**Imagens com acento no nome** (`fisioterapeuta-em-belém.png`). Funciona na Vercel, mas é
uma fonte silenciosa de problema de encoding em qualquer outro CDN ou ferramenta.
Renomear sem acento quando tocar nesses arquivos.

**Fontes via `@import` no `globals.css`.** Bloqueia a renderização e ignora o `next/font`,
que faria self-host e preload. Impacto direto em LCP. Ver DES-1 no audit.

**Três camadas de analytics rodando juntas:** Google Tag (`GT-KF63NMB5`), Vercel Analytics
e Vercel Speed Insights. Nenhuma delas respeita consentimento hoje.

## Fluxo de deploy

O agente propõe o diff. O Júlio aplica no VS Code, roda `npm run build`, e versiona com
`git add . && git commit -m "..." && git push`. A Vercel faz o deploy automático a partir
da `main`. **O agente não faz commit nem push.**

## Ausências relevantes

Não há ESLint (nem `eslint-config-next` nas dependências), não há Prettier, não há
`lint` no `package.json`, não há testes, não há CI, não há Dependabot, não há
`not-found.tsx`, `error.tsx` ou `loading.tsx`, e não há nenhum cabeçalho de segurança
configurado — o `next.config.ts` contém apenas os `remotePatterns` de imagem.
