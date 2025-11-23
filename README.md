# 🏦 UFBank - Fintech API

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

> Sistema de gestão para uma Fintech de Pagamentos, focado em aluguel de maquininhas (POS), transações financeiras e controle de taxas.

<br/>

## 📖 Sobre o Projeto

O **UFBank** é um projeto desenvolvido como parte da disciplina de _Laboratório de Programação I_.  
O objetivo é simular o Back-End de uma empresa de pagamentos (similar a **Stone** ou **PagSeguro**), gerenciando desde o cadastro de clientes até o cálculo de taxas e empréstimos.

O diferencial técnico do projeto é a aplicação rigorosa de **Clean Architecture** com **NestJS**, garantindo desacoplamento entre regras de negócio (Use Cases) e mecanismos externos (Controllers/Framework).

<br/>

## 🚀 Tecnologias Utilizadas

- **Linguagem:** TypeScript  
- **Framework:** NestJS  
- **Arquitetura:** Clean Architecture (Modular Monolith)  
- **Validação:** Class-Validator & Class-Transformer  
- **Containerização:** Docker & Kubernetes (K8s)  
- **Banco de Dados:** Em memória (simulação), preparado para PostgreSQL

<br/>

## ✨ Funcionalidades Principais

### **1. Gestão de Identidade (Users)**

- Cadastro de usuários com validação de CPF/CNPJ e e-mail únicos  
- Diferenciação de perfis via **Roles**:
  - **ADMIN** — Funcionários do banco  
  - **CLIENT** — Comerciantes / donos de estabelecimento  

### **2. Gestão de Ativos (Maquininhas)**

- Cadastro de maquininhas (POS) com verificação de **serial number único**  
- Associação de maquininhas a clientes  
- Regra de negócio:
  - **Usuários ADMIN não podem operar maquininhas** (apenas CLIENT)  

### **3. Configuração de Taxas** *(Em desenvolvimento 🚧)*

- Definição de taxas personalizadas por maquininha  
- Taxas de débito/crédito  
- Preparado para cálculo dinâmico por transação

<br/>

## 📦 Como Rodar o Projeto

### **Pré-requisitos**
- Node.js **v18+**  
- NPM  

### **1. Clone o repositório**

```
git clone https://github.com/seu-usuario/ufbank.git
cd ufbank
```

### **2. Instale as dependências**
```npm install```

### **3. Execute a aplicação**
```
# Modo de desenvolvimento com Hot Reload
npm run start:dev
```

A API estará disponível em:
➡️ http://localhost:3000

<br/>

## 🧪 Exemplos de Requisição
### Criar Usuário (Cliente)
### POST /users
```
{
  "nome": "Maria da Padaria",
  "email": "maria@loja.com",
  "cpfCnpj": "12345678900",
  "role": "CLIENT"
}
```

### Criar Maquininha (Vinculada)
### POST /maquininhas
```
{
  "codigoSerial": "SN123456",
  "modelo": "Smart POS",
  "status": "ATIVA",
  "clienteId": 1
}
```

<br/>

## 👤 Autores do Projeto

- Alexandre Coelho Batista dos Santos
- Larissa Conrado de Figueiredo
- Letícia Menezes Costa
- Lorena Roberta Nascimento dos Santos
- Rafael Luis Caldas Vaz
