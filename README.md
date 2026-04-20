# Korp-Teste-Giselly
## Desafio Técnico (Giselly)
Este é o repositório oficial da minha solução para o desafio técnico da Korp! O projeto consiste em um sistema robusto de gerenciamento de Estoque e Emissão de Notas Fiscais (Vendas), desenvolvido utilizando uma **arquitetura baseada em Micro-serviços no Back-end (.NET Microservices)** e uma **Single Page Application moderna no Front-end (Angular)**.

## Arquitetura do Sistema
O projeto foi dividido em três frentes principais para garantir escalabilidade e responsabilidade única:

* Frontend (korp_front): SPA desenvolvida em Angular 17+ utilizando Standalone Components, Angular Router e comunicação reativa com Serviços (RxJS).
* Stock Service (stock_service): Micro-serviço desenvolvido em .NET 10 responsável pelo cadastro de produtos, regras de valores e controle de saldo (estoque) no banco de dados.
* Note Service (note_service): Micro-serviço em .NET 10 responsável pela criação, numeração automática e emissão das Notas Fiscais. Ele se comunica de forma síncrona via HTTP com o stock_service para garantir a baixa no estoque ao faturar/imprimir uma nota.

## Tecnologias Utilizadas
* Front-end: Angular, TypeScript, HTML5, CSS3, e Bootstrap/Angular Material.
* Back-end: C#, .NET 10, ASP.NET Core Web API.
* Banco de Dados: MySQL com Entity Framework Core (Code-First e Migrations).
* Integração: Injeção de Dependências, HttpClient, Padrão MVC.

Neste repositório, estão inclusos os serviços de `stock_service` e `note_service` bem como o Frontend, aplicando os seguintes pilares teóricos e práticos que solidificam a arquitetura:

---

## 1. Ciclos de Vida Angular (Lifecycle Hooks)
No Angular, garantir que os dados de uma aplicação estejam corretos e sincronizados com a renderização da tela é fundamental.

A principal implementação utilizada neste projeto foi o **`ngOnInit`**. 
- **Onde aplicamos:** Em nossos componentes de listagem e formulários (como no `NotaFormComponent` e `ProdutoComponent`).
- **O que faz:** Diferente de colocar chamadas pesadas (como requisições HTTP) dentro do construtor da classe - o que é uma má prática -, o método `ngOnInit()` é acionado logo após o Angular inicializar todas as propriedades vinculadas a dados (`data-bound properties`) de uma diretiva. Utilizamos esse ciclo para carregar rapidamente o inventário de produtos assim que o componente de formulário de venda nasce, impedindo travamentos na renderização inicial do DOM.

---

## 2. RxJS, Subscribes e Reatividade
A comunicação entre diferentes telas no mundo Single Page Application (SPA) exige lidar com programação assíncrona.

- Para resolvermos a troca de mensagens entre o *Formulário de Cadastro* e a *Lista de Produtos* (que operam ao mesmo tempo lado a lado na nossa Dashboard), abandonamos táticas como Refresh forçado de navegador ou Injeção em Cascata. 
- Utilizamos o poder da biblioteca **RxJS**, implementando instâncias de `Subject` (como no `produtosAtualizados.next()`). 
- **O que faz:** Cria-se um "túnel" de reatividade contínua. Quando uma nova Nota é salva, a resposta da API alimenta o `Subject`, disparando alertas em formato de fluxo (stream) para as tabelas assinantes (`.subscribe(...)`), que auto-redesenham e atualizam suas malhas de dados garantindo a leitura e a interface sempre perfeitamente atualizadas em *real-time*.

---

## 3. Integração com LINQ (Backend C#)
No Backend (.NET 10), processar o volume de dados e o relacionamento de tabelas do MySQL exige uma manipulação inteligente dos mapeamentos do banco. Utilizamos a tecnologia *Language Integrated Query* (**LINQ**) do framework da Microsoft.

- **Trabalho Relacional:** Durante nosso histórico de notas fiscais, usamos encadeamentos lógicos expressivos como `_context.NotasFiscais.Include(n => n.Itens).ThenInclude(...)` para carregar simultaneamente e com segurança referencial o Pai (a NFE) e os Filhos (os itens da nota) dentro de um único pacote de transação.
- **Eficiência:** Aplicamos condicionais em memória via `.Where()` ou `.FirstOrDefault()` para validar e tratar estoques exatos antes do abatimento, deixando o pesado fardo da seleção matemática para o SGBD resolver, devolvendo um resultado limpo e performático à API.

---

## 4. Tratamento de Erros e Resiliência
Erros acontecem. Uma conexão de rede que cai ou uma API derrubada não pode refletir uma "tela branca da morte" ao usuário.

- **No Frontend (Angular):** Protegemos absolutamente todas as requisições via httpClient (`.subscribe({ next: ..., error: (err) => ... })`). Em caso de timeout/falhas 500, capturamos e expomos um Alerta Amigável indicando indisponibilidade para não congelar o estado do usuário, além de mantermos o cache do último estado útil (o objeto Formulário só é resetado se o servidor acusar `Success`).
- **No Backend (.NET):** Tratamos as barreiras em múltiplos *layers*. Antes de permitir baixar o estoque, há validações cruciais para impedir que o usuário injete vendas zeradas, e validamos lógicamente situações de processamento impossível (como tentar cancelar nota em status já finalizado), empurrando códigos unificados `BadRequest (400)` e evitando `Exceptions 500` inesperadas e não documentadas de derrubarem nosso serviço.

---

## Como Executar o Projeto
Certifique-se de ter o Node.js, Angular CLI, .NET SDK e um servidor de banco de dados [MySQL] rodando em sua máquina.

### Executando os Micro-serviços (Back-end)
Abra dois terminais na pasta raiz do repositório backend e inicie os dois serviços:

bash
# Terminal 1 - Rode o Serviço de Estoque
```
cd stock_service
dotnet run
```

# Terminal 2 - Rode o Serviço de Notas (na porta 5085)
```
cd note_service
dotnet run
```
# Terminal 3 - Executando o SPA (Front-end)
Abra um terminal na pasta do front-end e instale/estarte a aplicação:

```
bash
cd korp_front
npm install
ng serve
```

Acesse a aplicação em: <http://localhost:4200>
