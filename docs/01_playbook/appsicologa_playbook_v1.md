# appsicologa.cl — Playbook Técnico Completo (v1.0)
**Timestamp (UTC): 2026-02-16 02:13:01Z**  
**Escopo:** Web (Next.js PWA) + Mobile (React Native/Expo) + Backend (NestJS) + Dados (Postgres/PostGIS, MeiliSearch, MinIO, Redis) + Observabilidade (Prometheus/Grafana/Loki/Sentry) + Segurança (OWASP, AuthN/Z, Privacy-by-Design)  
**Objetivo:** servir como “documento-mãe” para guiar implementação, decisões e padrões do produto do início ao deploy.

> Nota importante (direitos autorais): este documento NÃO replica o texto integral das documentações/ livros/ especificações citadas. Ele é uma síntese autoral e um guia de execução, com links oficiais para consulta.

---

## O que estamos construindo agora
Um marketplace + rede social profissional focado em psicologia/saúde mental (Chile), com:
- **Diretório de profissionais** (mapa + filtros + busca)
- **Perfis** (credenciais, especialidades, agenda, mídias)
- **Feed** (conteúdo + discovery)
- **Chat** (tempo real, com moderação básica)
- **Onboarding e verificação** (documentos/credenciais; opcional KYC)
- **Privacidade first** + observabilidade + SLOs

---

## Sumário
1. Princípios e trade-offs (performance, SEO, privacidade)  
2. Arquitetura macro e contratos (OpenAPI-first)  
3. Web (Next.js PWA) e UI system (Tailwind + shadcn/ui + Storybook)  
4. Mobile (Expo)  
5. Backend (NestJS + TypeScript) e padrões de módulo  
6. Dados (Postgres/PostGIS + Prisma)  
7. Busca e feed (MeiliSearch) + cache (Redis)  
8. Mídias (MinIO S3)  
9. Tempo real (Socket.io)  
10. Auth, sessão, tokens e hashing (Passport + OAuth + JWT + Argon2)  
11. Autorização (Casbin RBAC/ABAC)  
12. Verificação de identidade/credenciais + Privacy by Design  
13. Observabilidade (Prometheus/Grafana/Loki) + erros (Sentry)  
14. Infra (Linux/Ubuntu, Nginx, Docker/Compose, systemd, firewall, SSL)  
15. CI/CD + versionamento (Git/GitHub, GitLab CI, SemVer)  
16. Python (automação/IA) com FastAPI, pandas, scikit-learn, Celery  
17. Legado PHP/MySQL (quando faz sentido)  
18. Mapas e geolocalização (MapLibre/OSM, Nominatim, Turf, GeoJSON)  
19. APIs e integrações extras (Twilio, SendGrid, Mercado Pago, Cloudflare etc.)  
20. Checklists de entrega (MVP → Beta → Produção)  
21. Apêndice: links oficiais por stack + ordem de estudo

---

# 1) Princípios e trade-offs

## 1.1 Performance e SEO (Web)
- **SSR/SSG onde faz sentido**: páginas públicas indexáveis (home, categorias, perfis públicos) com renderização adequada.
- **Ações autenticadas**: podem ser client-side com caching e fallback.
- **PWA**: útil para “quase-app” e retenção; não substitui app nativo em tudo.

**Trade-offs:**
- Mais SSR = melhor SEO, mas pode aumentar carga no backend.
- Mais client-side = UX dinâmica, mas SEO exige pré-render.

## 1.2 Privacidade-first
Use Privacy by Design como “regra de arquitetura”:
- Coletar **o mínimo necessário** por padrão.
- Criptografar em trânsito (TLS) e proteger dados em repouso.
- Auditoria e rastreabilidade (logs, consentimento, eventos).

## 1.3 Segurança como requisito funcional
Mapeie features para OWASP Top 10:
- XSS/CSRF, auth forte, rate-limit, validação de input, logging, secrets, etc.

---

# 2) Arquitetura macro e contratos (OpenAPI-first)

## 2.1 Visão de componentes
- **Web**: Next.js (PWA) + Tailwind + shadcn/ui + Storybook
- **Mobile**: Expo (React Native)
- **Backend**: NestJS (API) + OpenAPI 3.1 (contratos)
- **DB**: PostgreSQL + PostGIS (geoespacial)
- **Search**: MeiliSearch (full-text/filters)
- **Cache**: Redis
- **Object storage**: MinIO (S3)
- **Realtime**: Socket.io (chat/presença)
- **Observability**: Prometheus + Grafana + Loki (+ Sentry para erros)

