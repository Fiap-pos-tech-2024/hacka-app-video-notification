# Notificação por E-mail

Microsserviço responsável por enviar notificações por e-mail em caso de sucesso ou erro em operações de outros microsserviços.

## ✨ Resumo

Este projeto é uma API RESTful que oferece as seguintes funcionalidades:

- **Notificação de Sucesso**: Envia um e-mail informando que uma operação foi realizada com sucesso.
- **Notificação de Erro**: Envia um e-mail informando que ocorreu um erro em uma operação.

As notificações são enviadas via SMTP, com configuração flexível por variáveis de ambiente.

## 📁 Arquitetura

Este projeto segue a arquitetura hexagonal (Ports and Adapters), promovendo separação de responsabilidades e facilidade de manutenção. Abaixo está a estrutura principal de pastas e suas responsabilidades:

```
├── src/
│   ├── core/
│   │   ├── application/ # Casos de uso e lógica de negócio (core da aplicação)
│   │   └── domain/      # Entidades e regras de domínio
│   │
│   └── adapter/
│       ├── driver/      # Adaptadores de entrada (ex: controllers, rotas HTTP)
│       └── driven/      # Adaptadores de saída (ex: gateways para e-mail, fila)
```

## ✅ Qualidade

- **Linting**: Utilização do ESLint para manter o código limpo e consistente.
- **Testes unitários:** Cobertura total das linhas, funções e branches do código, validada com Jest.
- **Testes de mutação:** Todos os mutantes gerados foram eliminados (killed), assegurando alta confiabilidade do código.

> **O que são testes mutantes?**
> Testes de mutação consistem em modificar propositalmente pequenos trechos do código (criando "mutantes") para verificar se os testes existentes conseguem detectar esses erros. Se todos os mutantes são "mortos" (ou seja, detectados pelos testes), isso indica que a suíte de testes é realmente eficaz na validação do comportamento do sistema.

### 🧪 Testes

```bash
# Testes unitários
npm test

# Testes de mutação
npm run test:mutations
```

## 📌 Endpoints

`POST /api/notify/success` — Envia notificação de sucesso por e-mail

`POST /api/notify/error` — Envia notificação de erro por e-mail

A documentação completa dos endpoints está disponível via Swagger em `/docs`.

## 🛠️ Comandos

### 🚀 Execução local

```bash
# 1. Clone o repositório
git clone https://github.com/Fiap-pos-tech-2024/hacka-app-video-notification.git
cd hacka-app-video-notification

# 2. Gere o arquivo .env com as variáveis de ambiente necessárias
cp .env.example .env

# 3. Instale as dependências
npm install

# 4. Inicie a aplicação em modo desenvolvimento
npm run dev
```

### 🚀 Execução com Docker Compose

```bash
# 1. Gere o arquivo .env adequado para docker-compose
cp .env.example .env

# 2. Suba o serviço
docker-compose up --build
```

A aplicação estará disponível em 🌐 [http://localhost:3000/docs](http://localhost:3000/docs)

### 🛑 Parando os serviços

```bash
# Irá parar todos os containers do Docker
docker-compose down
```

## Tecnologias Utilizadas

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat-square)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=flat-square)
![Nodemailer](https://img.shields.io/badge/Nodemailer-yellow?logo=maildotru&logoColor=white&style=flat-square)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=flat-square)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white&style=flat-square)
