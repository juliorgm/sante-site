# Documentação do projeto Santé

Ponto de entrada para **humanos e agentes de IA** que trabalham neste repositório.
Se você é um agente, leia `constitution.md` antes de escrever qualquer linha de código.

## Mapa

| Arquivo | O que é | Quando ler |
|---|---|---|
| `constitution.md` | Princípios invioláveis do projeto | **Sempre**, antes de qualquer tarefa |
| `context/business.md` | Fonte da verdade de negócio, marca, público e canais | Antes de mexer em conteúdo, copy ou CTA |
| `context/equipe.md` | Currículos, credenciais e pendências dos profissionais | **Sempre** antes de tocar em `team.ts` ou publicar dado profissional |
| `context/architecture.md` | Stack, estrutura, convenções e armadilhas conhecidas | Antes de mexer em código |
| `audit-2026-09.md` | Diagnóstico completo do site (set/2026) | Para entender o "porquê" do roadmap |
| `roadmap.md` | Fila priorizada de trabalho | Para decidir o que fazer a seguir |
| `plano-ads-analytics.md` | Plano de medição e de Google Ads — **autônomo**, funciona em outra conversa sem contexto | Antes de mexer em tracking, evento ou campanha |
| `specs/` | Uma spec por funcionalidade, no formato SDD | Antes de implementar a funcionalidade |
| `decisions/` | ADRs — decisões arquiteturais e seus motivos | Quando uma escolha precisar ser revisitada |

## O fluxo de trabalho (SDD — Spec-Driven Development)

A ideia central do SDD é simples: **a especificação é o artefato primário, o código é a
saída**. Em desenvolvimento assistido por IA isso importa mais do que no desenvolvimento
manual, porque um agente não tem acesso à intenção que estava na sua cabeça — ele só tem
o que está escrito. Uma spec ruim produz código confiante e errado.

O ciclo tem quatro etapas, e cada uma tem um portão de aprovação humana.

**1. Contexto.** O agente lê `constitution.md` e os arquivos de `context/`. Isso é
carregado uma vez por sessão e evita que ele redescubra — ou invente — as regras do
negócio.

**2. Spec.** Para cada item do roadmap, escreve-se uma spec em `specs/` usando o
`TEMPLATE.md`. A spec descreve o problema, o comportamento esperado e os critérios de
aceite, nunca a implementação. Se a spec menciona nomes de funções, ela está detalhada
demais. Júlio aprova a spec antes de qualquer código existir.

**3. Plano.** Só então o agente propõe *como* fazer: arquivos a tocar, ordem, riscos e o
que fica de fora. Esse é o momento de usar o modo de planejamento do Claude Code, que
impede o agente de editar arquivos enquanto o plano não for aprovado.

**4. Implementação e verificação.** O agente implementa contra os critérios de aceite da
spec. A tarefa só está pronta quando cada critério tem uma verificação — build limpo,
teste automatizado, ou uma checagem manual descrita na própria spec.

O erro mais comum é pular da etapa 1 direto para a 4. Isso funciona para mudanças de uma
linha e falha silenciosamente em todo o resto: o agente entrega algo plausível, você
aprova sem ter um critério objetivo de comparação, e a divergência entre o que o site faz
e o que você acha que ele faz cresce a cada sessão. Este repositório já tem quatro
exemplos dessa divergência documentados em `audit-2026-09.md`.

## Regra de ouro para agentes

Quando faltar informação, **pergunte, não presuma**. Este é um site de saúde: inventar um
número de CREFITO, um horário de funcionamento ou uma alegação clínica não é um bug de
software, é um problema legal.
