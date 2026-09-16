# 0001 — Consentimento, privacidade e LGPD

**Status:** rascunho — aguardando decisões da seção 8
**Data:** 2026-09-15
**Referências da auditoria:** LEG-2, DES-1, CVR-4

---

## 1. Problema

O site carrega hoje, na primeira visita e sem qualquer consentimento, o Google Tag (GA4 e
Google Ads), o Vercel Analytics, o Vercel Speed Insights, um iframe do Google Maps na
página de contato e as fontes do Google Fonts. Não existe política de privacidade, não
existe banner e não existe Consent Mode.

Três coisas tornam esse quadro mais sério do que seria em um site comum. É um site de
**saúde**, e a ANPD trata o contexto como sensível mesmo quando o dado coletado é apenas
de navegação, porque a visita em si já revela interesse em condição de saúde. O iframe do
Maps grava cookie de terceiro na simples carga da página, sem nenhuma barreira. E o Meta
Pixel já está no plano de trabalho — instalar remarketing sem base legal aumenta a
exposição em vez de reduzi-la.

Há ainda um efeito prático imediato: a Natália não tem hoje nenhuma página para apontar se
um paciente perguntar o que a clínica faz com os dados dele.

## 2. Resultado esperado

Um visitante que chega ao site não tem nenhum cookie de análise ou publicidade gravado
antes de decidir. Ele vê um aviso claro, consegue aceitar ou recusar com o mesmo número de
cliques, e consegue mudar de ideia depois. A clínica tem uma política de privacidade
publicada e acessível de qualquer página. E a Santé continua conseguindo medir o essencial
mesmo de quem recusou, através dos sinais modelados do Consent Mode.

## 3. Escopo

**Dentro:** página de política de privacidade; banner de consentimento com granularidade
por categoria; Google Consent Mode v2 aplicado ao Google Tag; condicionamento do Vercel
Analytics e do Speed Insights; carregamento sob demanda do iframe do Maps; migração das
fontes para `next/font` (que elimina a conexão ao Google Fonts e resolve DES-1 de quebra);
e um link permanente para reabrir as preferências no rodapé.

**Fora:** o Meta Pixel, que entra em spec própria depois desta; qualquer formulário de
contato; política de cookies como documento separado, que aqui vira uma seção da própria
política de privacidade; e o termo de consentimento de imagem dos pacientes, que é
processo administrativo e não do site.

## 4. Comportamento

> **Dado** que o visitante nunca respondeu ao banner
> **Quando** ele carrega qualquer página
> **Então** o Google Tag é inicializado com `analytics_storage`, `ad_storage`,
> `ad_user_data` e `ad_personalization` em `denied`, nenhum cookie de análise é gravado, e
> o banner aparece

> **Dado** que o banner está visível
> **Quando** o visitante clica em "Aceitar"
> **Então** os quatro estados vão para `granted`, a escolha é persistida, o banner some e
> a medição normal começa

> **Dado** que o banner está visível
> **Quando** o visitante clica em "Recusar"
> **Então** os estados permanecem em `denied`, a escolha é persistida, o banner some, e o
> site continua plenamente funcional

> **Dado** que o visitante já respondeu
> **Quando** ele volta ao site
> **Então** o banner não reaparece e a escolha anterior é aplicada antes de qualquer tag

> **Dado** que o visitante está na página de contato sem ter consentido
> **Quando** a página carrega
> **Então** o mapa aparece como imagem estática com um botão; o iframe só é montado após o
> clique, e o clique vale como consentimento para aquele carregamento

## 5. Critérios de aceite

- [ ] Em aba anônima, antes de qualquer interação, `document.cookie` não contém `_ga`,
      `_gid`, `_gcl_au` nem cookie do Vercel Analytics
- [ ] O `dataLayer` contém um `consent default` com os quatro sinais em `denied` **antes**
      da primeira chamada de configuração do Google Tag
- [ ] Após "Aceitar", o DebugView do GA4 registra a sessão normalmente
- [ ] Após "Recusar", nenhum cookie é gravado e nenhuma requisição sai para
      `google-analytics.com` com identificador
- [ ] A escolha sobrevive a recarregamento e a fechar e reabrir o navegador
- [ ] Existe `/politica-de-privacidade`, linkada no rodapé de todas as páginas e a partir
      do próprio banner
- [ ] O rodapé tem um link que reabre as preferências
- [ ] Recusar não exige mais cliques do que aceitar, e os dois botões têm o mesmo peso
      visual — sem padrão escuro
- [ ] O iframe do Maps não existe no DOM antes do clique
- [ ] Nenhuma requisição para `fonts.googleapis.com` em nenhum momento
- [ ] O banner é navegável por teclado, tem foco visível e não bloqueia a leitura do
      conteúdo em telas pequenas
- [ ] `npm run build` limpo

## 6. Como verificar

Abrir uma janela anônima com a aba Network do DevTools filtrada por
`google-analytics|googletagmanager|fonts.googleapis|vercel-insights`, carregar a home e
conferir o que sai antes de qualquer clique. Em Application → Cookies, conferir a lista
vazia. Repetir o roteiro nos três caminhos: sem responder, aceitando e recusando. Para o
GA4, usar o DebugView com a extensão de depuração ativa. Para o mapa, inspecionar o DOM da
página de contato antes e depois do clique.

## 7. Restrições

Incidem os princípios 3 (nenhum script de terceiro antes do consentimento), 4 (dado de
saúde é sensível), 16 (o site é estático, então a preferência vive no navegador, não em
servidor), 18 (performance é requisito — o banner não pode custar LCP) e 19
(acessibilidade mínima).

Sem backend, a persistência é `localStorage`. Isso significa que não há registro
server-side do consentimento; para o porte da clínica é aceitável, mas precisa estar
documentado como decisão consciente em `decisions/`.

## 8. Perguntas em aberto

**Nenhuma implementação começa antes destas respostas.**

1. Quem é o encarregado de dados (DPO) da Santé, e qual e-mail vai na política? Pode ser a
   própria Natália; precisa ser uma pessoa nomeada e um canal que alguém leia.
2. A clínica já tem política de privacidade para o atendimento presencial, prontuário e
   ficha de avaliação? Se sim, a do site deve ser coerente com ela, não um documento
   paralelo.
3. Por quanto tempo as fichas de avaliação são guardadas? O documento de regras de negócio
   diz cinco anos — confirmar, porque isso entra na política.
4. A recusa deve bloquear também o Vercel Speed Insights? Ele é anônimo e não usa cookie
   de identificação, então há argumento para mantê-lo; é uma decisão de postura.
5. Quem revisa juridicamente o texto da política? Eu posso redigir a minuta, mas não sou
   advogado e a Santé é estabelecimento de saúde.

## 9. Riscos

O risco mais provável é de medição: se o `consent default` for injetado depois do script
do Google Tag, o consentimento não é respeitado e o problema fica **pior** que hoje,
porque passa a existir a aparência de conformidade. A ordem de carregamento é o ponto
crítico da implementação e precisa ser verificada no `dataLayer`, não presumida.

O segundo risco é de conversão: um banner mal posicionado no mobile cobre o CTA do
WhatsApp. Ele deve ficar rente ao rodapé, não centralizado, e não pode sobrepor o botão
flutuante.

O terceiro é de comparabilidade: haverá um degrau nos números do GA4 no dia da
implantação, porque parte do tráfego passa a recusar. Isso é esperado e precisa ser
anotado no painel para não ser lido depois como queda de desempenho.