## 2.2 Contrato primeiro (OpenAPI)
**Objetivo:** o contrato vira “fonte da verdade” para:
- validação (request/response)
- geração de SDK (web/mobile)
- documentação (Swagger UI / Redoc)
- testes de contrato

**Padrão recomendado:**
- `openapi/` com `appsicologa.openapi.yaml`
- versionamento em `info.version` + path `/v1/...`
- “breaking changes” só em `/v2`

---

# 3) Web (Next.js PWA) + UI System

## 3.1 Estrutura de rotas e SEO
- Rotas públicas indexáveis:
  - `/` home
  - `/profissionais` listagem
  - `/profissionais/[slug]` perfil público
  - `/especialidades/[slug]`
  - `/cidades/[slug]` etc.
- Rotas privadas:
  - `/app/*` (dashboard, chat, configurações)
- Metatags e OG: título, descrição, imagens.

## 3.2 PWA (web.dev)
- `manifest.json`
- ícones e splash
- service worker (cache inteligente)
- offline “degrada com graça” (ex.: ler perfis já visitados)

## 3.3 Tailwind + shadcn/ui + Storybook
- Tailwind para tokens e utilitários.
- shadcn/ui para componentes consistentes.
- Storybook para catálogo e “contrato visual”.

**Regras do design system**
- Tipografia e espaçamento consistentes
- Estados: loading/empty/error
- A11y: teclado, foco, contraste, aria

---

# 4) Mobile (Expo)

## 4.1 Por que Expo
- 1 codebase (iOS/Android/web) e tooling maduro.
- Push notifications e deploy com EAS quando necessário.

## 4.2 Estrutura recomendada
- Monorepo: `apps/web`, `apps/mobile`, `apps/api`, `packages/shared`
- `packages/shared` com: schemas (Zod), types, API client, design tokens

---

# 5) Backend (NestJS + Node + TypeScript)

## 5.1 Padrão de módulos (NestJS)
Crie módulos por domínio:
- `auth`, `users`, `professionals`, `search`, `feed`, `chat`, `media`, `admin`, `audit`

Cada módulo:
- controller (HTTP)
- service (regra)
- repository (Prisma)
- DTOs (contrato)
- guards (authz)

## 5.2 TypeScript: padrão “strict”
- `strict: true`
- sem `any`
- tipos no shared package
- validação runtime com Zod

---

# 6) Dados (PostgreSQL + PostGIS) + Prisma

## 6.1 Modelagem mínima (MVP)
Entidades:
- `User` (conta)
- `ProfessionalProfile` (bio, especialidades, preço, idiomas)
- `Credential` (registro, status, evidência)
- `Location` (ponto, cidade, cobertura)
- `Post` (feed)
- `Conversation`, `Message` (chat)
- `MediaObject` (arquivos)
- `AuditEvent` (auditoria)

## 6.2 Geoespacial (PostGIS)
- `geography(Point, 4326)` para coordenadas
- índice GiST
- consultas por raio (ex.: 5km, 10km)
- filtros por bounding box para mapa

---

# 7) Busca e Feed (MeiliSearch) + Cache (Redis)

## 7.1 MeiliSearch
Use para:
- busca de profissionais por nome/especialidade/cidade
- filtros por atributos (idioma, faixa de preço, modalidade)
- ordenação por relevância + sinais (ex.: “verificado”)

**Pipeline**
- DB (Postgres) é fonte da verdade
- job de sincronização: upsert em Meili
- reindex incremental por eventos (ex.: perfil atualizado)

## 7.2 Redis
Use para:
- cache de listagens públicas (TTL curto)
- rate-limit (login, busca)
- sessões curtas ou blacklist de tokens (se usar)

---

# 8) Mídias (MinIO S3)

## 8.1 Objetos e segurança
- Upload com URL pré-assinada (backend gera)
- Tipos: avatar, documentos de credencial, imagens de post
- ACL: nunca “public by default”; use URLs expiradas quando possível

## 8.2 Processamento
- (Opcional) pipeline de thumbnail/compressão
- verificação de MIME + tamanho
- antivírus (opcional em beta/produção)

---

# 9) Tempo real (Socket.io)

## 9.1 Chat
- namespaces/rooms por conversa
- eventos: typing, delivered, read, presence
- persistência de mensagens no Postgres

