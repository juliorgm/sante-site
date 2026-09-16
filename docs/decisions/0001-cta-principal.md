# 0001 — O CTA principal continua "Fale com a gente"

**Data:** 2026-09-16 · **Decisão do:** Júlio · **Status:** aceita

## Contexto

Em 16/09 o site trocou a linguagem de agendamento por linguagem de entendimento nos CTAs
secundários — "Agendar agora" virou "Como funciona a avaliação", "Agendar" virou "Tirar
dúvidas", e o CTA do perfil da equipe virou "Falar com a gente". O motivo está em
`context/business.md`, na seção da avaliação inicial: a primeira consulta é paga, e
convidar a agendar faz o preço aparecer antes da razão dele existir.

Ficou a dúvida se o CTA principal — o do cabeçalho e do hero, o mais clicado do site —
deveria acompanhar. Ele mostra "Fale com a gente" e envia a mensagem
`WHATSAPP_MENSAGENS.agendamento`.

## Decisão

**Fica como está**, rótulo e mensagem.

## Consequência

Existe uma assimetria deliberada: o rótulo convida a conversar, a mensagem fala em
agendar. Isso **não é bug** — foi avaliado e mantido.

Um agente que encontrar essa divergência deve deixá-la em paz. Alterar exige decisão nova
do Júlio.

Quando a medição acumular algumas semanas, o parâmetro `assunto` vai mostrar como o CTA
de `agendamento` performa frente aos de `funcionamento`. Se houver diferença relevante na
qualidade da conversa, esta decisão pode ser revisitada com dado em vez de opinião.

## Alternativa descartada

Trocar a mensagem para `funcionamento`, alinhando com os CTAs secundários. Descartada
porque o rótulo atual funciona e a mudança não foi julgada necessária.
