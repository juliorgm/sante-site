# Pendências — o que está travado e em quem

Lista única do que falta. Atualizado em 2026-09-16.

Regra: enquanto um item estiver aqui, **nenhum agente pode preenchê-lo por
dedução**. Ver `constitution.md`, princípio 1. Ao resolver, remova a linha e
aplique no código.

---

## 🔴 Bloqueiam publicação — risco legal ou ético

| # | O quê | Com quem | Onde aplica |
|---|---|---|---|
| P1 | **CREFITO da Liane Melo.** O site publica `CREFITO-8 / 168221-F`, que era duplicado com o da Camila. O currículo da Camila esclareceu que o dela é `395039.1.F`, mas isso **sugere** e não confirma que o outro é da Liane. | Liane | `src/data/team.ts` → `TODO-CREFITO` |
| P2 | **CREFITO da Natália.** Não veio no currículo. O site exibe `CREFITO-8 / 100885-F`. | Natália | `src/data/team.ts` |
| P3 | **Região do CREFITO.** A Juliana consta como CREFITO-12, que é a região que abrange o Pará; Natália e Liane constam como CREFITO-8. Para quem atua em Belém o esperado seria 12 nas quatro. Pode ser um segundo erro publicado. | Consulta ao registro | `src/data/team.ts` |
| P4 | **Grafia oficial do número da Camila.** `395039.1.F` não segue o padrão dos demais. | Camila | `src/data/team.ts` |

## 🟡 Bloqueiam conteúdo — decisão de negócio

| # | O quê | Com quem |
|---|---|---|
| P5 | **Sábado: a clínica atende?** O `config.ts` anunciava "Sábado 08h às 12h"; os horários que o Júlio confirmou não incluem sábado, e o sábado foi **removido do site**. Se atende, é um bloco no array e volta. Se não atende, estava mandando gente para uma porta fechada. | Júlio / Natália |
| P6 | **Data de publicação da entrevista** no Programa Argumento. O Google exige `uploadDate` para o rich snippet de vídeo; sem ela o schema é omitido de propósito. | YouTube do Argumento |
| P7 | **Resumo da entrevista** — escrito a partir do título e dos primeiros minutos, precisa de validação clínica. | Natália |
| P8 | **Nome público da Juliana** — "Juliana Gomes" ou "Maria Juliana Pantoja Gomes". | Juliana |
| P9 | **Jiu-jitsu da Juliana** — linha pronta e comentada em `team.ts`. Depende do consentimento dela; é informação pessoal, não dado do negócio. | Juliana |
| P10 | **Aline** — foto e um texto que ela aprove. O bloco está pronto e comentado no fim do array `EQUIPE`. | Aline |
| P11 | **Milos Eduardo** ainda faz parte da equipe? Aparece no histórico do projeto e não está em `team.ts` nem nos currículos. | Natália |
| P12 | **Método Santé** — material prometido. Provavelmente reorganiza a estratégia de conteúdo de 2027 e merece spec própria. | Natália |

## 🔵 Bloqueiam a onda 1 (LGPD)

Detalhe em `specs/0001-lgpd-consentimento.md`, seção 8. Nada de implementação
começa sem estas respostas.

| # | O quê | Com quem |
|---|---|---|
| P13 | Quem é o **encarregado de dados (DPO)** e qual e-mail vai na política. | Júlio / Natália |
| P14 | Já existe **política de privacidade do atendimento presencial**? A do site tem que ser coerente com ela, não um documento paralelo. | Natália |
| P15 | **Prazo de guarda das fichas de avaliação** — o documento de regras de negócio diz cinco anos; confirmar. | Natália |
| P16 | O **Vercel Speed Insights** deve ser bloqueado na recusa? É anônimo e sem cookie de identificação; é decisão de postura. | Júlio |
| P17 | Quem **revisa juridicamente** o texto da política. Não é terreno de agente nem de desenvolvedor. | Advogado |

## 🟢 Bloqueiam a onda 2 (medição)

| # | O quê | Com quem |
|---|---|---|
| P18 | **ID da conta do Google Ads** (formato `AW-XXXXXXXXX`) e o rótulo da ação de conversão, para ligar o evento do site ao Ads. | Júlio (painel do Ads) |
| P19 | Confirmar **para qual página** a campanha aponta e se os sitelinks cobrem as intenções mais buscadas. | Júlio |

## ⚪ Higiene — sem pressa, mas não some sozinho

| # | O quê |
|---|---|
| P20 | O documento "Regras de Negócio" tem **telefone, e-mail e domínio divergentes** do que está no ar (`santeclinica.com.br`, `contato@`, `91 98897-1929`). Alguém vai usar o documento errado em algum material. |
| P21 | **Consentimento de imagem** — não há registro de quais fotos do site têm termo assinado. Fotos de galeria com pacientes identificáveis são risco de LGPD. |
| P22 | `public/images/equipe/fisioterapeuta-na-batista-campos.jpg` está sem versão rastreada e o `team.ts` aponta para o `.png`. Substituto ou sobra? |

---

## ✅ Resolvidos

- ~~Autorização de uso da entrevista do Programa Argumento~~ — **confirmada pelo Júlio em 16/09/2026**
- ~~Depoimento do Mauro Bonna~~ — o texto está correto, é a fala dele; não mexer
- ~~Horário de funcionamento~~ — confirmado e aplicado (`a10ed06`)
- ~~"Pilates Clínico" no blog~~ — corrigido (`3ab2c68`)
- ~~CREFITO da Camila~~ — informado no currículo de 16/09
- ~~Sobrenome da Liane~~ — Melo, aplicado
- ~~Registrar as dimensões personalizadas no GA4~~ — **as cinco criadas em 16/09/2026** na
  propriedade `p534828718`, escopo Evento (`secao`, `assunto`, `origem`, `fonte`,
  `campanha`). A coleta começa nesta data; não há retroatividade.
