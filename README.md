# Expense Tracker

**Receitas, despesas e saldo em uma visão simples das suas finanças.**

Aplicação full stack de controle financeiro pessoal, desenvolvida com React, TypeScript, Express e PostgreSQL. O projeto está em desenvolvimento, com foco em código organizado, validação de dados e evolução incremental.

[Funcionalidades](#funcionalidades) · [Tecnologias](#tecnologias) · [Como executar](#como-executar) · [API](#api) · [Próximos passos](#próximos-passos)

## Funcionalidades

| Recurso | Estado atual |
| --- | --- |
| Dashboard com saldo, receitas e despesas | Integrado ao resumo da API |
| Valores em reais e estados de carregamento e erro | Implementados no dashboard |
| CRUD de categorias e transações | Implementado na API |
| Filtros por categoria, tipo e período | Implementados na API |
| Validação de entradas com Zod | Implementada no backend |
| Cadastro de transações pela interface | Modal em construção, ainda sem envio à API |
| Gerenciamento de categorias pela interface | Planejado |
| Autenticação e isolamento por usuário | Ainda não implementados |

## Tecnologias

| Camada | Ferramentas |
| --- | --- |
| Frontend | React, TypeScript e Vite |
| Interface | Tailwind CSS, shadcn/ui, Radix UI e Lucide |
| Backend | Node.js, Express e TypeScript |
| Validação | Zod |
| Persistência | PostgreSQL, Prisma ORM e driver `pg` |
| Qualidade | ESLint no frontend e verificação de tipos com TypeScript |

## Arquitetura

```text
ExpenseTracker/
├── backend/
│   ├── app.ts                 # Aplicação Express e middlewares
│   ├── server.ts              # Inicialização do servidor
│   ├── prisma7.config.ts      # Configuração do Prisma
│   ├── prisma/
│   │   ├── schema.prisma      # Modelos e relacionamento
│   │   └── migrations/        # Histórico do banco
│   └── src/
│       ├── controllers/       # Entrada e resposta HTTP
│       ├── database/          # Conexões com PostgreSQL e Prisma
│       ├── interfaces/        # Tipos de entidades
│       ├── middlewares/       # Tratamento global de erros
│       ├── routes/            # Endpoints
│       ├── schemas/           # Validação com Zod
│       └── services/          # Consultas e regras da aplicação
├── frontend/
│   └── src/
│       ├── components/        # Dashboard, transações e componentes de UI
│       ├── lib/               # Utilitários
│       ├── pages/             # Páginas da aplicação
│       ├── services/          # Comunicação HTTP
│       ├── styles/            # Tokens de cores
│       └── types/             # Contratos do frontend
└── TODO.md                    # Roadmap de desenvolvimento
```

O frontend consulta a API por meio de services HTTP. No backend, as rotas encaminham as requisições aos controllers, que validam os dados e chamam os services. O Prisma realiza as operações no PostgreSQL.

Cada transação pertence a uma categoria. O tipo da categoria (`income` ou `expense`) determina como o valor entra no resumo financeiro:

```text
Saldo = total de receitas − total de despesas
```

**Valores monetários são representados em centavos:** `9990` corresponde a `R$ 99,90`. A conversão para reais acontece na apresentação.

## Como executar

### Pré-requisitos

- Node.js 22.12 ou superior da linha 22, ou Node.js 24 ou superior, conforme os requisitos das dependências instaladas.
- npm e Git.
- PostgreSQL em execução e um banco dedicado ao projeto.

### 1. Obtenha o projeto

```sh
git clone https://github.com/brennoeduardo/ExpenseTracker.git
cd ExpenseTracker
```

### 2. Configure o backend

```sh
cd backend
npm ci
```

Crie `backend/.env` com os dados do seu banco. O exemplo abaixo usa credenciais fictícias:

```dotenv
DATABASE_URL="postgresql://expense_user:change_me@localhost:5432/expense_tracker?schema=public"

DB_HOST=localhost
DB_PORT=5432
DB_USER=expense_user
DB_PASSWORD=change_me
DB_NAME=expense_tracker
```

As duas configurações devem apontar para o mesmo banco: o Prisma usa `DATABASE_URL`, enquanto a verificação de conexão na inicialização usa as variáveis `DB_*`. O usuário e o banco precisam existir antes das migrations. Não versione credenciais reais.

Gere o cliente Prisma e aplique as migrations em um banco novo dedicado ao projeto:

```sh
npx prisma generate --config prisma7.config.ts
npx prisma migrate deploy --config prisma7.config.ts
npm run dev
```

O backend está configurado para `http://localhost:3000`. A geração cria o cliente em `backend/src/generated/prisma`, diretório ignorado pelo Git.

Para um banco preexistente com tabelas do projeto, confira o histórico de migrations antes de aplicá-las; as instruções acima pressupõem um banco novo.

### 3. Inicie o frontend

Em outro terminal, a partir da raiz do repositório:

```sh
cd frontend
npm ci
npm run dev
```

Abra a URL exibida pelo Vite. A consulta do resumo usa atualmente `http://localhost:3000/transactions/summary`, definida em `frontend/src/services/transactionService.ts`.

### Scripts disponíveis

Execute os comandos dentro da pasta correspondente:

| Pasta | Comando | Finalidade |
| --- | --- | --- |
| `backend` | `npm run dev` | Executar o servidor com recarga automática |
| `backend` | `npm run build` | Compilar TypeScript |
| `backend` | `npm start` | Executar `dist/server.js` após um build válido |
| `frontend` | `npm run dev` | Iniciar o Vite |
| `frontend` | `npm run build` | Verificar tipos e gerar o frontend |
| `frontend` | `npm run lint` | Executar ESLint |
| `frontend` | `npm run preview` | Visualizar localmente um build do frontend |

> **Estado do build:** a configuração atual do backend usa `moduleResolution: "node"`, rejeitada pelo TypeScript instalado, e inclui apenas `src`, deixando `app.ts` e `server.ts` fora da compilação. Esses ajustes são necessários para usar `build` e `start`. O frontend também possui pendências de lint e verificação de tipos. Os comandos são documentados conforme os scripts existentes; a preparação para produção ainda está em andamento.

## API

Base local: `http://localhost:3000`. Envie corpos JSON com `Content-Type: application/json`.

| Método | Endpoint | Descrição |
| --- | --- | --- |
| GET | `/health/health` | Status do processo, uptime e timestamp |
| GET | `/categories` | Listar categorias |
| GET | `/categories/:id` | Buscar categoria |
| POST | `/categories` | Criar categoria |
| PUT | `/categories/:id` | Atualizar categoria |
| DELETE | `/categories/:id` | Excluir categoria |
| GET | `/transactions` | Listar e filtrar transações |
| GET | `/transactions/summary` | Consultar receitas, despesas e saldo |
| GET | `/transactions/:id` | Buscar transação |
| POST | `/transactions` | Criar transação |
| PUT | `/transactions/:id` | Atualizar transação |
| DELETE | `/transactions/:id` | Excluir transação |

O caminho duplicado `/health/health` corresponde ao código atual. As rotas `PUT` aceitam atualização parcial, exigindo pelo menos um campo válido.

### Criar uma categoria

`POST /categories`

```json
{
  "name": "Alimentação",
  "type": "expense"
}
```

Use `income` para receitas e `expense` para despesas. O nome aceita de 1 a 100 caracteres após remoção de espaços nas extremidades.

### Criar uma transação

`POST /transactions`

```json
{
  "name": "Supermercado",
  "description": "Compras da semana",
  "amount": 15990,
  "category_id": 1,
  "transaction_date": "2026-10-27"
}
```

Substitua `category_id` pelo ID de uma categoria existente. `amount` deve ser um inteiro positivo em centavos; `name` aceita até 100 caracteres e `description`, até 250. A data é exigida pela validação no formato `YYYY-MM-DD`.

> **Pendência conhecida:** o service de criação ainda não encaminha `transaction_date` ao Prisma. Assim, a data enviada não é persistida nesse fluxo, e o registro pode ficar fora de consultas por período.

### Filtrar e consultar o resumo

Os endpoints `GET /transactions` e `GET /transactions/summary` aceitam os mesmos parâmetros opcionais:

| Parâmetro | Formato | Exemplo |
| --- | --- | --- |
| `category_id` | Inteiro positivo | `1` |
| `type` | `income` ou `expense` | `expense` |
| `start_date` | `YYYY-MM-DD` | `2026-10-01` |
| `end_date` | `YYYY-MM-DD` | `2026-10-31` |

```http
GET /transactions/summary?start_date=2026-10-01&end_date=2026-10-31
```

Exemplo ilustrativo de resposta, com valores em centavos:

```json
{
  "message": "Resumo encontrado com sucesso.",
  "data": {
    "income": 500000,
    "expenses": 175000,
    "balance": 325000
  }
}
```

Os envelopes de resposta ainda não são uniformes entre todos os endpoints: a criação e a atualização de categorias usam a propriedade `category`, enquanto os endpoints de transações usam `data`.

## Próximos passos

- [ ] Corrigir a compilação e consolidar a configuração de ambiente.
- [ ] Persistir a data na criação de transações.
- [ ] Concluir o formulário e atualizar o dashboard após o cadastro.
- [ ] Criar telas de listagem, edição e gerenciamento de categorias.
- [ ] Disponibilizar filtros e gráficos na interface.
- [ ] Padronizar respostas HTTP e reforçar o tratamento de erros.
- [ ] Consolidar os tokens visuais e o tema escuro.
- [ ] Adicionar paginação, testes automatizados e integração contínua.
- [ ] Preparar autenticação e isolamento de dados para uso multiusuário.

Consulte também o [roadmap de desenvolvimento](./TODO.md). Alguns itens desse arquivo ainda precisam ser sincronizados com o estado atual da aplicação.
