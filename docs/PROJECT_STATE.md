# appsicologa.cl — Project State (Canónico)
**TS_LOCAL:** 2026-02-18T01:14:11-03:00  
**TS_UTC:** 2026-02-18T04:14:11+00:00

## Idea central
Marketplace/red social pública para descubrir, seguir y agendar con profesionales verificados de salud mental en Chile.

## Regla no negociable
**Público por defecto** (perfiles + contenido + Q&A) y **datos internos protegidos por diseño** (chat 1:1, reservas, ficha clínica, pagos, PII/PHI).

## Stack (OSS-first)
- Web: Next.js (SSR/SSG) + PWA
- API: NestJS (OpenAPI-first)
- Datos: Postgres + PostGIS
- Cache: Redis
- Search: MeiliSearch
- Media: MinIO
- Obs: Prometheus/Grafana/Loki + Sentry (más adelante)

## Dominio
Inicialmente: subdominio en `brotherdrive.app` (Cloudflare). Migración futura a `appsicologa.cl`.

## Estado actual (snapshot)
- Monorepo pnpm OK
- apps/api (NestJS) scaffold OK
- apps/web (Next.js) scaffold OK
- Docker local OK: Postgres(PostGIS), Redis, MinIO, MeiliSearch
- Nginx: config válida (sudo nginx -t OK)

## Objetivos próximos (MVP)
1) API: health + Swagger + módulos base (auth interna, perfiles, contenido)
2) Web: landing + directorio (listado + perfil público)
3) Search: indexación básica (profesionales + contenido)
4) Observabilidad mínima: logs estructurados + métricas básicas

## Decisiones (ADR)
- Cada decisión importante vive en `docs/adr/` con fecha y trade-offs.
