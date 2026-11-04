# ExpenseTracker — Development Roadmap

## Backend

### Setup
- [x] Configurar Node.js + Express + TypeScript
- [x] Configurar PostgreSQL
- [x] Integrar Prisma ORM
- [x] Organizar arquitetura em Routes, Controllers e Services

### Categories
- [x] GET /categories
- [x] GET /categories/:id
- [x] POST /categories
- [x] PUT /categories/:id
- [x] DELETE /categories/:id

### Transactions
- [x] Modelar tabela de transações no Prisma
- [x] Criar relacionamento com categorias
- [x] Implementar CRUD de transações
- [x] Implementar filtros por período e categoria

### Improvements
- [x] Implementar validações com Zod
- [x] Criar middleware global de erros
- [ ] Padronizar respostas HTTP
- [ ] Implementar testes com Vitest

## Frontend

- [x] Configurar React + TypeScript + Vite
- [x] Configurar Tailwind CSS + Radix UI
- [x] Criar layout principal
- [x] Criar dashboard financeiro
- [ ] Criar gerenciamento de categorias
- [ ] Criar formulário de receitas e despesas
- [x] Integrar frontend com a API
- [ ] Implementar filtros e gráficos
- [ ] Criar tratamento de erros retornados do ZOD

## Finalização

- [ ] Criar `.env.example`
- [ ] Documentar endpoints no README
- [ ] Adicionar instruções de instalação
- [ ] Configurar deploy
