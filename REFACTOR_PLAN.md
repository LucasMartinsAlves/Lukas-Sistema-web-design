# Plano de refatoracao

Este documento organiza o caminho de refatoracao da landing page Lukas Sistemas. A ideia e melhorar legibilidade, manutencao e responsividade sem perder o resultado visual que ja foi construido.

## Objetivo

- Refatorar com seguranca, sem alterar a identidade visual atual sem necessidade.
- Separar melhor responsabilidades entre HTML, CSS e JavaScript.
- Reduzir duplicacoes e valores dificeis de manter.
- Preparar a base para ajustes responsivos mais robustos, principalmente na animacao de Solutions.
- Manter o projeto como material de aprendizado: cada mudanca deve ter motivo claro.

## Principios

- Nao refatorar tudo de uma vez.
- Preferir mudancas pequenas, testaveis e reversiveis.
- Preservar o comportamento visual antes de melhorar internamente.
- Testar mobile, telas intermediarias e desktop apos cada etapa relevante.
- Evitar novas abstracoes antes de entender a repeticao real.
- Separar limpeza simples de mudancas estruturais.

## Ordem sugerida

### 1. Revisao do HTML

Objetivo: garantir que a estrutura esteja clara, sem comentarios temporarios desnecessarios e com semantica consistente.

Status: revisado.

Verificar:

- Estrutura geral: `header`, `main`, `section`, `footer`.
- Ordem das secoes.
- Headings e hierarquia.
- Imagens decorativas com `alt=""`.
- Links temporarios com `href="#"`.
- Comentarios deixados durante desenvolvimento.
- Classes inconsistentes ou pouco claras.

Resultado esperado:

- HTML mais limpo.
- Estrutura das secoes facil de ler.
- Nenhuma mudanca visual intencional nesta etapa.

Decisoes tomadas:

- O `title` da pagina foi corrigido para `Lukas Sistemas`.
- Os comentarios temporarios de secao foram removidos.
- O contato de `Luma` foi mantido como item ativo na lista de contatos.
- O `nav` principal recebeu `aria-label="Navegacao principal"`.
- Os links do header permanecem com `href="#"`, pois devem apontar para paginas futuras, nao para secoes internas.
- A `solution-navigation` permanece com `span`, pois no momento funciona como indicador de estado, nao como navegacao clicavel.
- As secoes individuais de solucao permanecem sem `id` ate que exista necessidade real de navegacao direta.
- O SVG de `solutions-symbol` permanece inline porque o GSAP precisa manipular seus grupos internos.

### 2. CSS global e componentes menores

Objetivo: limpar primeiro os arquivos menos arriscados antes de tocar nas secoes complexas.

Arquivos candidatos:

- `variables.css`
- `style.css`
- `footer.css`
- `contact.css`
- `about.css`
- `about-ex.css`

Verificar:

- Repeticoes simples.
- Ordem dos imports.
- Uso coerente de variaveis.
- Media queries que podem ser simplificadas.
- Valores fixos que poderiam ser fluidos.
- Comentarios ou regras antigas que nao afetam mais o layout.

Resultado esperado:

- Base global mais previsivel.
- Componentes pequenos mais faceis de manter.

### 3. Refatoracao de `solutions.css`

Objetivo: organizar o arquivo mais extenso do CSS sem mudar a animacao.

Status: limpeza segura concluida.

Divisao mental recomendada:

- `solutions-transition`
- `solutions-intro`
- `solution-navigation`
- `solution`
- `solution-image`
- `solution-details`
- `solutions-symbol`
- ajustes por breakpoint

Verificar:

- Regras duplicadas entre breakpoints.
- Responsabilidades misturadas.
- Ordem das classes.
- `z-index` e `position` usados por necessidade real.
- Tamanhos e posicionamentos especificos de cada figura.
- Sombra e profundidade das figuras.
- Coerencia entre mobile, telas intermediarias e desktop.

Resultado esperado:

- `solutions.css` mais legivel.
- Menos risco ao ajustar uma figura ou breakpoint.
- Nenhuma mudanca grande na animacao ainda.

Decisoes tomadas:

