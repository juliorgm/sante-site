# Roadmap — Santé

Fila priorizada de trabalho, derivada de `audit-2026-09.md`. Os códigos entre parênteses
(LEG-1, MED-4…) apontam para o achado correspondente na auditoria.

> **Norte do projeto (definido pelo Júlio em 2026-09-16).**
>
> O objetivo central é a **melhoria contínua de site, Google Meu Negócio, Google Ads e,
> futuramente, Instagram, para garantir fluxo constante de clientes para a Santé** — e
> construir tudo pensando em 1, 2, 5 e 10 anos, rumo a uma administração baseada em dados.
>
> Capacidade e contratação **não** são restrição de projeto: são decisão de negócio da
> Natália e ficam fora do escopo deste roadmap. Uma versão anterior desta nota tratava a
> agenda cheia como a restrição central a ser otimizada; isso estava incorreto e foi
> retirado.
>
> Duas coisas seguem dessa definição. A primeira é que o vetor de crescimento que **não**
> esbarra na agenda é o **atendimento domiciliar** — ticket maior, escalável, sem consumir
> cadeira na clínica — e ele não tem nenhuma presença digital hoje. A segunda é que o
> trabalho de medição vale por si, não só como apoio a uma decisão pontual: ele é o
> primeiro degrau da plataforma de dados descrita em `plano-ads-analytics.md`, seção 8.
>
> O plano detalhado de Ads e Analytics saiu deste arquivo e virou documento próprio:
> **`plano-ads-analytics.md`**, autônomo e utilizável em outra conversa.

A ordem não é a ordem em que você pediu. Ela segue três critérios, nesta hierarquia:
**risco legal primeiro**, depois **capacidade de medir**, depois **otimização**. O motivo
de medição vir antes de conversão e design é prático — sem MED-1 a MED-4 resolvidos, você
vai fazer mudanças de conversão e de design sem nenhuma forma de saber se funcionaram, e
vai acabar decidindo por opinião. É desperdiçar o trabalho duas vezes.

---

## Visão geral

| Onda | Objetivo | Itens | Esforço | Quando |
|---|---|---|---|---|
| **0** | Parar o sangramento legal e de credibilidade | LEG-1, LEG-3, CNT-2, CVR-6 | ~2h no total | Esta semana |
| **1** | LGPD e consentimento | LEG-2 | 1 sessão | Antes de qualquer pixel novo |
| **2** | Medição de ponta a ponta | MED-1 a MED-6 | 2 sessões | Logo em seguida |
| **3** | Conversão | CVR-1 a CVR-8 | 2–3 sessões | Com medição no ar |
| **4** | Design e performance | DES-1 a DES-5 | 2 sessões | Paralelo à onda 3 |
| **5** | Segurança | SEC-1 a SEC-5 | 1 sessão + ações fora do código | Pode entrar já |
| **6** | Vídeo do Mauro Bonna | — | 1 sessão | Depende da onda 1 |
| **7** | Conteúdo e integração de canais | SEO-1 a SEO-3, CNT-1 a CNT-5 | contínuo | A partir da onda 3 |

---

## Onda 0 — Correções imediatas

**Status em 2026-09-16: 0.2 e 0.3 concluídas. 0.1 e 0.4 seguem abertas.**

| Item | Status |
|---|---|
| 0.1 CREFITO duplicado | 🟡 parcial — Camila corrigida; **falta o número da Liane** (TODO-CREFITO em `team.ts`) |
| 0.2 Horários | ✅ feito — `a10ed06` |
| 0.3 "Pilates Clássico" | ✅ feito — `3ab2c68` |
| 0.4 Depoimento do Mauro Bonna | 🔴 aberto — depende de retranscrever do áudio/vídeo original |

Quatro correções pequenas, alto risco evitado, nenhuma delas exige spec.

**0.1 — Corrigir o CREFITO duplicado (LEG-1).** Pedir à Natália os dois números corretos
da Liane e da Camila e corrigir `team.ts`. Cinco minutos de trabalho para eliminar o único
risco de fiscalização profissional da lista.

**0.2 — Corrigir os horários (LEG-3).** Horário real confirmado: segunda a quinta das
06:30 às 12:30 e das 14:30 às 20:30, sexta das 06:30 às 12:30, último atendimento
iniciando 19:30. Sábado ainda pendente de confirmação.

