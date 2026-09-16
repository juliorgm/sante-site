# Contexto de negócio — Santé Centro de Terapia Especializada

Fonte da verdade de negócio, marca, público e canais.
Atualizado em 2026-09-15. Itens marcados ⚠️ estão **em conflito entre fontes** e precisam
de decisão do Júlio antes de serem usados por qualquer agente.

---

## 1. Identidade

**Santé — Centro de Terapia Especializada.** Clínica de fisioterapia e estúdio de Pilates
em Belém do Pará, no Edifício Urbe Office, bairro Batista Campos.

O slogan é "Cuide do seu corpo. Viva sem dor." e o posicionamento é **premium local**:
não é clínica de volume, é atendimento exclusivo. Isso precisa aparecer em cada decisão
de copy e de design — quando algo no site parece "clínica popular", está fora de marca.

**Os dois diferenciais reais**, na ordem em que devem ser comunicados:

O primeiro é o **atendimento individual de 50 minutos**. Em clínica convencional o
fisioterapeuta divide a sessão entre três ou quatro pacientes. Aqui não. Esse é o
argumento mais forte porque é concreto, verificável e o paciente entende na hora.

O segundo é o **Pilates Clássico** — a ordem e os aparelhos originais de Joseph Pilates
(Reformer, Cadillac, Chair, Barrel, Mat). É o que separa a Santé tanto das academias que
vendem "pilates" quanto das clínicas que vendem "pilates clínico". Nunca escreva "Pilates
Clínico" em nenhum canal.

**Em desenvolvimento: o Método Santé.** A clínica está formalizando um método próprio. O
material ainda não chegou e **nada sobre ele deve ser publicado ou descrito até que
chegue** — um agente não deve inferir em que consiste.

