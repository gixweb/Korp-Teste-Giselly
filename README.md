# Korp-Teste-Giselly
## Desafio Técnico (Giselly)
Este é o repositório oficial da minha solução para o desafio técnico da Korp! O projeto consiste em um sistema robusto de gerenciamento de Estoque e Emissão de Notas Fiscais (Vendas), desenvolvido utilizando uma **arquitetura baseada em Micro-serviços no Back-end** e uma **Single Page Application moderna no Front-end**.

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
``
# Terminal 3 - Executando o SPA (Front-end)
Abra um terminal na pasta do front-end e instale/estarte a aplicação:

```
bash
cd korp_front
npm install
ng serve
```

Acesse a aplicação em: <http://localhost:4200>