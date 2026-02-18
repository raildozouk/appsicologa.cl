# ADR-0001 — LLM local via Ollama como fallback de IA
**TS_LOCAL:** 2026-02-18T15:07:06.668243-03:00  
**TS_UTC:** 2026-02-18T18:07:06.668306Z  
**Status:** Accepted  
**Decisores:** Raildo + Assistente (CTO)

## Contexto
- Precisamos de um “copiloto” no terminal para manter continuidade do projeto (prompt + estado).
- A OpenAI API retornou `HTTP 429 insufficient_quota` (sem quota/crédito disponível).
- O projeto segue OSS-first e execução incremental.

## Decisão
Adotar **Ollama** rodando localmente (host `127.0.0.1:11434`) com modelo padrão **qwen2.5:7b** (CPU) como fallback para:
- gerar “próximo passo mínimo (1 comando)”
- manter continuidade por conversa em `var/ai_cli/<conv>.json`
- injetar contexto do repo via `docs/PROJECT_STATE.md`

Ferramenta de execução:
- `bin/oaichat_local` (wrapper bash) chamando `ollama run` e salvando `summary` no state.

## Alternativas consideradas
1) **OpenAI API direta** (Responses API)
   - Prós: melhor qualidade; suporte a modelos grandes; consistência.
   - Contras: depende de billing/quota; risco de interrupção por limites/custos.
2) **Stub local (respostas simuladas)**
   - Prós: zero custo; previsível.
   - Contras: não ajuda no raciocínio; baixa utilidade real.
3) **Outros runners OSS** (ex.: llama.cpp direto)
   - Prós: controle fino; pode ser mais leve.
   - Contras: mais complexidade operacional do que Ollama agora.

## Trade-offs
- **Qualidade**: inferior a modelos cloud; risco de alucinação → mitigado por contexto canônico (PROJECT_STATE) e regra “1 comando”.
- **Performance**: CPU-only pode ser lento em modelos 7B → mitigado usando modelo menor (qwen2.5:3b) quando necessário.
- **Privacidade**: excelente (dados ficam local) → manter regra de não incluir PII/PHI nos prompts.

## Implicações de segurança e privacidade
- Não enviar segredos (keys, tokens) ao modelo.
- Não colocar PII/PHI em prompts.
- State `var/ai_cli/` contém resumo textual: deve ficar fora do git.

## Consequências / Próximos passos
- Manter `bin/oaichat_local` como ferramenta oficial enquanto OpenAI API estiver sem quota.
- Quando billing/quota estiver OK, reavaliar e possivelmente voltar a OpenAI API com fallback local.