## 9.2 Moderação básica (MVP)
- rate-limit por usuário
- filtros para spam
- “report” e “block” no modelo

---

# 10) AuthN (Passport) + OAuth + JWT + Argon2

## 10.1 Fluxo recomendado
- Registro com email/telefone (decidir)
- Login com senha + Argon2
- Sessão stateless com JWT (curto) + refresh token (rotacionado)
- Social login via Google Identity Services (opcional)

## 10.2 Segurança de senha
- Argon2id com parâmetros adequados (tempo/memória)
- Proteção contra brute-force: rate-limit + lock temporário
- Reset de senha com token curto e one-time

---

# 11) Autorização (Casbin ABAC/RBAC)

## 11.1 Modelo (exemplo)
- RBAC: roles `user`, `professional`, `admin`
- ABAC: atributos (verificado, região, flags)

Casbin permite combinar RBAC + ABAC com regras centralizadas.

---

# 12) Verificação de identidade/credenciais + Privacy by Design

## 12.1 Níveis de verificação
- Nível 0: email/telefone confirmado
- Nível 1: credencial “auto-declarada” + evidências (upload)
- Nível 2: verificação manual (backoffice)
- Nível 3: provedor externo KYC (Stripe Identity, Sumsub) — se necessário

## 12.2 Privacidade by Design (implementação prática)
- Minimização: só guardar o essencial
- Retenção: deletar evidências após validação (se possível)
- Transparência: logs de acesso e consentimento
- Segurança ponta-a-ponta: TLS + segregação de dados + auditoria

---

# 13) Observabilidade (Prometheus/Grafana/Loki) + Sentry

## 13.1 Métricas (Prometheus)
- latência p95/p99 por endpoint
- taxa de erro (4xx/5xx)
- throughput
- filas/jobs
- recursos infra (CPU/RAM/Disk)

## 13.2 Logs (Loki)
- correlação por `request_id`, `user_id`, `trace_id`
- mascaramento de PII em logs
- retenção e custo

## 13.3 Erros (Sentry)
- captura de exceptions em web/mobile/api
- releases e sourcemaps
- alertas por regressão

---

# 14) Infra (Linux/Ubuntu, Nginx, Docker/Compose, systemd, firewall, SSL)

## 14.1 Reverse proxy (Nginx)
- TLS termination
- proxy para API e web
- headers de segurança
- rate-limit básico

## 14.2 Containers (Docker/Compose)
- Postgres/PostGIS
- Redis
- MeiliSearch
- MinIO
- Prometheus/Grafana/Loki

## 14.3 systemd + hardening
- serviços críticos (api, workers, tunnel)
- restart policies
- logs via journalctl

## 14.4 Firewall e SSH
- UFW/iptables: só portas necessárias
- SSH com chaves, sem senha, sem root login
- fail2ban (recomendado)

## 14.5 SSL (Let's Encrypt)
- certificados automáticos (renovação)
- HSTS (avaliar)

---

# 15) CI/CD + Versionamento (Git/GitHub, GitLab CI, SemVer)

## 15.1 Git: fluxo
- trunk-based ou GitFlow leve
- PR obrigatório com checks
- tags por versão

## 15.2 SemVer
- PATCH: bugfix
- MINOR: feature compatível
- MAJOR: breaking change

## 15.3 Pipeline (GitLab CI ou GitHub Actions)
- lint + typecheck
- testes unitários (Jest/pytest/phpunit)
- build
- deploy (staging → produção)
- migrations controladas

---

# 16) Python (automação e IA)

## 16.1 Onde Python entra bem
- ETL de dados (pandas)
- relatórios internos
- recomendação simples (scikit-learn)
- microserviços rápidos (FastAPI)
- jobs assíncronos (Celery)

## 16.2 Recomendação (MVP)
- conteúdo: “profissionais semelhantes”
- features: cidade, especialidade, modalidade, preço
- modelo: baseline com embeddings/TF-IDF + re-ranking simples (sem overkill)

---

# 17) Legado PHP/MySQL (quando faz sentido)

Use PHP/WordPress se:
- blog marketing rápido (SEO de conteúdo)
- equipe já domina
- necessidade de CMS imediato

**Regra:** isolar do core transacional.  
Evitar acoplar autenticação e dados sensíveis no WordPress sem hardening.

---

# 18) Mapas e Geolocalização

## 18.1 Stack OSS
- MapLibre GL JS (mapa vetorial)
- dados: OpenStreetMap
- geocoding: Nominatim
- análises: Turf.js (distância, buffers)
- formatos: GeoJSON

