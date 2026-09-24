# Habitus Vitae

Aplicação para acompanhar hábitos e rotinas pessoais. O MVP permite cadastro, criação de hábitos, organização em rotinas e check-ins diários.

Ficam fora do MVP: notificações, metas, estatísticas avançadas, integrações externas e recursos sociais.

## Stack e arquitetura

- Frontend: React, TypeScript e Vite (`frontend/`)
- Backend: PHP 8.4 e Laravel 12 (`backend/`)
- Banco: PostgreSQL 16
- Ambiente local: Docker Compose

É um monólito modular: a SPA React consome a API Laravel, que acessa o PostgreSQL. Veja a [arquitetura](docs/arquitetura.md).

## Pré-requisitos

- Docker Engine com Docker Compose v2
- Node.js 22+ e npm (comandos locais do frontend)
- PHP 8.4.1+ e Composer 2 (comandos locais do backend)

## Subir com Docker

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- PostgreSQL: `localhost:5432` (`habitus` / `habitus`)

```bash
docker compose down
```

## Teste, lint e build

```bash
cd frontend && npm ci && npm run lint && npm run build
cd backend && composer install && ./vendor/bin/pint --test && composer test
```

## Documentação

- [Arquitetura](docs/arquitetura.md)
- [Backlog do MVP](docs/backlog-mvp.md)
- [Como contribuir](docs/contribuindo.md)
- [Decisões de arquitetura](docs/decisoes/)

## Branches e pull requests

- `main`: sempre estável e potencialmente publicável.
- `feat/nome-da-funcionalidade`: novas funcionalidades.
- `fix/descricao-do-bug`: correções de bugs.
- `chore/descricao-da-tarefa`: manutenção, documentação e ferramentas.

Abra PRs para `main` usando o template. Cada PR deve explicar como foi testado e atualizar documentação quando mudar comportamento, API ou decisão técnica.
