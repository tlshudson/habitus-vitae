# ADR 002: monólito modular

- **Status:** aceita
- **Contexto:** hábitos, rotinas e check-ins são partes do mesmo produto e compartilham dados e implantação.
- **Decisão:** manter um único backend Laravel e organizar o código por módulo de negócio conforme ele for criado.
- **Consequência:** implantação e transações permanecem simples. Serviços separados só serão considerados com uma necessidade operacional mensurável.