## 18.2 Cuidados
- cache de geocoding (rate limits)
- normalização de endereços
- privacidade: não expor endereço exato se não for necessário (usar área/raio)

---

# 19) APIs e integrações extras (opcionais)
- **Twilio**: SMS/WhatsApp (notificações)
- **SendGrid**: email transacional
- **Mercado Pago**: pagamentos (se aplicável)
- **Cloudflare**: DNS/WAF/Cache
- **Kubernetes/Terraform**: quando escalar e padronizar infra

---

# 20) Checklists de entrega

## 20.1 MVP (4–8 semanas)
- [ ] OpenAPI v1 (auth, perfil, listagem, busca)
- [ ] DB + Prisma + migrations
- [ ] Next.js: landing + listagem + perfil público
- [ ] Meili: index de profissionais
- [ ] MinIO: upload de avatar + docs
- [ ] Auth básico + Argon2
- [ ] Observabilidade mínima (logs + healthcheck)
**OK:** usuário encontra profissional e abre perfil público; profissional cria perfil e aparece no mapa/busca.

## 20.2 Beta (8–12 semanas)
- [ ] Mobile (Expo) com login e perfil
- [ ] Chat (Socket.io)
- [ ] Verificação Nível 2 (manual)
- [ ] Prometheus/Grafana/Loki
- [ ] Sentry em web/mobile/api
**OK:** chat funciona, verificação funciona, dashboards e alertas básicos.

## 20.3 Produção
- [ ] Hardening infra (UFW/SSH/segredos/backup)
- [ ] DR/Backups e restore testado
- [ ] SLOs definidos + alertas
- [ ] Revisão OWASP + pentest leve
**OK:** deploy repetível, rollback, métricas, incident response.

---

# 21) Apêndice — Links oficiais por stack (sua lista)

## Núcleo (NestJS/Node/OpenAPI/TS)
- NestJS Docs: https://docs.nestjs.com/
- Node.js Docs (v20+): https://nodejs.org/en/docs/
- OpenAPI 3.1: https://spec.openapis.org/oas/v3.1.0.html
- OpenAPI (Swagger spec): https://swagger.io/specification/
- TypeScript Deep Dive: https://basarat.gitbook.io/typescript/
- Prisma: https://www.prisma.io/docs
- Axios: https://axios-http.com/docs/intro
- Zod: https://zod.dev/
- Jest: https://jestjs.io/docs/getting-started
- Passport.js: https://www.passportjs.org/docs/
- Socket.io: https://socket.io/docs/v4/

## Python
- Python tutorial: https://docs.python.org/3/tutorial/
- FastAPI: https://fastapi.tiangolo.com/
- pandas: https://pandas.pydata.org/docs/
- scikit-learn: https://scikit-learn.org/stable/
- pytest: https://docs.pytest.org/
- Flask: https://flask.palletsprojects.com/
- SQLAlchemy: https://docs.sqlalchemy.org/
- Django: https://docs.djangoproject.com/
- Requests: https://requests.readthedocs.io/
- Celery: https://docs.celeryq.dev/

## Linux & SysAdmin
- The Linux Command Line (TLCL): https://linuxcommand.org/tlcl.php
- Ubuntu Server Guide: https://ubuntu.com/server/docs
- Nginx docs: https://nginx.org/en/docs/
- Docker docs: https://docs.docker.com/
- Docker Compose: https://docs.docker.com/compose/
- Bash manual: https://www.gnu.org/software/bash/manual/
- SSH hardening (Mozilla): https://infosec.mozilla.org/guidelines/openssh
- systemd manpages: https://www.freedesktop.org/software/systemd/man/
- UFW: https://help.ubuntu.com/community/UFW
- Cron (man7): https://man7.org/linux/man-pages/man5/crontab.5.html
- Loki: https://grafana.com/docs/loki/latest/
- Prometheus: https://prometheus.io/docs/
- Grafana: https://grafana.com/docs/grafana/latest/
- Let's Encrypt: https://letsencrypt.org/docs/
- Vim help: https://vimhelp.org/

