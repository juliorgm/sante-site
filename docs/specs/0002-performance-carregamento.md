# 0002 — Performance de carregamento

**Status:** aprovada — pronta para implementação
**Data:** 2026-09-16
**Referências da auditoria:** DES-1, DES-2
**Executável por modelo simples:** sim. Todos os critérios são numéricos e verificáveis.

---

## 1. Problema

O site carrega 13 MB de imagens e busca as fontes por `@import` no CSS. As duas coisas
atrasam a primeira pintura da página, e o público chega majoritariamente por celular em
rede móvel de Belém — onde cada megabyte é segundo de espera e conversa perdida.

Medições em 16/09/2026:

| Arquivo | Tamanho | Problema |
|---|---|---|
| `public/images/equipe/professora-pilates-em-belém.png` | 1,8 MB | fotografia salva em PNG |
| `public/images/equipe/fisioterapeuta-em-belém.png` | 1,7 MB | idem |
| `public/images/equipe/professora-pilates-em-batista-campos-belém.png` | 1,6 MB | idem |
| `public/images/equipe/fisioterapeuta-na-batista-campos.png` | 1,6 MB | idem |
| `public/images/clinica-fisioterapia-belem.png` | 1,6 MB | idem |
| `favicon.png` (raiz do projeto) | 1,3 MB | favicon de 1,3 MB |

PNG é formato para gráfico com transparência, não para fotografia. As mesmas imagens em
WebP ficam entre um quinto e um décimo do tamanho, sem diferença visível.

A primeira linha de `src/app/globals.css` é um `@import` do Google Fonts. Isso cria uma
requisição em cascata que bloqueia a pintura, ignora o `next/font` (que faria self-host e
preload) e abre conexão a um servidor do Google antes de qualquer consentimento — o que
também conta como reincidência em LEG-2.

## 2. Resultado esperado

O site pinta mais rápido no celular, sem nenhuma mudança visual perceptível. As fontes
passam a ser servidas pelo próprio domínio. A pasta `public/` cai de 13 MB para menos de
4 MB.

## 3. Escopo

**Dentro:** migração das fontes para `next/font`; conversão para WebP e
redimensionamento das cinco imagens acima; renomeação de arquivos com acento; redução do
`favicon.png` da raiz.

**Fora — não faça, mesmo que pareça melhoria:**
- Trocar os emoji dos ícones por SVG (DES-3). É decisão de design, tem spec própria.
- Mexer em `tailwind.config.ts` além do necessário para as fontes.
- Trocar as imagens da galeria ou dos depoimentos: já estão em JPEG e em tamanho aceitável.
- Alterar qualquer texto, layout, espaçamento ou cor.
- Adicionar biblioteca de imagem nova ao projeto. A conversão é feita FORA do build, com
  ferramenta local, e só os arquivos convertidos entram no repositório.

## 4. Comportamento

**Fontes.** `DM Serif Display` (400, normal e itálico) e `DM Sans` (300, 400, 500, 600)
passam a ser carregadas por `next/font/google` em `src/app/layout.tsx`, expostas como
variáveis CSS e ligadas ao `tailwind.config.ts` nas famílias `serif` e `sans` já
existentes. O `@import` sai de `globals.css`. Nenhuma classe `font-serif` ou `font-sans`
usada nas páginas pode mudar de nome.

**Imagens.** Cada uma das cinco vira `.webp`, redimensionada para no máximo o dobro do
tamanho em que é exibida (as fotos de equipe aparecem em 128px e 80px; 512px de largura é
folgado). Os arquivos com acento no nome são renomeados sem acento, e as referências em
`src/data/team.ts` e onde mais aparecerem são atualizadas junto. O arquivo antigo é
removido só depois que a referência nova estiver funcionando.

**Favicon.** O `favicon.png` de 1,3 MB na raiz do projeto: verifique se algo o referencia.
Se nada referenciar, remova. Se referenciar, gere uma versão de no máximo 50 KB.

## 5. Critérios de aceite

- [ ] `du -sh public` retorna **menos de 4 MB**
- [ ] Nenhum arquivo em `public/images/equipe/` passa de **150 KB**
- [ ] `clinica-fisioterapia-belem` passa a ser `.webp` com menos de 250 KB
- [ ] `grep -rn "fonts.googleapis" src/` não retorna nada
- [ ] `grep -rn "next/font" src/app/layout.tsx` retorna as duas fontes
- [ ] Nenhum arquivo em `public/` tem acento no nome:
      `find public -name "*[áàâãéêíóôõúç]*"` não retorna nada
- [ ] `npx tsc --noEmit` limpo e `npm run build` sem erros
- [ ] `favicon.png` da raiz removido, ou com menos de 50 KB
- [ ] Visualmente idêntico: as quatro fotos da equipe aparecem em `/profissionais` e na
      home, e os títulos continuam em serifada e o corpo em sem-serifa

## 6. Como verificar

```
du -sh public
find public/images/equipe -type f -printf "%s %p\n" | sort -rn | head
find public -name "*[áàâãéêíóôõúç]*"
grep -rn "fonts.googleapis" src/
npx tsc --noEmit && npm run build
```

Depois suba `npm run dev`, abra `/` e `/profissionais`, e confirme na aba Network do
navegador que **não sai nenhuma requisição para `fonts.googleapis.com`** e que as fotos
da equipe carregam.

## 7. Restrições

Princípio 18 da constituição: performance é requisito, não otimização. Princípio 11: a
paleta e a tipografia são fixas — a fonte é a mesma, muda só como ela é servida.

A conversão de imagem acontece fora do build. Não adicione dependência de processamento
de imagem ao `package.json`.

## 8. Perguntas em aberto

Nenhuma. Esta spec pode ser implementada sem consultar o Júlio.

## 9. Riscos

O risco real é **quebrar a referência de uma imagem** ao renomear. Por isso: renomeie,
atualize a referência, verifique que a página carrega, e só então apague o arquivo antigo.
Nunca apague antes.

O segundo risco é o `next/font` mudar sutilmente o peso ou o espaçamento do texto. Compare
a home antes e depois; se houver diferença visível, é configuração de peso, não motivo
para voltar ao `@import`.
