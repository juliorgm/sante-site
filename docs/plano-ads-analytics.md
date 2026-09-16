# Plano de replanejamento — Google Ads e Analytics

**Santé — Centro de Terapia Especializada · Belém/PA**
Escrito em 2026-09-16. **Documento autônomo:** contém todo o contexto necessário para ser
usado em uma conversa nova, sem depender do resto do repositório.

---

## 0. Contexto mínimo

Santé é uma clínica de fisioterapia e estúdio de Pilates Clássico em Belém do Pará, no
bairro Batista Campos. Posicionamento premium: atendimento individual de 50 minutos, sem
atendimento em massa. Site em Next.js estático hospedado na Vercel
(`santefisioterapia.com.br`). **Não há backend, banco de dados nem CMS.**

A conversão do negócio é **uma conversa no WhatsApp**. Não há agendamento online nem
formulário. Preço nunca é divulgado em canal digital — é conversa.

Canais ativos: Google Meu Negócio (maior ROI observado), Google Ads (campanha nova
apontando para a home, com sitelinks), WhatsApp e Instagram (@sante.fisio, ainda sem
integração com o site). Instagram só entra com força em 2027, por decisão do negócio.

Horário: segunda a quinta das 06:30 às 12:30 e das 14:30 às 20:30; sexta das 06:30 às
12:30. Último atendimento inicia 19:30. Entre 12:30 e 14:30 mensagens são recebidas mas
só respondidas a partir das 14:30.

**Situação de negócio relevante para as decisões abaixo:** a agenda está cheia com fila de
espera. O turno da tarde é mais fraco que o da manhã. Dezembro e o início de janeiro são
mais fracos. Não há reajuste de preço há dois anos. A aposta de crescimento é o
**atendimento domiciliar**, que tem ticket maior, é mais escalável e **não consome
capacidade física da clínica**.

---

## 1. O problema, em um número

Existe uma ação de conversão configurada no Google Ads — `whatsapp_click`. Em **um mês
inteiro ela registrou um único evento.**

Esse número não significa que a campanha não funciona. Significa que a medição está
quebrada, e a causa é conhecida: **apenas um lugar do site dispara o evento.** No código,
só o menu expandido do botão flutuante de WhatsApp chama `gtag` — ou seja, só conta quem
clica no botão verde *e depois* escolhe uma das cinco opções do menu. Todo o resto é
invisível:

| Local | CTAs de WhatsApp sem tracking |
|---|---|
| Cabeçalho | "Fale com a gente" desktop + o mesmo no menu mobile |
| Home | CTA do hero, "Como funciona?", card "Agendar agora", "Saiba mais" de cada serviço, e os dois CTAs finais |
| Página de contato | as cinco opções de assunto |
| Páginas de especialidade | o CTA de cada serviço |
| Blog | os CTAs dos artigos |

São mais de quinze saídas para o WhatsApp e uma está instrumentada.

### Por que isso é pior do que "falta um dado"

O Smart Bidding do Google precisa de volume para funcionar. A referência prática é da
ordem de **15 a 30 conversões por mês** para que as estratégias automáticas tenham sinal
suficiente. Com uma conversão por mês, a ação de conversão existe no painel mas **não
alimenta nada** — o algoritmo não consegue aprender e a campanha opera às cegas, mesmo
estando "configurada corretamente".

Ou seja: a ação de conversão não está errada, está **faminta**. Corrigir o tagueamento não
é uma melhoria incremental de relatório; é o que liga o lance inteligente.

### O segundo buraco: o `gclid` é descartado

Quando alguém clica num anúncio, o Google anexa um `gclid` à URL. O site ignora esse
parâmetro, e o link do WhatsApp é montado com uma mensagem fixa, sem nenhum identificador.

Resultado: na conversa, todas as pessoas chegam iguais. Não há como saber se veio de
anúncio, de busca orgânica, do Google Meu Negócio ou do Instagram. **Os dados de
atribuição não estão em outro lugar — eles são destruídos no momento da conversão.**

Isso ficou mais caro desde que a campanha passou a apontar para o site em vez do perfil do
Google Meu Negócio: antes o tráfego pago nem tocava o site e não havia `gclid` a perder;
agora ele chega em toda visita paga e é jogado fora no carregamento da página.

---

## 2. Modelo de eventos

Definir o modelo **antes** de escrever código é obrigatório: renomear evento depois de ter
histórico significa perder o histórico, e isso não se recupera.

### 2.1 Decisão: manter o nome `whatsapp_click`

