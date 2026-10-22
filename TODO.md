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
- [ ] Modelar tabela de transações no Prisma
- [ ] Criar relacionamento com categorias
- [ ] Implementar CRUD de transações
- [ ] Implementar filtros por período e categoria

### Improvements
- [ ] Implementar validações com Zod
- [ ] Criar middleware global de erros
- [ ] Padronizar respostas HTTP
- [ ] Implementar testes com Vitest

## Frontend

- [ ] Configurar React + TypeScript + Vite
- [ ] Configurar Tailwind CSS + Radix UI
- [ ] Criar layout principal
- [ ] Criar dashboard financeiro
- [ ] Criar gerenciamento de categorias
- [ ] Criar formulário de receitas e despesas
- [ ] Integrar frontend com a API
- [ ] Implementar filtros e gráficos

## Finalização

- [ ] Criar `.env.example`
- [ ] Documentar endpoints no README
- [ ] Adicionar instruções de instalação
- [ ] Configurar deploy
