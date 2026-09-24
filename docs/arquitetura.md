# Arquitetura

## Visão geral

O Habitus Vitae é um monólito modular para acompanhamento de hábitos e rotinas. A SPA em React consome uma API JSON Laravel; o backend é a única camada que acessa o PostgreSQL.

```text
React/Vite (frontend) -> API Laravel (backend) -> PostgreSQL
```

No ambiente local, os três processos são iniciados pelo Docker Compose. Frontend e backend têm volumes montados para desenvolvimento; o banco usa o volume nomeado `postgres_data`.

## Organização

```text
frontend/             SPA React, páginas e componentes
backend/app/          domínio e aplicação Laravel
backend/routes/       rotas HTTP e de console
backend/database/     migrations, factories e seeders
backend/tests/        testes PHPUnit/Laravel
docker/               imagens de desenvolvimento
docs/                 decisões e processo do projeto
```

À medida que o domínio crescer, o backend será agrupado por módulos de negócio, como `Auth`, `Habits`, `Routines` e `Checkins`, mantendo controllers, validações e regras próximas ao caso de uso. Não há microserviços no MVP.

## API

- Prefixo: `/api/v1`.
- JSON em todas as respostas de API.
- Rotas protegidas exigem autenticação.
- Validação acontece em `FormRequest`; regras de negócio ficam no módulo do caso de uso.
- Recursos retornam os dados públicos; erros de validação seguem o padrão do Laravel.

Os contratos e endpoints serão documentados junto de cada implementação. Mudanças incompatíveis exigem uma nova versão de API.

## Dados e limites

O PostgreSQL armazena usuários, hábitos, rotinas e check-ins. Migrations são a fonte de verdade do esquema. Os testes usam SQLite em memória, configurado em `backend/phpunit.xml`.

O MVP não inclui Redis, filas, scheduler, notificações, metas ou estatísticas avançadas. Esses componentes só entram quando uma funcionalidade aprovada exigir processamento assíncrono ou cache.

## Decisões

- [Autenticação](decisoes/001-autenticacao.md)
- [Organização dos módulos](decisoes/002-modulos.md)
- [Padrão da API](decisoes/003-padrao-api.md)