## PHP & MySQL
- PHP manual: https://www.php.net/manual/en/
- MySQL docs: https://dev.mysql.com/doc/
- Laravel: https://laravel.com/docs
- Composer: https://getcomposer.org/doc/
- PHPUnit: https://phpunit.de/documentation.html
- PDO: https://www.php.net/manual/en/book.pdo.php
- WordPress dev: https://developer.wordpress.org/
- Symfony components: https://symfony.com/doc/current/components/index.html
- MariaDB: https://mariadb.com/kb/en/documentation/
- OWASP cheat sheets (PHP): https://cheatsheetseries.owasp.org/

## Frontend (HTML/CSS/Next/React/PWA/A11y)
- MDN HTML: https://developer.mozilla.org/docs/Web/HTML
- MDN CSS: https://developer.mozilla.org/docs/Web/CSS
- Tailwind: https://tailwindcss.com/docs
- React: https://react.dev/learn
- Next.js: https://nextjs.org/docs
- web.dev PWA: https://web.dev/explore/progressive-web-apps
- WCAG (W3C): https://www.w3.org/WAI/standards-guidelines/wcag/
- Sass: https://sass-lang.com/documentation/
- MDN Flexbox: https://developer.mozilla.org/docs/Web/CSS/CSS_flexible_box_layout
- MDN Grid: https://developer.mozilla.org/docs/Web/CSS/CSS_grid_layout
- Figma Dev Mode: https://help.figma.com/hc/en-us/categories/360002042553-Developers
- LottieFiles: https://lottiefiles.com/
- Lucide: https://lucide.dev/
- shadcn/ui: https://ui.shadcn.com/
- Storybook: https://storybook.js.org/docs

## Mapas e Geo
- MapLibre: https://maplibre.org/maplibre-gl-js/docs/
- PostGIS: https://postgis.net/documentation/
- OSM Wiki: https://wiki.openstreetmap.org/
- Leaflet: https://leafletjs.com/reference.html
- Turf: https://turfjs.org/docs/
- Nominatim: https://nominatim.org/release-docs/latest/api/Overview/
- Mapbox GL JS: https://docs.mapbox.com/mapbox-gl-js/
- GeoJSON (RFC 7946): https://www.rfc-editor.org/rfc/rfc7946
- Overpass API: https://wiki.openstreetmap.org/wiki/Overpass_API
- Google Maps JS: https://developers.google.com/maps/documentation/javascript

## Segurança e Identidade
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Casbin: https://casbin.org/docs/
- Argon2 (RFC 9106): https://www.rfc-editor.org/rfc/rfc9106
- JWT (RFC 7519): https://www.rfc-editor.org/rfc/rfc7519
- OAuth 2.0 Simplified: https://www.oauth.com/
- Google Identity: https://developers.google.com/identity
- Stripe Identity: https://docs.stripe.com/identity
- AWS Rekognition: https://docs.aws.amazon.com/rekognition/
- Sumsub: https://docs.sumsub.com/
- Privacy by Design (Cavoukian): https://www.ipc.on.ca/wp-content/uploads/Resources/7foundationalprinciples.pdf

## APIs/Dados/Extras
- MeiliSearch: https://www.meilisearch.com/docs/
- Redis: https://redis.io/docs/latest/
- MinIO: https://github.com/minio/minio
- PostgreSQL: https://www.postgresql.org/docs/
- Elasticsearch: https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html
- RabbitMQ: https://www.rabbitmq.com/tutorials/
- GitHub (Git): https://docs.github.com/en/get-started/using-git/about-git
- GitLab CI: https://docs.gitlab.com/ci/
- Sentry: https://docs.sentry.io/
- Twilio: https://www.twilio.com/docs
- SendGrid: https://docs.sendgrid.com/
- Mercado Pago: https://www.mercadopago.com/developers/en/docs
- Cloudflare: https://developers.cloudflare.com/
- Kubernetes basics: https://kubernetes.io/docs/tutorials/kubernetes-basics/
- Terraform: https://developer.hashicorp.com/terraform/docs
- Postman: https://learning.postman.com/docs/getting-started/introduction/
- Insomnia: https://docs.insomnia.rest/
- Markdown: https://www.markdownguide.org/
- SemVer: https://semver.org/
- Chrome DevTools: https://developer.chrome.com/docs/devtools/
- StackOverflow (NestJS): https://stackoverflow.com/questions/tagged/nestjs

---

## Próximo passo sugerido (para virar execução)
1) Definir o **MVP exato** (fluxos e telas)  
2) Fechar o **OpenAPI v1** (auth + profissionais + busca)  
3) Criar o monorepo e o `packages/shared` (types + zod + client)  
4) Subir stack local (compose) e “hello world” full (web→api→db→search)