O evento já está cadastrado como conversão no Ads. Como só há um evento de histórico,
renomear não custaria dados — mas custaria refazer a configuração no Ads sem ganho algum.
**Mantenha o nome e enriqueça os parâmetros.**

### 2.2 Conversão principal

`whatsapp_click` — disparado em **todo e qualquer** clique que leve ao WhatsApp, sem
exceção.

| Parâmetro | Valores | Para que serve |
|---|---|---|
| `pagina` | caminho da página (`/`, `/especialidades/rpg`, `/blog/...`) | qual conteúdo converte |
| `secao` | `header` · `hero` · `hero_card` · `card_servico` · `cta_final` · `footer` · `botao_flutuante` · `contato` · `blog` | **onde na página o cliente clica** |
| `assunto` | `agendamento` · `funcionamento` · `pilates` · `preco` · `localizacao` · `especialidade` | qual intenção |
| `origem` | código curto derivado de `gclid`/UTM (ver 2.5) | de qual campanha veio |

O parâmetro `secao` é o que responde diretamente à pergunta "onde o cliente mais clica".

### 2.3 Micro-conversões

Eventos que indicam intenção sem serem a conversão. Servem para três coisas: entender a
jornada, alimentar públicos de remarketing no futuro, e — se necessário — dar sinal
temporário ao Smart Bidding.

`ver_especialidade` · `ver_depoimentos` (scroll até a seção) · `abrir_faq` ·
`play_video_depoimento` · `click_avaliacoes_google` · `click_instagram` · `click_mapa` ·
`scroll_90`

### 2.4 Regra sobre quais viram conversão no Ads

**Só `whatsapp_click` é conversão primária.** As micro-conversões entram como
*secundárias*: aparecem no relatório, não influenciam o lance.

A exceção, se após o tagueamento completo o volume ainda ficar abaixo de ~15/mês: promover
temporariamente uma micro-conversão de alta intenção a primária, só para dar sinal ao
algoritmo, e reverter quando o volume real subir. É muleta, não solução — e tem um risco
que precisa ser dito: o algoritmo passa a otimizar para o proxy, e o proxy é mais fácil de
obter que a conversa de verdade. Use com prazo definido.

### 2.5 Propagação do `gclid` até dentro da conversa

Este é o item de maior valor do plano inteiro e não exige nenhuma ferramenta paga.

O mecanismo: na chegada ao site, capturar `gclid` e `utm_*` da URL e guardar em
`sessionStorage`. Derivar um **código curto legível** — algo como `SA-ADS-PIL-0916` — e
embutir esse código na mensagem pré-preenchida do WhatsApp, junto com o texto normal.

A pessoa envia a mensagem com o código. A atendente lê o código e registra na planilha de
atendimento. **O ciclo anúncio → conversa → paciente fecha sem CRM, sem API e sem
mensalidade.**

É deselegante e é exatamente o que uma operação desse porte deve fazer antes de contratar
ferramenta. E gera o histórico que, no dia em que um CRM de verdade entrar, vai dizer se
ele se paga.

### 2.6 Um detalhe técnico que costuma passar

Hoje o arquivo `src/lib/analytics.ts` define uma função `trackWhatsAppClick()` que **nada
no projeto usa** — o botão flutuante chama `gtag` diretamente, inline. Existe uma
abstração que parece ser o padrão do projeto e não é. Consolidar tudo em uma função única
é pré-requisito para não reintroduzir o problema a cada página nova.

Duas mensagens pré-preenchidas também estão com **texto idêntico** (`agendamento` e
`funcionamento`), o que além de confundir a atendente torna impossível distinguir as duas
intenções na medição. E a mensagem do botão "Valores e planos" não fala de valores.

---

## 3. Como responder "onde o cliente mais clica"

Três camadas complementares, em ordem de esforço.

**O parâmetro `secao`** já responde a maior parte: no GA4, uma exploração de
`whatsapp_click` segmentada por `secao` e `pagina` mostra exatamente quais blocos do site
produzem conversa e quais são decoração.

**Os relatórios de percurso do GA4** mostram o caminho antes da conversão — se as pessoas
convertem direto na home ou passam por especialidade e blog primeiro. Isso decide se vale
investir em conteúdo de meio de funil.

**Mapa de calor e gravação de sessão**, se quiser ver o comportamento e não só o clique. O
Microsoft Clarity é gratuito e sem limite de sessões, e responde perguntas que evento
nenhum responde — onde a pessoa parou de rolar, onde clicou achando que era botão. Ressalva
importante: é rastreador de terceiro, então **só entra depois do banner de consentimento**,
e grava tela de um site de saúde, o que exige mascarar campos e avaliar com cuidado.

