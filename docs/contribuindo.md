# Contribuindo

## Fluxo

1. Atualize `main` e crie uma branch: `feat/`, `fix/` ou `chore/`.
2. Faça uma mudança pequena e focada.
3. Execute os comandos aplicáveis antes do PR.
4. Abra o PR para `main` usando o template e responda aos comentários de revisão.

```bash
cd frontend && npm ci && npm run lint && npm run build
cd backend && composer install && ./vendor/bin/pint --test && composer test
```

## Definição de pronto

Uma entrega está pronta quando cumpre os critérios de aceite, tem testes proporcionais à mudança, passa lint e build aplicáveis, não inclui segredos nem arquivos gerados e atualiza a documentação, migrations e contrato de API quando necessário.
