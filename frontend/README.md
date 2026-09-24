# Habitus Vitae — Frontend

App de tracker de hábitos.

## Como rodar localmente

Este projeto roda inteiramente via Docker — não é necessário instalar Node, PHP ou Postgres na sua máquina.

1. Tenha o Docker Desktop instalado e aberto
2. Na **raiz do repositório** (`habitus-vitae/`, um nível acima desta pasta `frontend`), suba os containers:
   \`\`\`bash
   docker compose up -d
   \`\`\`
3. Acesse o frontend em `http://localhost:5173`

## Comandos do dia a dia

Sempre execute comandos que envolvam dependências (instalar pacotes, rodar scripts) **dentro do container**, nunca direto na máquina/VM:

\`\`\`bash
docker compose exec frontend npm install # instalar dependências
docker compose exec frontend npm install <pacote> # adicionar uma nova dependência
docker compose logs frontend # ver os logs do frontend
docker compose ps # ver o status dos containers
docker compose down # parar tudo
\`\`\`

## Variáveis de ambiente

Copie o arquivo de exemplo e preencha os valores necessários:
\`\`\`bash
cp .env.example .env
\`\`\`

## Estrutura de pastas

- \`src/components\` — componentes reutilizáveis, sem regra de negócio
- \`src/features\` — cada pasta representa uma funcionalidade do sistema:
  - \`auth\` — autenticação (login, cadastro)
  - \`habits\` — criação e gerenciamento de hábitos
  - \`dashboard\` — visão geral e progresso do usuário
  - \`checkins\` — registros diários de conclusão dos hábitos
- \`src/routes\` — configuração das rotas da aplicação