---

## 4. Replanejamento do Google Ads

### 4.1 A regra de sequenciamento

**Não reestruture a campanha antes de o tagueamento estar no ar e acumulando.**

Reestruturar agora divide o pouco histórico que existe entre estruturas novas, zera o
aprendizado da campanha atual e continua sem sinal — porque o problema nunca foi a
estrutura, foi a medição. A ordem correta é: corrigir tagueamento → esperar de duas a
quatro semanas acumulando → só então reestruturar com dado real na mão.

### 4.2 Destino dos anúncios

Hoje a campanha aponta para a home, com sitelinks para páginas específicas. Isso é
defensável enquanto as páginas de especialidade não estiverem otimizadas para conversão —
mandar tráfego para uma página fraca é pior que mandar para a home.

O ganho aparece quando cada grupo de anúncios tiver seu próprio destino: quem busca "RPG
em Belém" chega na página de RPG, com um CTA só e a prova social do topo. Intenção
específica em página genérica é a forma mais comum de perder conversão paga.

Enquanto isso não existe, uma melhoria barata: garantir que os **sitelinks** cubram as
intenções mais buscadas e que os textos deles sejam ação, não navegação.

### 4.3 A oportunidade que não está sendo explorada: domiciliar

O atendimento domiciliar tem ticket maior, é mais escalável e — o ponto decisivo — **não
consome cadeira na clínica**. É o único vetor de crescimento que não esbarra na agenda
cheia. Boa parte do público é idoso com necessidade contínua, o que significa valor por
paciente alto e recorrente.

E ele tem **zero presença digital hoje**: não há página no site, não há menção no Google
Meu Negócio e, presumivelmente, não há grupo de anúncios.

O trabalho é de três partes, e vale campanha própria em vez de grupo dentro da existente,
porque a intenção, o público e o raio geográfico são diferentes:

Uma **página dedicada** no site, com a proposta e o CTA próprio, que é pré-requisito para
qualquer anúncio. Uma **campanha separada** com vocabulário próprio — "fisioterapia
domiciliar em Belém", "fisioterapeuta em casa", "fisioterapia para idoso a domicílio",
"fisioterapia pós-operatória em casa" — e raio geográfico possivelmente mais amplo que o
da clínica, já que ninguém precisa se deslocar até Batista Campos. E **conversão própria**,
separada da conversa da clínica, porque o valor por conversa é diferente e misturar os dois
faz o Smart Bidding otimizar para a média de duas coisas que não se parecem.

Se eu tivesse que apontar o item de maior retorno deste documento inteiro, seria este —
não porque a execução é difícil, mas porque é receita que hoje simplesmente não é
perseguida.

### 4.4 Sazonalidade e turno

Dois padrões conhecidos que a campanha ignora hoje.

**A tarde é mais fraca.** Com agenda cheia de manhã, anúncio que traz gente para o turno da
manhã só aumenta a fila. Ajuste de lance por horário empurrando para a janela da tarde faz
a verba trabalhar onde há espaço real.

**Dezembro e início de janeiro são mais fracos.** O padrão comum é manter verba plana o ano
todo; o correto aqui é o inverso — reduzir nos meses de agenda cheia e reforçar na entrada
de dezembro. O Ads deixa de ser motor de crescimento e vira **nivelador de ocupação**.
Provavelmente gastando menos no total.

### 4.5 Higiene básica que costuma render mais que estratégia

Antes de qualquer reestruturação, três checagens que frequentemente revelam o maior
desperdício de uma conta: o **relatório de termos de pesquisa**, para ver o que realmente
está sendo comprado; a **lista de palavras-chave negativas**, que em conta nova quase sempre
está vazia (candidatos óbvios: "curso", "faculdade", "vaga", "emprego", "salário",
"grátis", "SUS", "concurso" — buscas que gastam clique e nunca viram paciente); e a
**segmentação geográfica**, confirmando que está por presença física e não por interesse,
que é o padrão que faz a verba vazar para fora de Belém.

### 4.6 Extensões

Confirmar que a extensão de **localização** está vinculada ao perfil do Google Meu Negócio,
já que ele é o ativo de maior ROI da operação. Extensão de **chamada** no horário de
atendimento. **Sitelinks** já existem. Vale acrescentar **snippets estruturados** listando
as especialidades, e **extensão de imagem**, que costuma melhorar a taxa de clique em
serviço local.

---

## 5. Painel de decisão

