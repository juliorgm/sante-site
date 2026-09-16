# Constituição do projeto Santé

Princípios invioláveis. Um agente de IA ou um colaborador humano **não pode** violar
nenhum destes pontos sem aprovação explícita do Júlio. Quando uma tarefa parecer exigir
uma violação, pare e pergunte.

---

## I. Conformidade clínica e legal vem antes de qualquer métrica

Santé é um estabelecimento de saúde. As regras do COFFITO/CREFITO sobre publicidade e a
LGPD não são "requisitos não-funcionais" — são o piso.

1. **Nunca inventar ou inferir dado profissional.** Número de CREFITO, especialização,
   titulação e nome de profissional só entram no site se vierem do Júlio ou da Natália
   por escrito. Um registro errado no ar é infração ética, não bug.
2. **Nunca fazer promessa de resultado.** Nada de "cura", "garantia de resultado",
   "elimina a dor". A publicidade de fisioterapia é regulada: descreva o método e o
   cuidado, não o desfecho garantido.
3. **Nenhum script de terceiro dispara antes do consentimento.** Analytics, pixels,
   mapas, embeds de vídeo e fontes externas só carregam depois que o visitante consentiu,
   ou em modo sem cookies. Não existe exceção "só para medir".
4. **Dado de saúde é dado sensível (LGPD art. 11).** Se algum dia houver formulário, ele
   não coleta queixa clínica, diagnóstico ou histórico. Coleta nome e contato, e a
   conversa clínica acontece no canal privado.
5. **Foto de paciente exige consentimento documentado.** Nenhuma imagem de paciente vai
   ao ar sem termo assinado arquivado.

## II. Uma única fonte da verdade

6. **`src/data/config.ts` manda.** Nome, endereço, telefone, e-mail e horários existem em
   um lugar só. Qualquer outro arquivo — JSON-LD, rodapé, texto de página — consome dali,
   nunca redeclara. Hoje o JSON-LD do `layout.tsx` viola isso e é um bug aberto.
7. **NAP consistente em todos os canais.** Nome, endereço e telefone precisam ser
   byte-a-byte iguais no site, no Google Meu Negócio e no Instagram. Divergência de NAP
   derruba ranqueamento em busca local e é uma das poucas coisas em SEO local com
   causalidade bem estabelecida.
8. **Conteúdo mora em `src/data/`, nunca hardcoded em página.** Se um texto precisa mudar
   sem deploy de lógica, ele é dado.

## III. Marca

9. **É "Pilates Clássico", nunca "Pilates Clínico".** O método original de Joseph Pilates
   é o diferencial da casa. A troca do termo apaga o posicionamento e ainda cria conflito
   com concorrentes que vendem "clínico".
10. **Preço não aparece em canal digital.** Nem no site, nem no Instagram, nem no Google.
    Valor é conversa, e a conversa é no WhatsApp.
11. **Paleta e tipografia são fixas.** Teal `#0B9DB3`, Navy `#1B3B72`, Gold `#F5C41A`,
    Cream `#F8F6F1`; DM Serif Display para títulos, DM Sans para texto. Nada de cor nova
    sem passar pelo Júlio.
12. **Todo conteúdo passa pela validação da Natália antes de publicar.** Sem exceção para
    "correção pequena" em texto clínico.

## IV. Conversão

13. **A conversão é a conversa no WhatsApp.** Não é clique, não é pageview, não é tempo
    na página. Todo trabalho de produto é julgado por quantas conversas qualificadas ele
    gera.
14. **Todo CTA que leva ao WhatsApp é instrumentado.** Um CTA sem evento de tracking é
    considerado um bug, porque cria um buraco na atribuição que ninguém percebe até a
    hora de decidir orçamento de anúncio.
15. **Toda mensagem pré-preenchida corresponde ao que o botão prometeu.** Botão "Valores
    e planos" não abre conversa genérica.

## V. Técnica

16. **O site é estático.** Sem backend, sem banco, sem API interna. Toda proposta que
    exija servidor precisa de justificativa explícita — o custo real não é a
    infraestrutura, é a superfície de ataque e a manutenção que recai sobre uma pessoa.
17. **Segredo nenhum vai para o repositório.** IDs públicos de analytics podem ficar em
    código; qualquer chave vai para variável de ambiente.
18. **Performance é requisito, não otimização.** O tráfego é majoritariamente mobile em
    rede móvel de Belém. Imagem em PNG onde cabe WebP, fonte bloqueante e JavaScript
    desnecessário custam conversão de forma medível.
19. **Acessibilidade mínima é obrigatória:** contraste AA, foco visível, navegação por
    teclado, `alt` descritivo. Boa parte do público tem dor, limitação de mobilidade ou é
    idoso — acessibilidade aqui é público-alvo, não caridade.
20. **Nada vai para `main` sem `npm run build` limpo.**

## VI. Trabalho com IA

21. **Spec antes de código.** Ver `README.md`. Mudanças triviais estão dispensadas;
    qualquer coisa que toque conversão, dado clínico ou privacidade não está.
22. **O agente não faz commit nem push.** Ele propõe o diff; o Júlio aplica e versiona.
23. **O agente não inventa conteúdo clínico.** Texto sobre patologia, indicação ou
    contraindicação é escrito ou validado por fisioterapeuta.
24. **Quando o agente descobrir uma divergência entre a documentação e o código, ele
    reporta em vez de escolher um lado.** A documentação pode estar desatualizada; o
    código pode estar errado. Só o Júlio sabe qual.
