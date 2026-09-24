# Backlog do MVP

| Ordem | Funcionalidade | Critérios de aceite |
| --- | --- | --- |
| 1 | Ambiente e base | `docker compose up --build` inicia frontend, backend e PostgreSQL; CI executa lint, build e testes. |
| 2 | Cadastro e login | Usuário pode se registrar, autenticar e acessar apenas seus próprios dados. |
| 3 | Hábitos | Usuário cria, lista, edita e exclui hábitos com nome e frequência. Dados de um usuário não aparecem para outro. |
| 4 | Rotinas | Usuário cria uma rotina e associa hábitos a ela, podendo alterar a ordem e remover associações. |
| 5 | Check-in diário | Usuário marca e desmarca um hábito na data atual; a operação é idempotente. |
| 6 | Visão do dia | Usuário vê os hábitos e rotinas do dia com o estado dos check-ins. |

Fora do MVP: lembretes, metas, gamificação, compartilhamento, notificações e estatísticas avançadas.
