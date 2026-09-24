# ADR 001: autenticação pela API Laravel

- **Status:** aceita
- **Contexto:** o MVP precisa identificar usuários para isolar hábitos, rotinas e check-ins.
- **Decisão:** usar o mecanismo de autenticação suportado pelo Laravel para a API, com rotas protegidas por middleware. A implementação concreta será adicionada com o fluxo de cadastro e login.
- **Consequência:** não há provedor externo nem camada própria de tokens antes da necessidade real; clientes usam somente endpoints versionados da API.
