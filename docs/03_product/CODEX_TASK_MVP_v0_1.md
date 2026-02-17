# CODEX TASK — MVP v0.1 (appsicologa.cl)
TS_LOCAL: 2026-02-17T11:06:03-03:00
TS_UTC: 2026-02-17T14:06:03+00:00

## Fonte de verdade (ordem)
1) docs/00_maestro/appsicologa_cl_documento_maestro_v1_2c_publico_reestructurado.pdf
2) docs/01_playbook/appsicologa_playbook_v1.md
3) docs/03_product/MVP_v0_1.md
4) docs/02_branding/brend.md

## Objetivo
Gerar o **esqueleto do produto** (monorepo) para iniciar o MVP v0.1:
- Web pública (Next.js) + API (NestJS) + Shared (types/schemas)
- Contrato **OpenAPI-first**
- Dados em Postgres/PostGIS via Prisma
- Preparar terreno para: diretório, perfis, verificação, agenda, chat, feed

## Regras
- OSS-first.
- Nada de segredos no git (usar .env.example).
- Logs sem PII/PHI.
- Estrutura modular por domínio (auth/users/professionals/verification/search/appointments/chat/feed/media/admin/audit).

## Deliverables (arquivos + pastas)
Criar estrutura:
- apps/
  - api/   (NestJS TS)
  - web/   (Next.js TS)
- packages/
  - shared/ (schemas Zod + types)
- openapi/
  - appsicologa.openapi.yaml (v1)
- infra/dev/ (já existe) — manter compatível
- README.md atualizado com comandos dev

### 1) Workspace / Monorepo
Escolher **pnpm workspaces** (preferência) ou npm workspaces (se quiser reduzir dependência).
Criar:
- package.json (root) + workspace config
- scripts básicos: lint/test/dev/build
- padrões: TypeScript strict, eslint/prettier (mínimo)

### 2) apps/api (NestJS)
- Setup NestJS com:
  - /v1/health (200)
  - Swagger/OpenAPI exposto em /docs (somente em dev)
  - Config via env (DATABASE_URL etc.)
- Prisma:
  - schema mínimo alinhado ao MVP_v0_1 (users, professional_profiles, verification_requests/evidence, posts, questions/answers, appointments, conversations/messages, media_objects, reports, audit_events)
  - migração inicial
- Auth (skeleton):
  - endpoints placeholder (/v1/auth/...) sem depender de provedor externo ainda
  - guards/stubs + roles

### 3) apps/web (Next.js)
Páginas públicas SSR/SSG simples:
- / (landing do produto)
- /profesionales (listagem)
- /profesionales/[slug] (perfil público)
Conectar com API (fetch client simples).
Manter SEO básico (title/description/canonical).

### 4) packages/shared
- Zod schemas para DTOs principais (User, ProfessionalProfile, VerificationRequest, Appointment, Message)
- Tipos exportados para web/api

### 5) OpenAPI-first
- Criar openapi/appsicologa.openapi.yaml com:
  - /v1/health
  - /v1/professionals (list/get by slug)
  - /v1/verification (submit + admin approve/reject) — pode ser stub
  - /v1/appointments (slots/book/cancel) — stub inicial
  - /v1/chat (conversations/messages) — stub inicial

## Critério de OK (para esse batch)
- Repo compila localmente (sem rodar docker): typescript ok
- Compose dev existente continua válido (infra/dev)
- Prisma schema + migração inicial criados
- /v1/health responde e Swagger abre em dev
- Web renderiza 3 rotas públicas

## Entrega
Fazer commits pequenos (por pacote) ou 1 commit grande se inevitável, mas preferir 2–4 commits.