O trabalho tem três partes e nenhuma delas é só trocar um número. Primeiro, **mudar a
estrutura de `CLINICA.horarios`**: o formato atual (`{ dia, hora }` com a hora como texto
livre) não consegue representar dois turnos no mesmo dia de um jeito que o JSON-LD
aproveite. Segundo, **fazer o `layout.tsx` gerar o `openingHoursSpecification` a partir
desse dado**, com blocos separados por turno, em vez de redeclarar — enquanto houver duas
declarações elas voltam a divergir. Terceiro, **conferir contra o Google Meu Negócio**,
que também precisa ter o intervalo do almoço cadastrado.

Este item subiu de prioridade depois da sua confirmação: o JSON-LD atual anuncia a clínica
como aberta das 06:30 às 20:30 direto, então o Google mostra a Santé aberta no almoço todos
os dias — e almoço é justamente quando quem trabalha pesquisa serviço de saúde.

**0.3 — Substituir "Pilates Clínico" por "Pilates Clássico" (CNT-2).** Sete ocorrências em
`posts.ts` e em `blog/pilates-para-dor-lombar/page.tsx`. Atenção ao `description` de SEO e
ao subtítulo "Por que o Pilates Clínico é diferente do Pilates de academia", que precisa
ser reescrito e não só ter a palavra trocada — o parágrafo inteiro argumenta em cima da
distinção errada.

**0.4 — Corrigir o depoimento do Mauro Bonna (CVR-6).** O texto está corrompido em dois
trechos. Vale voltar à fonte (áudio ou vídeo original) e retranscrever, porque é o
depoimento de maior peso da página.

---

## Onda 1 — LGPD e consentimento (seu item 2)

Spec pronta em `specs/0001-lgpd-consentimento.md`.

O erro comum aqui é tratar o problema como "colocar um banner". Banner que aparece depois
que as tags já carregaram não cumpre a LGPD — só documenta a infração. O que resolve é o
**Google Consent Mode v2**: as tags sobem em estado negado, e a aceitação libera o
armazenamento. Isso tem um bônus relevante: mesmo sem consentimento, o Google recebe
sinais modelados, então você não perde a medição inteira de quem recusa.

O trabalho tem quatro partes. **Página de política de privacidade** — o que se coleta, com
que base legal, por quanto tempo, com quem se compartilha, e como exercer os direitos do
titular, com um canal de contato do encarregado. **Banner de consentimento** com aceitar,
recusar e escolher por categoria, sem padrão escuro e com a recusa tão fácil quanto o
aceite. **Consent Mode v2** aplicado ao Google Tag, ao Vercel Analytics e às fontes.
**Carregamento sob demanda** do iframe do Maps e de qualquer embed de vídeo, que hoje
gravam cookie de terceiro na carga da página.

Só depois disto o Meta Pixel pode entrar. Nesta ordem, não na inversa.

---

## Onda 2 — Medição e CRM (seu item 1)

Você escolheu a camada de custo zero, e ela realmente resolve a maior parte do problema.
O que falta hoje não é ferramenta, é encanamento: os dados são destruídos no caminho.

**2.1 — Instrumentar todos os CTAs (MED-1, MED-2). ✅ FEITO em 16/09 (`604082b`).** Consolidar tudo em uma função única
em `lib/analytics.ts`, apagar a chamada inline do `WhatsAppButton`, e instrumentar os mais
de quinze pontos de saída listados na auditoria. Cada evento deve carregar de onde partiu:
página de origem, seção e assunto. Sem isso não dá para saber que o blog converte.

**2.2 — Propagar `gclid` e UTM para dentro da conversa (MED-4). ✅ FEITO em 16/09 (`604082b`).** Este é o item mais
importante da onda inteira. Capturar os parâmetros na chegada, guardar em
`sessionStorage`, e gerar um código curto de origem — algo como `#SA-GADS-PIL-0915` — que
entra na mensagem pré-preenchida do WhatsApp. A Natália lê o código na conversa e sabe
exatamente qual campanha trouxe aquela pessoa.

É deselegante e é exatamente o que uma clínica desse porte deveria fazer antes de pagar
mensalidade de CRM. Fecha o ciclo anúncio → conversa → paciente sem nenhuma ferramenta
nova, e gera o histórico que, no dia em que você contratar um CRM de verdade, vai dizer
se ele se paga.

**2.3 — Criar a ação de conversão no Google Ads (MED-3).** Marcar o evento de clique de
WhatsApp como conversão e importá-lo para o Ads. É o que destrava lances inteligentes. É
gratuito e é, provavelmente, a maior alavanca isolada de eficiência de verba da lista.

**2.4 — Montar o "CRM" em planilha (MED-6).** Uma aba, uma linha por conversa: data,
código de origem, assunto, status (respondeu / agendou / compareceu / virou paciente) e
valor. Cinco minutos por dia da atendente. É o que transforma custo por conversa em custo
por paciente — e é o único número que justifica aumentar o orçamento de anúncio.

