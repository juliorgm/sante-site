# 0003 — Cabeçalhos de segurança, lint e CI

**Status:** aprovada — pronta para implementação
**Data:** 2026-09-16
**Referências da auditoria:** SEC-1, SEC-2, SEC-3, ENG-5
**Depende de:** spec 0002 (as fontes precisam estar auto-hospedadas antes do CSP)
**Executável por modelo simples:** sim, com a ressalva da seção 9.

---

## 1. Problema

O `next.config.ts` não define nenhum cabeçalho de segurança. Não há ESLint no projeto
(nem a dependência, nem script), não há testes, não há CI e não há Dependabot.

Sendo um site estático sem backend, sem banco e sem autenticação, a superfície de ataque
é pequena por construção. Os riscos reais são três, e nenhum deles é "invadir o servidor".

**Clonagem por iframe.** Sem `frame-ancestors`, qualquer um embute o site num iframe e
sobrepõe a própria interface. Num site cujo único CTA é um link de WhatsApp, isso permite
clonar a aparência da Santé e desviar as conversas para outro número — e o paciente não
tem como perceber.

**Cadeia de suprimentos.** Sem Dependabot e sem CI, um pacote transitivo comprometido
entra no build e vai para produção sem ninguém ver.

**Regressão silenciosa.** Numa base editada por agente de IA, o lint deixa de ser
preferência de estilo e vira a primeira rede de contenção: pega `useEffect` sem
dependência, acessibilidade quebrada e import não usado antes do deploy.

## 2. Resultado esperado

O site responde com cabeçalhos de segurança, não pode ser embutido em iframe de terceiro,
tem lint rodando em cada push e recebe alerta automático de dependência vulnerável — tudo
isso **sem que nada no site pare de funcionar**.

## 3. Escopo

**Dentro:** cabeçalhos de segurança em `next.config.ts`; ESLint com `eslint-config-next` e
`jsx-a11y`; script `lint`; GitHub Action rodando lint e build; `.github/dependabot.yml`.

**Fora — não faça:**
- Corrigir os erros que o ESLint apontar. Esta spec **instala e configura** o lint. A
  correção do que ele encontrar é trabalho separado, com revisão. Se o lint acusar muita
  coisa, deixe o CI em modo de aviso e relate — não saia "arrumando" código.
- Escrever testes unitários ou e2e.
- Mexer em 2FA de conta (GitHub, Vercel, Google, Meta). É fora do código e está em
  `pendencias.md`.
- Adicionar middleware ao projeto. O site é estático e assim permanece.

## 4. Comportamento

### 4.1 Cabeçalhos

Em `next.config.ts`, via `async headers()`, aplicados a todas as rotas:

| Cabeçalho | Valor |
|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Content-Security-Policy` | ver 4.2 |

### 4.2 A política de conteúdo

Use exatamente esta, em uma linha. Cada origem está aqui porque o site **precisa** dela;
retirar qualquer uma quebra alguma coisa.

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: https://img.youtube.com https://i.ytimg.com https://www.google-analytics.com https://www.googletagmanager.com;
font-src 'self' data:;
connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://stats.g.doubleclick.net https://vitals.vercel-insights.com;
frame-src https://www.youtube-nocookie.com https://www.google.com;
frame-ancestors 'self';
base-uri 'self';
form-action 'self';
object-src 'none';
upgrade-insecure-requests
```

O que cada bloco protege: `googletagmanager` e `google-analytics` são a medição;
`va.vercel-scripts` e `vitals.vercel-insights` são o Vercel Analytics e o Speed Insights;
`img.youtube.com` e `i.ytimg.com` são a capa do vídeo; `youtube-nocookie.com` é o player
depois do clique; `google.com` em `frame-src` é o mapa na página de contato.

**Sobre o `'unsafe-inline'` em `script-src`:** o site tem scripts inline — o snippet do
Google Tag e o JSON-LD do `layout.tsx`. A alternativa correta seria nonce, que no App
Router exige middleware, e middleware tira o site do estático. A escolha consciente é
manter `'unsafe-inline'`: a política continua valendo para restringir **de onde** o
JavaScript pode vir, que é o que fecha a porta do sequestro de script de terceiro, mesmo
não bloqueando injeção inline. Está documentado aqui para ninguém "melhorar" isso sem
entender o custo.

### 4.3 Lint

Instale `eslint` e `eslint-config-next` na versão compatível com o Next instalado, mais o
plugin de acessibilidade. Adicione `"lint": "next lint"` aos scripts. A configuração deve
estender o padrão do Next e as regras de `jsx-a11y`.

### 4.4 CI e Dependabot

`.github/workflows/ci.yml` rodando em push e pull request para `main`: instala
dependências, roda `npm run lint` e `npm run build`. `.github/dependabot.yml` com
verificação semanal do ecossistema npm.

## 5. Critérios de aceite

- [ ] `npm run build && npm start`, e então `curl -sI http://localhost:3000` mostra os
      seis cabeçalhos da tabela 4.1
- [ ] `npm run lint` existe e executa (pode acusar erros — não corrija, relate)
- [ ] `.github/workflows/ci.yml` e `.github/dependabot.yml` existem
- [ ] `npm run build` sem erros
- [ ] **Nenhuma violação de CSP no console** em: home, `/contato` (mapa carrega),
      `/profissionais` (modal abre), e na home depois de clicar no play do vídeo
- [ ] O evento `whatsapp_click` continua chegando ao GA4 (confira no Tempo real)
- [ ] O site não abre dentro de um iframe de outra origem

## 6. Como verificar

```
npm run build && npm start
curl -sI http://localhost:3000 | grep -iE "strict-transport|content-security|x-frame|x-content-type|referrer|permissions"
npm run lint
```

Depois, com o site rodando, abra o console do navegador em cada uma das quatro situações
do critério de CSP. Violação de CSP aparece como erro explícito com a diretiva que
bloqueou — se aparecer, a origem faltante entra na diretiva correspondente da seção 4.2,
e **só ela**.

## 7. Restrições

Princípios 16 (o site é estático — nada de middleware), 17 (segredo nenhum no
repositório) e 20 (nada vai para `main` sem build limpo).

## 8. Perguntas em aberto

Nenhuma para implementar. Fora do código, continua aberto em `pendencias.md`: 2FA nas
contas e mais de um administrador no Google Meu Negócio — que é o maior risco real da
operação e não se resolve com código.

## 9. Riscos

**O CSP é a única parte perigosa desta spec.** Uma diretiva errada não quebra o build: ela
quebra silenciosamente a medição, o mapa ou o vídeo em produção, e você descobre semanas
depois pelo dado que sumiu.

Por isso o critério de aceite exige verificar as quatro páginas no console **antes** do
merge. Se você não conseguir verificar, não faça o merge do CSP — entregue os outros cinco
cabeçalhos, que são seguros, e deixe o CSP para uma sessão em que dê para testar.

O segundo risco é o ESLint acusar dezenas de problemas e a tentação de corrigir tudo junto.
Não corrija. Está explicitamente fora de escopo na seção 3.