- A fase 3 ficou limitada a organizacao e limpeza segura do CSS atual.
- Foram removidas regras redundantes, propriedades sobrescritas e pequenos ruidos de formatacao.
- Os blocos de stacking das secoes de Solutions foram agrupados para melhorar leitura.
- A regra base de `solution-details` foi posicionada junto das regras base.
- O breakpoint de tablet foi mantido temporariamente.
- O breakpoint desktop continua em `75rem` por enquanto.
- A possibilidade de remover o breakpoint de tablet e testar desktop a partir de `64rem` fica para a fase 4.
- Valores visuais sensiveis, como posicoes das figuras, `translateY`, `top`, `width` e ajustes de escala, nao foram alterados nesta fase.
- A responsividade por ancoras sera estudada antes de qualquer mudanca estrutural nos breakpoints.

### 4. Refatoracao do JavaScript de Solutions

Objetivo: melhorar legibilidade do arquivo `solutions-symbol-animation.js` sem alterar a ideia da animacao.

Status: organizacao inicial concluida.

Possivel organizacao interna:

- seletores;
- validacao de elementos;
- pontos e formas SVG;
- presets responsivos;
- estados iniciais;
- timeline principal;
- ScrollTrigger;
- comportamento de lock/final da ultima figura.

Verificar:

- Valores magicos.
- Repeticoes entre figuras.
- Trechos que podem virar constantes nomeadas.
- Separacao entre posicao global e transformacao das formas.
- Uso de `invalidateOnRefresh`.
- Comportamento ao recarregar a pagina fora do topo.
- Comportamento em scroll reverso.

Resultado esperado:

- Codigo mais facil de ajustar.
- Timeline mais compreensivel.
- Menos chance de quebrar uma figura ao ajustar outra.

Decisoes tomadas:

- A posicao global do simbolo passou a ser controlada por `.solutions-symbol-position`.
- A posicao final de cada figura passou a usar ancoras invisiveis nas secoes.
- A intro usa uma ancora propria para posicionar o logo acima do texto.
- A timeline continua controlando a transformacao das formas SVG.
- Os principais valores de escala, separacao, timing e tamanho foram movidos para constantes nomeadas.
- A timeline principal foi dividida em quatro fases internas: intro para gestao, gestao para web, web para mobile e mobile para automacao.
- Comentarios internos redundantes foram removidos; ficaram apenas marcadores de fase para orientar a leitura.
- A validacao sintatica com `node --check js/solutions-symbol-animation.js` passou apos a reorganizacao.
- O `end` do desktop permanece em `+=450%`, pois o resultado visual foi aprovado.
- Em telas abaixo do desktop, o `end` passou a usar a altura real de `.solutions-transition` com um fator de ajuste, reduzindo atrasos no morph em mobile.
- A frase guia validada nesta etapa foi: timing controla a transformacao; ancoras controlam a posicao.

Pendencias futuras:

- Reavaliar se o breakpoint intermediario ainda e necessario depois da estabilizacao por ancoras.
- Avaliar, sem pressa, se alguns grupos de seletores ou estados SVG merecem helpers menores.
- Evitar novas abstracoes na timeline enquanto os ajustes visuais ainda estiverem vivos.

### 5. Estudo de responsividade por ancoras

Objetivo: estudar uma evolucao futura para posicionar as figuras com base no layout real, e nao apenas em valores de `vh`, escala e progresso.

Status: aplicado na animacao de Solutions.

Ideia:

- Criar ancoras invisiveis ou pontos de referencia nas secoes.
- Medir a posicao real dessas ancoras com JavaScript.
- Usar esses alvos para mover o simbolo.
- Deixar a timeline controlar a transformacao das formas.
- Deixar as ancoras controlarem a posicao no layout.

Frase guia:

> Timing controla a transformacao; ancoras controlam a posicao.

Resultado esperado:

- Melhor adaptacao em aparelhos como iPhone, tablets e telas com proporcoes incomuns.
- Menos dependencia de ajustes manuais por dispositivo.

Resultado atual:

- As ancoras foram adicionadas para intro, gestao, web, mobile e automacao.
- A abordagem ficou visualmente estavel em mobile e desktop.
- O breakpoint intermediario ainda pode ser reavaliado em uma etapa futura, agora com menor risco.

## Checklist de validacao

Apos cada etapa relevante, testar:

- largura proxima de 320px;
- largura proxima de 375px;
- celulares maiores;
- tablets;
- 1440px;
- desktop full HD sem zoom;
- refresh no meio da pagina;
- scroll para baixo e para cima;
- menu mobile;
- links e foco por teclado;
- desempenho com DevTools em rede lenta quando houver videos ou fontes.

## Regra de trabalho

O assistente atua como guia e revisor. Arquivos so devem ser alterados quando houver pedido explicito para executar a mudanca.
