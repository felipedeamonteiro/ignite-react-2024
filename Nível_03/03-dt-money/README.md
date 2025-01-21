# 03 - DT Money

This is the 3rd chapter of Ignite 2024

## Como rodar
O projeto foi feito com Node na versão v20.10.0.

Primeiramente intale as dependências:
```
npm install
```
E depois rode:
```
npm run dev
```

Este projeto utiliza o `json-server`, uma lib que simula um backend para consumo de APIs. Para rodar:
```
npm run dev-server
```

## Layoute do projeto com Figma

[Figma](https://www.figma.com/community/file/1138814493269096792)

## Lições importantes:

### - Utilização do ContextAPI

Ultimamente o ContextAPI está sendo muito utilizado pelos projetos da Rocket, e algumas funcionalidades bacanas surgiram
para facilitar ainda mais sua utilização, deixando ele fácil de escrever e performático igual ao REDUX. `Reducers`, `Actions` e `Dispatch` 
estão sendo amplamente utilizados para facilitar o gerenciamento de estados com o ContextAPI. 

Além disso, o uso de Selectors também estão sendo utilizados para perfomance na hora de pegar os dados no estado global,
sem rederizações desnecessárias. Para isso tem duas bibliotecas que foram utilizadas aqui:
`use-context-selector`
e
`scheduler`

OBS: O `scheduler` serve só pra outra lib funcionar.

### - Ciclo de vida dos componentes

Para checar as renderizações dos diversos componentes depois de um evento disparado pelo usuário,
dentro do React Dev Tools tem o `Profiler` que ajuda a enxergar esses eventos.

#### - useCallback

No meio das renderizações dos componentes, quando um componente renderiza, as funções dele também renderizam.
Para evitar isso, o `useCallback` pode ajudar, pois assim ele só recria a função se alguma dependência externa à
função mudar e precisar alterar algo nela.

#### - Memo

 Por que um componente renderiza?
 - Hooks change (Muda estado, context, reducer);
 - Props change (Muda propriedades);
 - Parent renders (Pai renderiza);

 Qual o fluxo de renderização de um componente?
 - O React recria o HTML da interface daquele componente;
 - O React compara o HTML antigo com o HTML novo;
 - Se mudou alguma coisa, ele reescreve o HTML na tela;
 
 Memo:
 - Hooks changed, props changed (deep comparison);
 - Comparar a versão anterior dos hooks e props;
 - Se mudou algo, ele vai permitir a nova renderização.


 Neste caso o Memo só é utilizado em `componentes` extremamente complexos, com muitas condicionais e propriedades, pois se utilizar em 
 componentes simples o `deep comparison` é mais custoso no javascript do que recriar o HTML do zero, algo que o React faz com maestria.
 Portanto, `tomar cuidado ao usar o Memo`.

 #### - useMemo

 Assim como o `useCallback` é pra evitar que se renderize uma `função`, o `memo` é para evitar que se renderize um `componente`, o `useMemo`
 serve para evitar que se renderize uma `constante`.