# Diretrizes do projeto Lukas Sistemas

Este documento registra as decisoes tomadas durante a construcao do site. Ele deve ser atualizado quando uma nova regra ou convencao for adotada.

## Objetivo de aprendizado

- Praticar HTML semantico, CSS responsivo e animacoes com GSAP.
- Entender o motivo de cada decisao antes de aplica-la.
- Manter o codigo sendo escrito pelo autor do projeto; o assistente atua como professor e revisor, sem alterar HTML, CSS ou JavaScript.
- O assistente somente deve editar arquivos quando houver uma solicitacao ou permissao explicita do autor.

## Referencia visual e animacoes

- Cada nova secao deve possuir referencias visuais suficientes para desktop e mobile antes da implementacao.
- As referencias podem representar os estados inicial, intermediarios, final e completo da animacao.
- As imagens devem ser analisadas como partes de uma sequencia, e nao apenas como layouts estaticos isolados.
- Antes do codigo, devem ser definidos a composicao, a ordem dos movimentos e o comportamento esperado durante o scroll.
- A versao mobile nao deve ser apenas uma adaptacao posterior do desktop; ela precisa ter composicao e animacao planejadas a partir de suas proprias referencias.
- Quando desktop e mobile apresentarem comportamentos diferentes, essas diferencas devem ser registradas no plano da secao.
- O GSAP deve animar propriedades sem comprometer o layout final nem a acessibilidade.
- Microinteracoes simples, como hover e focus, devem permanecer no CSS.
- Movimentos continuos ou muito complexos podem ser exportados como video, quando isso for mais apropriado que GSAP.
- Animacoes futuras devem respeitar `prefers-reduced-motion`.

## Planejamento de cada secao

Antes de alterar HTML, CSS ou JavaScript, deve ser criado e aprovado um plano contendo:

1. Objetivo visual e narrativo da secao.
2. Referencias disponiveis para desktop e mobile.
3. Estado inicial, estados intermediarios e estado final.
4. Elementos que permanecem fixos, entram, saem ou acompanham o scroll.
5. Estrutura semantica necessaria no HTML.
6. Composicao responsiva e responsabilidades do CSS.
7. Animacoes e responsabilidades do GSAP.
8. Gatilhos, duracao, progresso, `scrub` e limites do ScrollTrigger, quando aplicaveis.
9. Comportamento alternativo para `prefers-reduced-motion`.
10. Criterios de validacao visual, responsiva, funcional e de desempenho.

Nenhuma implementacao deve comecar enquanto o comportamento da secao ainda estiver ambiguo. Duvidas devem ser resolvidas durante o planejamento, evitando reorganizacoes grandes no CSS ou no GSAP depois que o codigo ja estiver em andamento.

## Responsividade

- A abordagem padrao e mobile-first.
- As regras fora de media queries descrevem a experiencia mobile.
- Media queries devem ser usadas para mudancas estruturais, nao apenas porque um dispositivo recebeu um nome como "tablet" ou "desktop".
- Breakpoints devem surgir quando o conteudo deixa de caber ou quando a composicao precisa mudar.
- Valores fluidos, como `clamp()`, `%`, `vw`, flex e grid, devem ser preferidos quando a mudanca puder ser gradual.
- `rem` e a unidade preferida para fontes e espacamentos; `em` e adequada quando o valor deve acompanhar o tamanho do proprio elemento, como `letter-spacing`.
- `px` continua valido para detalhes realmente fixos, como bordas finas.
- O layout deve ser verificado, no minimo, em larguras proximas de 320px, 375px, 768px, 1024px e 1440px.

## CSS

- O projeto utiliza CSS Nesting nativo.
- Os estilos sao separados por componente, como `header.css` e `hero.css`.
- `style.css` e o ponto de entrada e importa variaveis e componentes.
- Variaveis globais ficam em `variables.css` e sao declaradas em `:root`.
- A ordem dos imports deve garantir que `variables.css` seja carregado antes dos componentes.
- Cor e tipografia padrao pertencem ao `body`; componentes sobrescrevem apenas quando necessario.
- Flex deve ser usado principalmente para distribuicao em uma dimensao; grid, para composicoes em duas dimensoes.
- Nao adicionar breakpoints ou abstracoes sem uma necessidade observada.

## HTML e acessibilidade

- Usar elementos semanticos como `header`, `nav`, `main`, `section` e `h1`.
- Imagens decorativas devem usar `alt=""`.
- A marca deve possuir um nome acessivel mesmo quando os textos visuais estiverem ocultos no mobile.
- Estados de teclado devem usar `:focus-visible`.
- Menus moveis devem manter `aria-controls` e `aria-expanded` coerentes com o estado real.
- Elementos interativos devem continuar utilizaveis sem depender de animacao.

## Convencoes do projeto

- Classes CSS usam palavras separadas por hifen, como `hero-title` e `client-area-btn`.
- O JavaScript utiliza modulos ES separados por responsabilidade dentro da pasta `js`.
- `js/main.js` e o ponto de entrada e deve apenas registrar dependencias e inicializar os modulos.
- Comportamentos independentes, como menu, video e animacoes de uma secao, devem permanecer em arquivos proprios.
- Nao criar um novo modulo para funcoes pequenas que pertencem claramente a uma responsabilidade ja existente.
- Os links podem permanecer temporariamente com `href="#"` enquanto as demais paginas nao existem.
- Ao final do projeto, todos os links temporarios devem ser revisados.
- O fundo e as imagens decorativas devem se integrar sem revelar cortes ou retangulos do arquivo exportado.
- Dimensoes intrinsecas de imagens devem ser informadas no HTML quando conhecidas.

## Fluxo de trabalho por secao

1. Reunir e organizar as referencias visuais da secao.
2. Analisar separadamente as experiencias desktop e mobile.
3. Descrever os estados inicial, intermediarios, final e completo.
4. Planejar a estrutura HTML, as camadas visuais e o fluxo responsivo.
5. Separar claramente as responsabilidades entre CSS e GSAP.
6. Definir ScrollTrigger, temporizacao, movimento reduzido e criterios de teste.
7. Revisar e aprovar o plano antes de alterar o codigo.
8. Implementar primeiro a estrutura HTML necessaria.
9. Construir e validar os estados visuais com CSS.
10. Implementar as animacoes planejadas com GSAP.
11. Comparar o resultado com todas as referencias, incluindo mobile.
12. Testar larguras intermediarias, recarregamento fora do topo, scroll reverso, desempenho e navegacao por teclado.
