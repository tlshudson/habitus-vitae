# ADR 003: API REST JSON versionada

- **Status:** aceita
- **Contexto:** o frontend precisa de um contrato estável para consumir o backend.
- **Decisão:** expor recursos REST em JSON sob `/api/v1`, usar códigos HTTP adequados, `FormRequest` para validação e Resources Laravel para respostas quando necessários.
- **Consequência:** mudanças incompatíveis entram em uma versão nova; a SPA não acessa o banco diretamente.
