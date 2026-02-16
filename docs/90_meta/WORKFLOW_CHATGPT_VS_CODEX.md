# Workflow — ChatGPT vs Codex (regra canônica)

## Regra
- ChatGPT: arquitetura/decisões/checklists + Infra/DevOps (terminal-first: 1 comando por mensagem).
- Codex: implementação em lote (muitos arquivos), refactors, testes; sempre via commits/PRs.

## Ordem padrão
1) Servidor estruturado/seguro/auditado (Fases A–G) guiado por ChatGPT.
2) Depois, construção do app (backend/frontend/scripts) via Codex.

## Sinalização obrigatória
Quando for a hora de usar Codex, o assistente deve emitir exatamente:

# **🚧 HORA DE USAR CODEX**
