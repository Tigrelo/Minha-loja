# Projeto Concessionária - CRUD Full-Stack

Este projeto foi desenvolvido como um desafio técnico para um processo seletivo, com o objetivo de demonstrar habilidades em desenvolvimento full-stack, desde a modelagem do banco de dados e construção de uma API REST segura até a criação de uma interface de usuário moderna e reativa.

## 🚀 Funcionalidades Principais

A aplicação é um sistema de gerenciamento para uma concessionária de veículos, implementando as operações de CRUD (Criar, Ler, Atualizar, Deletar) para as seguintes entidades:

* **Veículos:** Gerenciamento completo do inventário de carros.
* **Clientes:** Cadastro e controle da base de clientes.
* **Vendedores:** Gerenciamento da equipe de vendas.
* **Vendas:** Registro de transações, criando um relacionamento entre um cliente, um veículo e um vendedor.

### Recursos Adicionais

* **Visualização de Relacionamentos:** Na tela de clientes, é possível visualizar o histórico de veículos comprados por cada um.
* **UX Aprimorada:** O frontend possui indicadores de carregamento (`loaders`) e exibe mensagens de feedback (sucesso/erro) para o usuário após cada operação, criando uma experiência de uso fluida.
* **Integridade de Dados:** O sistema impede a exclusão de entidades que possuem relacionamentos (ex: um veículo que já foi vendido não pode ser deletado), garantindo a consistência dos dados.

## 🏛️ Arquitetura

O projeto segue uma arquitetura moderna de **API REST + SPA (Single-Page Application)**, com uma clara separação de responsabilidades:

* **Backend (API REST):** Desenvolvido em Java com Spring Boot, é o "cérebro" da aplicação. Ele é responsável por todas as regras de negócio, persistência de dados e segurança, expondo endpoints RESTful para o frontend.
* **Frontend (SPA):** Desenvolvido em Angular, é a "face" da aplicação. Totalmente desacoplado do backend, ele consome a API através de requisições HTTP e proporciona uma experiência de usuário dinâmica e sem recarregamentos de página, graças ao Angular Router.

## 🛠️ Tecnologias Utilizadas

### Backend

* **Java 17+**
* **Spring Boot 3**
* **Spring Web:** Para a criação dos controllers e da API REST.
* **Spring Data JPA / Hibernate:** Para a camada de persistência de dados.
* **Spring Security:** Para a camada de autenticação e autorização da API.
* **H2 Database:** Banco de dados em arquivo para o ambiente de desenvolvimento.
* **Maven:** Gerenciador de dependências e build.
* **JUnit 5 & Mockito:** Para a suíte de testes unitários.

### Frontend

* **Angular 17+**
* **TypeScript**
* **HTML5 & CSS3**
* **Angular Router:** Para a navegação entre as telas e arquitetura de SPA.
* **Angular `HttpClient`:** Para consumir a API REST do backend.

## 🔒 Segurança

A segurança da API foi implementada com o Spring Security:

* **Autenticação:** Todos os endpoints são protegidos e requerem autenticação via **HTTP Basic Auth**.
* **Criptografia:** Senhas são tratadas com o encoder **BCrypt**.
* **CORS:** Uma configuração de CORS global foi implementada para permitir a comunicação segura entre o frontend (`localhost:4200`) e o backend (`localhost:8080`).

## ⚙️ Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação em seu ambiente local.

### Pré-requisitos

* JDK 17 ou superior instalado.
* Maven 3.8+ configurado nas variáveis de ambiente.
* Node.js 18+ instalado.
* Angular CLI instalado globalmente (`npm install -g @angular/cli`).

### 1. Backend

```bash
# Navegue até a pasta do backend
cd backend

# Execute a aplicação com o Maven Wrapper
./mvnw spring-boot:run
```
O servidor backend estará rodando em `http://localhost:8080`.
Credenciais de acesso: `usuario: admin`, `senha: 12345`.

### 2. Frontend

```bash
# Em um novo terminal, navegue até a pasta do frontend
cd frontend

# Instale as dependências (execute apenas na primeira vez)
npm install

# Inicie o servidor de desenvolvimento
ng serve
```
A aplicação frontend estará acessível em `http://localhost:4200`.