O objetivo é que a decisão de verba leve dez minutos, não uma tarde. Looker Studio
conectando GA4, Google Ads e a planilha de atendimento, com quatro visões: conversas por
origem, custo por conversa, páginas que mais geram conversa, e evolução semanal.

O número que realmente importa não está em nenhuma dessas fontes sozinho: é **custo por
paciente**, não custo por conversa. Ele só existe quando a planilha de atendimento registra
o desfecho — respondeu, agendou, compareceu, virou recorrente. Cinco minutos por dia da
atendente, e é o único número que justifica aumentar orçamento.

---

## 6. Ordem de execução

| # | O quê | Depende de | Esforço |
|---|---|---|---|
| 1 | Definir e congelar o modelo de eventos (seção 2) | — | 1h |
| 2 | Consolidar `lib/analytics.ts` e instrumentar os 15+ CTAs | 1 | 1 sessão |
| 3 | Corrigir as mensagens duplicadas e a de "valores" | — | 15min |
| 4 | Capturar `gclid`/UTM e propagar o código na mensagem | 1 | 1 sessão |
| 5 | Planilha de atendimento com status e código de origem | 4 | 1h |
| 6 | Higiene da conta: termos, negativas, geo, extensões | — | 2h |
| 7 | Acumular 2–4 semanas de dado real | 2, 4 | espera |
| 8 | Painel no Looker Studio | 5, 7 | meio dia |
| 9 | Página de domiciliar no site | — | 1 sessão |
| 10 | Campanha de domiciliar | 9 | 2h |
| 11 | Ajuste de lance por turno e calendário sazonal | 7 | 1h |
| 12 | Reestruturar grupos e destinos com dado na mão | 7 | 1 sessão |

Os itens 1 a 5 são a fundação e nada acima deles funciona antes. O item 6 pode correr em
paralelo e frequentemente paga o esforço sozinho. O 9 e o 10 são a aposta de crescimento.

---

## 7. Pré-requisito de privacidade

O site hoje carrega Google Tag, Vercel Analytics, Vercel Speed Insights, iframe do Google
Maps e Google Fonts **incondicionalmente, sem consentimento**, e não há política de
privacidade nem banner.

Isso não é um detalhe burocrático no meio deste plano, por três motivos. É um site de
**saúde**, e o contexto é tratado como sensível mesmo quando o dado é só de navegação.
Qualquer ferramenta nova deste documento — Clarity, remarketing, Meta Pixel — **aumenta a
exposição** enquanto não houver base legal. E a implementação correta não é "colocar um
banner": é o **Google Consent Mode v2**, em que as tags sobem em estado negado e a aceitação
libera o armazenamento, o que tem o bônus de preservar sinais modelados mesmo de quem
recusa.

Ordem prática: o tagueamento (itens 1 a 4) pode ser construído em paralelo, mas **nada de
rastreador novo entra antes do consentimento estar no ar**.

---

## 8. Horizonte: a plataforma de dados

O objetivo declarado do negócio é administração baseada em dados, com visão de 1, 2, 5 e 10
anos, e a intenção de construir um ERP e CRM próprios integrados com IA via MCP.

O caminho que não dá errado tem quatro degraus, e o erro clássico é começar pelo terceiro.

**Captura estruturada primeiro.** Planilha, com disciplina: uma linha por conversa, status,
código de origem, desfecho. Sem isso, qualquer sistema construído em cima herda dado sujo.

**Normalização depois**, quando o volume justificar: a planilha vira banco, com paciente,
sessão, profissional, origem e receita como entidades de verdade.

**Exposição via MCP em seguida** — e aqui está o maior retorno por esforço de toda a visão.
Um servidor MCP **somente-leitura** sobre esse banco permite perguntar em linguagem natural
"quantos pacientes ativos temos", "qual a ocupação da tarde em novembro", "quanto custou
cada paciente do Ads neste trimestre" e receber resposta com o dado real. É construção de
poucos dias para quem já é desenvolvedor, e entrega a maior parte do valor que se espera de
um painel de BI.

**Funcionalidade de escrita por último.** Agendamento, prontuário e cobrança são o ERP de
verdade — e são também onde mora a complexidade regulatória, incluindo dado de saúde sob a
LGPD. Construir isso antes de os três degraus anteriores estarem sólidos é o caminho mais
comum para um sistema que ninguém usa.

O ponto honesto sobre a comparação com a estrutura de um banco: o que falta não é
sofisticação técnica, é **dado limpo e contínuo**. Uma instituição grande não é melhor
porque tem sistema maior; é melhor porque mede há anos sem interrupção. O degrau 1 é o que
compra isso, e ele começa numa planilha esta semana.
