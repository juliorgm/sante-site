# [NNNN] — Título curto da funcionalidade

**Status:** rascunho · em revisão · aprovada · implementada · arquivada
**Autor:** 
**Data:** AAAA-MM-DD
**Referências da auditoria:** LEG-x, MED-x…

---

## 1. Problema

Qual é a dor, de quem, e por que ela importa **agora**. Escreva em prosa, não em lista.
Se você não consegue explicar por que isso importa para o negócio em três frases, a spec
ainda não está madura.

## 2. Resultado esperado

O que passa a ser verdade quando isso estiver pronto, do ponto de vista de quem usa o site
ou de quem administra a clínica. Ainda **sem falar de implementação**.

## 3. Escopo

**Dentro:** o que esta spec cobre.

**Fora:** o que explicitamente não cobre. Esta seção é a mais importante da spec quando se
trabalha com IA — um agente preenche silenciosamente qualquer lacuna com uma suposição
razoável e plausível, e você só descobre qual foi na revisão do diff.

## 4. Comportamento

Descreva o comportamento observável. Use o formato dado/quando/então quando houver
condição envolvida:

> **Dado** que o visitante ainda não respondeu ao banner
> **Quando** ele carrega qualquer página
> **Então** nenhum cookie de análise é gravado

## 5. Critérios de aceite

Cada critério precisa ser verificável por alguém que não escreveu o código. "Funciona bem"
não é critério; "o evento `whatsapp_click` aparece no DebugView do GA4 com o parâmetro
`origem` preenchido" é.

- [ ] 
- [ ] 
- [ ] 

## 6. Como verificar

O passo a passo concreto da checagem — comando, ferramenta, ou o roteiro manual. Se um
critério não tem verificação descrita aqui, ele não está pronto para ser implementado.

## 7. Restrições

Quais princípios da `constitution.md` incidem sobre esta spec, e qualquer limite técnico
ou de prazo.

## 8. Perguntas em aberto

O que ainda depende de decisão do Júlio ou da Natália. **Uma spec com perguntas em aberto
não vai para implementação.** Se um agente encontrar uma pergunta aberta aqui, ele deve
parar e perguntar, nunca escolher uma resposta.

## 9. Riscos

O que pode dar errado, e como se recupera.