**2.5 — Painel no Looker Studio.** Conectar GA4 e Google Ads e montar quatro visões:
conversas por origem, custo por conversa, páginas que mais geram conversa, e a evolução
semanal. O objetivo é que a decisão de verba seja de dez minutos, não de uma tarde.

**2.6 — Definir o modelo de eventos antes de escrever código.** Nomes, parâmetros e
convenções em um documento curto. Renomear evento depois de ter histórico significa perder
o histórico, e esse erro é irreversível.

---

## Onda 3 — Conversão (seu item 3)

**3.1 — Nota do Google Meu Negócio no topo da home (CVR-2).** A maior razão
impacto/esforço da lista inteira. Nota, número de avaliações e link, perto do CTA
principal, mais `aggregateRating` no schema. Hoje o canal de maior ROI da clínica não
aparece no site.

**3.2 — Criar a OG image (CVR-4).** Toda indicação compartilhada no WhatsApp hoje chega
como um retângulo cinza. Num negócio movido a boca a boca, isso é o ativo mais forte sendo
entregue com a pior apresentação.

**3.3 — CTAs específicos por contexto (CVR-1, CVR-5).** Trocar o "Fale com a gente"
genérico por verbos que carregam a próxima ação, e corrigir as mensagens pré-preenchidas —
inclusive o caso de `agendamento` e `funcionamento` estarem com texto idêntico, que
inviabiliza distinguir as intenções na medição.

**3.4 — Reorganizar a dobra do hero (CVR-3).** Garantir CTA e prova social visíveis em
768px de altura.

**3.5 — Página de perguntas frequentes com schema (CNT-3).** Listar com a Natália as
objeções que ela mais responde no WhatsApp. Qualifica a conversa antes dela começar e abre
chance de rich snippet.

**3.6 — Páginas de destino por campanha (CVR-8).** Uma por grupo de anúncio, com um CTA
só. Mandar intenção específica para home genérica é a forma mais comum de queimar verba.

**3.7 — Tratar a janela do almoço (CVR-9).** Resposta automática no WhatsApp Business
entre 12:30 e 14:30 avisando que a mensagem será respondida a partir das 14:30, e exibição
honesta do intervalo no site. É a mudança de menor esforço desta onda inteira e evita que
o momento de maior intenção vire silêncio de noventa minutos. Não depende de código no
site para a parte mais importante — a resposta automática é configuração do WhatsApp.

**3.8 — Formulário alternativo (CVR-7).** Nome e contato, sem nenhum dado clínico. Menor
prioridade, mas cobre quem não vai usar WhatsApp.

---

> **Specs prontas:** `specs/0002-performance-carregamento.md` (onda 4) e
> `specs/0003-seguranca-e-ci.md` (onda 5). Escritas em 16/09 para serem executadas por um
> modelo mais simples em sessão separada: critérios de aceite numéricos, escopo negativo
> explícito e zero pergunta em aberto.

## Onda 4 — Design (seu item 4)

**4.1 — Migrar as fontes para `next/font` (DES-1).** Remove o `@import` bloqueante, faz
self-host, elimina uma conexão ao Google antes do consentimento e melhora LCP. Uma
mudança, quatro problemas resolvidos.

**4.2 — Tratar as imagens (DES-2).** Converter para WebP, redimensionar para o tamanho
real de exibição, reduzir o favicon de 1,4 MB e renomear os arquivos com acento. Os 7,6 MB
da pasta de equipe devem cair para menos de 1 MB.

**4.3 — Trocar os emoji por SVG (DES-3).** Conjunto de ícones em `teal`, consistente entre
sistemas operacionais e alinhado ao registro sóbrio da marca.

**4.4 — Acessibilidade (DES-4).** `aria-expanded` no hambúrguer, focus trap e `aria-modal`
no lightbox, e estilo de foco visível em todos os controles.

**4.5 — Páginas de erro com marca (ENG-1).** `not-found.tsx` e `error.tsx` com cabeçalho,
rodapé e CTA.

---

## Onda 5 — Segurança (seu item 5)