Vale registrar por que isso importa estrategicamente: método proprietário é o que sustenta
preço premium de forma defensável (não é mais "somos bons", é "fazemos algo que os outros
não fazem"), é o que dá matéria-prima para conteúdo com autoridade real, e é o ativo
natural do subdomínio de cursos já planejado em `cursos.santefisioterapia.com.br`. Quando
o material chegar, ele provavelmente reorganiza boa parte da estratégia de conteúdo de
2027 — e merece spec própria, não um parágrafo numa página existente.

## 2. Dados de contato (NAP)

| Campo | Valor no site (`src/data/config.ts`) | Conflito |
|---|---|---|
| Endereço | Ed. Urbe Office — Av. Serzedelo Corrêa, 805, loja 06, térreo, Batista Campos, Belém — PA, 66033-770 | — |
| WhatsApp | `5591980609411` → (91) 98060-9411 | ⚠️ o doc "Regras de Negócio" diz **(91) 98897-1929** |
| E-mail | administracao@santefisioterapia.com.br | ⚠️ o doc "Regras de Negócio" diz **contato@santeclinica.com.br** |
| Site | santefisioterapia.com.br | ⚠️ o doc "Regras de Negócio" diz **santeclinica.com.br** |
| Instagram | @sante.fisio | — |
| Facebook | facebook.com/sante.fisio.belem | — |

## 2.1 Horários — **confirmado pelo Júlio em 2026-09-15**

Esta é a fonte da verdade. Qualquer outro valor no repositório está errado.

| Dia | Atendimento |
|---|---|
| Segunda a quinta | 06:30–12:30 e 14:30–20:30 |
| Sexta | 06:30–12:30 |

Duas regras que não aparecem no horário em si mas mudam a implementação:

**O último atendimento começa às 19:30.** A clínica fecha 20:30, mas a agenda encerra uma
hora antes. Isso é regra de agendamento, não de funcionamento — o schema deve declarar
20:30 como fechamento, e a informação do último horário pertence ao conteúdo da página e à
conversa do WhatsApp.

**O intervalo de 12:30 às 14:30 recebe mensagem, mas não responde.** As mensagens de
WhatsApp que chegam no almoço são acumuladas e tratadas a partir das 14:30. Isso tem
consequência de conversão: quem manda mensagem às 13h fica sem resposta por até uma hora e
meia, no exato momento em que a intenção está mais alta. Ver CVR-9 no roadmap.

⚠️ **Sábado: pendente de confirmação.** O `config.ts` afirma hoje "Sábado 08h às 12h" e o
documento de regras de negócio também. A resposta do Júlio não mencionou sábado, e o
JSON-LD atual já o omite. Até haver confirmação explícita, **nenhum agente deve publicar
horário de sábado em lugar nenhum**.

### O que está errado hoje em produção

| Fonte | O que diz | Erro |
|---|---|---|
| `src/data/config.ts` | Seg a Sex 06:30–20:30 · Sáb 08:00–12:00 | omite o intervalo do almoço; estende a sexta indevidamente até 20:30; possivelmente inventa o sábado |
| JSON-LD em `src/app/layout.tsx` | Seg a Qui 06:30–20:30 · Sex 06:30–12:30 | acerta os dias, mas **omite o intervalo** — o Google acredita que a clínica atende direto das 06:30 às 20:30 |
| Doc "Regras de Negócio" | Seg a Sex 08:00–18:00 · Sáb 08:00–12:00 | errado em tudo |

O JSON-LD correto exige **dois blocos** `OpeningHoursSpecification` para segunda a quinta
(um para cada turno) e um terceiro para a sexta. Declarar um único bloco 06:30–20:30 faz o
Google exibir a clínica como aberta no almoço, o que gera ligação e visita perdida.

## 3. Serviços

Fisioterapia Ortopédica, Pilates Clássico, RPG, Terapia Manual, Reforço Muscular e Método
Busquet. Todas as sessões duram 50 minutos.

Fisioterapia convencional, RPG e Método Busquet são **exclusivamente individuais**.
Pilates aceita individual, dupla ou grupo de até quatro alunos. A primeira sessão é
avaliação e pode se estender até 60 minutos sem custo adicional.

⚠️ O arquivo `src/data/services.ts` tem **dois** serviços de Pilates com IDs distintos
(`pilates` e `pilates-classico`), e existe ainda uma página estática
`/especialidades/pilates` que sobrepõe a rota dinâmica. Isso cria três superfícies
competindo pela mesma palavra-chave. Ver `audit-2026-09.md`, item SEO-1.

## 4. Equipe

**Currículos completos, credenciais e pendências: ver `context/equipe.md`**, que é a fonte
da verdade desde 2026-09-16 e substitui o conteúdo de `src/data/team.ts`.

| Nome | Credencial de destaque | Status do registro |
|---|---|---|
| Natália Silva | Mestre em fisioterapia desportiva (Portugal); ministrante de cursos | ⚠️ CREFITO a confirmar |
| Liane Melo | Pilates Clássico Nível 3 D'Jati; **tutora** do Instituto D'Jati | ⚠️ CREFITO não informado — mais urgente |
| Camila Nobre de Souza | Pós em gerontologia/geriatria e em cardiorrespiratória | `395039.1.F` (formato a confirmar) |
| Maria Juliana Pantoja Gomes | Graduada pela UFPA | `CREFITO-12 / 444859-F` ✓ |

O currículo da Camila esclareceu que o registro dela **não** é o `168221-F` que o site
publica hoje para ela e para a Liane. Isso reduz o problema, mas não o fecha: o número da
Liane continua sem confirmação e nenhum agente deve deduzi-lo.

Duas credenciais têm consequência estratégica direta e hoje estão invisíveis no site: a
**tutoria da Liane no Instituto D'Jati**, que torna verificável a afirmação de Pilates
Clássico, e a **formação da Camila em geriatria e cardiorrespiratória**, que é o que
sustenta tecnicamente a aposta em atendimento domiciliar para idosos.

⚠️ O histórico do projeto menciona um **Milos Eduardo** que não está em `team.ts` nem nos
currículos enviados — confirmar se saiu da equipe.

## 5. Público e jornada

O público é classe média-alta da zona urbana de Belém, com concentração em Batista Campos
e bairros vizinhos. Na prática há quatro entradas distintas, e elas não convertem do mesmo
jeito:

**Dor aguda** — lombalgia, pós-cirúrgico, lesão. Intenção altíssima, decisão rápida,
chega por busca ("fisioterapeuta em Belém") ou indicação médica. É o público que o Google
Ads deve perseguir.

**Manutenção e prevenção** — o praticante de Pilates de longo prazo. Ticket recorrente,
ciclo de decisão longo, chega por Instagram e por indicação de aluno. É o público que
sustenta a ocupação da agenda.

**Gestante e pós-parto** — hoje é o segmento mais forte nos depoimentos reais da casa
(Isabela, Ana Clara) e o mais subexplorado no site, que não tem nenhuma página dedicada.
Oportunidade clara.

**Idoso** — equilíbrio, prevenção de queda, dor crônica. Frequentemente quem pesquisa é o
filho, não o paciente. Isso muda a copy: quem lê é cuidador.

A jornada, em todos os casos, termina no mesmo lugar: **uma conversa no WhatsApp**. Não há
agendamento online, não há formulário. Tudo que o site precisa fazer é levar a pessoa
informada e confiante até aquele botão.

## 6. Canais

**Google Meu Negócio** é o canal de maior ROI imediato e isso já está comprovado na
prática da clínica — as avaliações cresceram e trouxeram resultado. O site hoje não
explora isso: não mostra a nota, não tem `aggregateRating` no schema, não linka para as
avaliações e não pede avaliação a ninguém.

**Google Ads** está rodando. A campanha antiga apontava para o perfil do Google Meu
Negócio; **uma campanha nova, confirmada pelo Júlio em setembro de 2026, aponta para o
site**. Essa mudança é mais importante do que parece: enquanto o destino era o perfil do
Google, o tráfego pago nunca tocava o site e não havia nada a instrumentar. Agora o
visitante pago chega com `gclid` na URL, o que torna a atribuição ponta a ponta
tecnicamente possível pela primeira vez.

⚠️ Só que o site ainda descarta esse `gclid` e ainda não há ação de conversão configurada
no Ads. Ou seja: a campanha passou a ser mensurável e continua sendo medida a zero. Ver
MED-3 e MED-4 na auditoria — eles deixaram de ser melhoria e viraram desperdício ativo de
verba, porque o dado agora existe e está sendo jogado fora a cada clique.

**Instagram (@sante.fisio)** é gerido pela Natália, com apoio da consultora
@luramosfisio. Carrossel educativo performa melhor que Reels para este público, porque a
distribuição por salvamento favorece conteúdo de referência. O site não tem nenhuma
integração com o Instagram e o Instagram não tem um destino claro no site.

**WhatsApp** é o canal de conversão e o único canal onde se fala preço.

**Blog** tem três artigos, todos datados de 2023–2024, apontando para palavras-chave
locais. Ver `audit-2026-09.md` para o problema de datas.

## 7. Regras de conteúdo

Preço nunca aparece em canal digital. "Pilates Clássico", nunca "Pilates Clínico". Todo
CTA vai para o WhatsApp. Todo conteúdo passa pela Natália antes de publicar. Palavra-chave
sempre com a cidade ("fisioterapia em Belém", "pilates em Batista Campos") — busca local
sem geografia não ranqueia. E a estratégia editorial é de **topo de funil**: construir
consciência do problema, não empurrar serviço.

## 8. KPIs

**Atualizado em 2026-09-16 com a situação real informada pelo Júlio. Esta seção substitui
as metas do documento de regras de negócio, que foram escritas em maio e já estão
defasadas pela realidade.**

### Onde a clínica está hoje

**A agenda está cheia, com fila de espera de dez pacientes.** Isso foi conseguido apenas
com Google Meu Negócio e a campanha nova do Google Ads — sem Instagram, sem outras mídias.

Três padrões que a operação conhece e que ainda **não estão quantificados**:

| Padrão | O que a operação observa | Status |
|---|---|---|
| Sazonalidade | Dezembro e início de janeiro são mais fracos | sem série histórica |
| Turno | A tarde é mais fraca que a manhã, ainda que esteja cheia | sem medição por horário |
| Retenção | "Praticamente 100%" dos pacientes voltam quando precisam | sem medição |

A retenção é o número mais importante desta tabela e o menos conhecido. Se a percepção da
operação estiver certa, o valor de um paciente ao longo do tempo é alto o bastante para
mudar completamente quanto vale a pena pagar para adquirir um — mas, sem medição, esse
argumento não pode ser usado em nenhuma decisão.

### A decisão em aberto

A próxima decisão de negócio é **contratar mais um fisioterapeuta**. O risco é de
calendário: contratar agora significa assumir custo fixo na entrada da janela mais fraca
do ano.

Os dados que essa decisão exige não estão no site. São de operação: tamanho da fila ao
longo das semanas (não só hoje), ocupação por turno e por dia, magnitude histórica da
queda de dezembro e janeiro, e quantas sessões por mês um profissional novo precisa
atender para se pagar.

### Metas declaradas (documento de maio de 2026)

80% de retenção após três meses, 90% de satisfação, 75% de ocupação de agenda e 100
pacientes ativos no ano 2. A meta de ocupação já foi superada. As demais permanecem sem
instrumentação.

### O escopo do trabalho digital

**Contratar ou não é decisão de negócio da Natália e está fora do escopo deste projeto.**
A capacidade existe; o que se decide é quando expandi-la.

O objetivo do trabalho digital é outro e é permanente: **melhoria contínua de site, Google
Meu Negócio, Google Ads e, futuramente, Instagram, para garantir fluxo constante de
clientes** — construindo tudo com horizonte de 1, 2, 5 e 10 anos, rumo a uma administração
baseada em dados.

## 9. Estratégia de crescimento

### Atendimento domiciliar — a aposta principal

É o vetor de crescimento que **não consome capacidade física da clínica**. Ticket maior,
mais escalável, e grande parte do público é idoso com necessidade de atendimento contínuo
pelo resto da vida — ou seja, valor por paciente alto e recorrente.

Os fisioterapeutas assinam **termo de não concorrência** e atendem os domiciliares pela
clínica, recebendo **bônus de R$ 55 por atendimento**.

⚠️ Cláusula de não concorrência com profissional autônomo tem limites de validade no
direito brasileiro que variam conforme a forma de contratação e a contrapartida oferecida.
Vale revisão jurídica — este documento registra a regra de negócio, não atesta sua
exequibilidade.

**O domiciliar não tem nenhuma presença digital hoje:** não há página no site, não há
menção no Google Meu Negócio e não há campanha própria no Ads. É a maior lacuna entre o
que o negócio quer vender e o que o digital comunica.

### Saída da Natália do operacional

A Natália tem clientes de mais de dez anos. O plano é tirá-la do atendimento, e existe um
risco reconhecido: parte da retenção pode estar ligada a ela, não à clínica. A mitigação
adotada é **rotacionar os pacientes entre os fisioterapeutas**.

Isso tem consequência direta no site, e é uma das poucas coisas em que o digital pode
ajudar de verdade: a autoridade precisa migrar da pessoa para a instituição. Na prática
significa dar a cada profissional um perfil completo, com currículo e especializações
reais — hoje o perfil detalhado está pela metade —, tratar o **Método Santé** como o que
sustenta a qualidade independentemente de quem atende, e amplificar depoimentos que citem
mais de um profissional. O depoimento da Ana Clara já faz exatamente isso ao mencionar
Natália e Liane na mesma história; é o padrão a multiplicar, não uma coincidência feliz.

### Preço

Sem reajuste há dois anos. O reajuste é decisão da Natália e virá junto com a
reorganização do negócio e com a metodologia própria — a lógica declarada é entregar mais
valor antes de cobrar mais. Fora do escopo digital, registrado aqui porque muda a
aritmética de quanto vale a pena pagar por paciente adquirido.

## 10. Visão de longo prazo

Administração baseada em dados, inovação competitiva via tecnologia, e visibilidade do
negócio através de dados consumíveis que sustentem decisão rápida. A ambição declarada é
ter capacidade de gestão de empresa grande com o nível de atendimento que a clínica já
tem.

O projeto de maior alcance é um **ERP + CRM próprios integrados com IA via MCP**. O
caminho recomendado, com o sequenciamento que evita o modo de falha clássico, está em
`plano-ads-analytics.md`, seção 8. O resumo: captura estruturada, depois normalização,
depois exposição por MCP somente-leitura, e só então funcionalidade de escrita.