**5.1 — Cabeçalhos de segurança (SEC-1).** CSP, HSTS, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy` e `frame-ancestors` no `next.config.ts`. O
`frame-ancestors` é o que impede alguém de clonar a aparência do site num iframe e desviar
as conversas para outro número de WhatsApp.

**5.2 — ESLint, CI e Dependabot (SEC-2, SEC-3).** `eslint-config-next` com
`plugin:jsx-a11y`, script de lint, uma Action que roda lint e build em cada push, e
Dependabot semanal. Numa base editada por agente de IA, o lint é a primeira rede de
contenção.

**5.3 — Proteger as contas (SEC-4).** Fora do código, e é o maior risco real: 2FA com app
autenticador ou chave física em GitHub, Vercel, Google e Meta, e mais de um administrador
no Google Meu Negócio. Perder o perfil do Google Meu Negócio é perder o canal de maior ROI
da clínica de um dia para o outro.

**5.4 — Completar o `.gitignore` (ENG-5).**

---

## Onda 6 — Vídeo do Mauro Bonna (seu item 6)

O carrossel de depoimentos **já suporta YouTube**, e o depoimento do Mauro já existe em
`testimonials.ts` com um campo `videoUrl` comentado. Então o caminho mais curto é apontar
esse campo para o vídeo novo.

Duas coisas precisam ser feitas direito, porém. Primeiro, o embed do YouTube grava cookie
de terceiro no carregamento, então ele depende da onda 1 — a solução é uma *facade*:
mostrar a miniatura estática com um botão de play, e só montar o iframe (via
`youtube-nocookie.com`) depois do clique. Isso resolve LGPD e ainda tira um script pesado
do carregamento inicial.

Segundo, este vídeo merece mais do que um slot no carrossel. Mauro Bonna é figura pública
em Belém e o formato é entrevista, não depoimento de trinta segundos — é conteúdo de
autoridade. Vale uma seção própria na home ou uma página dedicada, com `VideoObject`
schema (que pode render miniatura de vídeo no resultado de busca) e transcrição em texto,
que é conteúdo indexável de graça.

Antes de implementar, confirme duas coisas: que existe autorização de uso da imagem do
Mauro e do canal, e se o vídeo é do canal dele ou da clínica — muda a estratégia de
atribuição.

---

## Onda 7 — Conteúdo e canais (seu item 7)

**7.1 — Resolver a canibalização de "Pilates" (SEO-1).** Decidir se existe uma página de
Pilates ou duas, apagar a rota morta, e redirecionar. É a palavra-chave comercial mais
valiosa da clínica e hoje ela está dividida em três superfícies.

**7.2 — Completar o schema (SEO-3) e adicionar `canonical` por página (SEO-2).**

**7.3 — Fechar o loop entre os canais (CNT-4).** O site mostra as avaliações do Google e
pede avaliação a quem terminou tratamento; o Instagram tem um destino específico no site em
vez da home; o Google Meu Negócio recebe posts que apontam para páginas de especialidade.
Hoje são três ilhas.

**7.4 — Atualizar o blog (CNT-1) e criar cadência.** Republicar os três artigos com data
corrente e revisão de conteúdo, e estabelecer um ritmo realista — um artigo por mês
sustentado vale mais que quatro num mês e nada nos cinco seguintes.

**7.5 — Páginas para os segmentos fortes (CNT-5).** Gestante e pós-parto primeiro, porque
é onde estão seus melhores depoimentos e não existe nenhuma página. Depois idoso e
prevenção de queda, que a análise de benchmark já apontava como lacuna local.

**7.6 — Reaproveitar conteúdo entre canais.** Cada artigo do blog vira um carrossel de
Instagram e um post no Google Meu Negócio. O conteúdo é o mesmo; muda o formato. Isso
resolve o problema de cadência de três canais com o esforço de um.

---

## Onda 8 — Pendências do projeto

**8.1 — Terminar o perfil dos profissionais (ENG-3).** Ficou pela metade esperando os
currículos. "Fisioterapeutas especializados" sem prova é alegação vazia, e é justamente o
que sustenta o preço premium.

**8.2 — Confirmar a equipe publicada (ENG-2).** Milos Eduardo aparece no histórico do
projeto e não está em `team.ts`.

**8.3 — Reconciliar o documento de regras de negócio (LEG-4).** Telefone, e-mail e domínio
divergentes do que está no ar.

**8.4 — Registrar o consentimento de imagem (ENG-4).** Planilha ligando cada foto do site
ao termo assinado correspondente.

---

## Sobre a ordem

Se você tiver tempo para uma coisa só nesta semana, faça a **onda 0** — são duas horas e
elimina o risco de fiscalização.

Se tiver tempo para uma sessão de trabalho comigo, faça a **onda 2**. Ela é a que muda
seu jogo: hoje você paga Google Ads sem conseguir dizer quantos pacientes ele trouxe, e
essa pergunta não é respondível com o site do jeito que está. Todo o resto da lista fica
mais fácil de priorizar depois que existir um número.
