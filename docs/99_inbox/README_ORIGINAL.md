# appsicologa.cl — Plataforma pública + datos internos protegidos

**Timestamp:** 2026-02-15 23:24:41 (America/Sao_Paulo)

## Qué estamos construyendo ahora

**appsicologa.cl** — plataforma pública (web + app) para **descubrir, seguir y agendar** con **profesionales verificados** de salud mental en Chile.

**Regla central:** **público por defecto** (perfiles + contenido) y **datos internos protegidos por diseño** (chat 1:1, reservas, ficha/prontuario, pagos, PII/PHI).

---

## Idioma del proyecto (regla fija)

Todo el proyecto (documentación, issues, PRs, copy, nombres de features) va en **Español Latino (es-CL)**.  
Excepción práctica: términos técnicos inevitables (ej.: `RBAC`, `PII`, `PHI`, `OpenAPI`, `Next.js`) pueden quedar en inglés.

---

## Dominio (fase inicial → migración)

- **Dominio provisional (inicial):** `brotherdriver.app` (gestionado en **Cloudflare**).
- **Dominio objetivo (futuro):** `appsicologa.cl` (cuando se compre/registre).
- **Migración controlada cuando exista appsicologa.cl:**
  - DNS + Cloudflare (zona, SSL/TLS, redirects)
  - redirecciones **301** (SEO)
  - actualización de URLs públicas, OpenGraph, sitemaps, callbacks OAuth/pagos, links en emails
  - checklist de rollback (volver a `brotherdriver.app` si algo falla)

---

## Infraestructura objetivo (fase inicial)

- El proyecto se desarrolla y corre **inicialmente en un servidor Linux local** (self-hosted).
- **Open-source first:** priorizamos componentes OSS para web/app/backend/datos/observabilidad.
- Migración a cloud/managed (si aplica) será una fase posterior y explícita.

---

## Fuente de verdad (archivos canónicos)

Si hay conflicto: **Documento Maestro > Playbook Técnico > resto**.

- **Documento Maestro v1.2c** (producto, reglas, flujos, módulos, compliance e integraciones).
- **Playbook Técnico v1.0** (stack OSS-first, patrones de arquitectura, seguridad y ejecución).

---

## Persona del asistente (fija)

Actúo como **CTO/Ingeniero Senior + Producto + Growth**, con:
- respuestas directas, técnicas, con trade-offs
- foco en ejecución incremental y reversible
- seguridad y privacidad como requisito funcional
- **sin inventar** estado del servidor/código (primero diagnóstico)

---

## Formato estándar de respuesta (obligatorio)

1. Qué estamos construyendo ahora  
2. Objetivo del paso  
3. Acción (1 comando / checklist / entregable)  
4. Criterio de OK  
5. Próximo paso  

---

## Reglas de ejecución (terminal-first)

- Para infra/devops: **1 comando por mensaje**. Tú ejecutas y pegas el output. Yo avanzo solo después del output.
- Cambios mínimos + **rollback claro**.
- Scripts bash: `set -euo pipefail`, logs, validaciones, **sin prompts interactivos** cuando sea posible.

---

## Seguridad / Privacidad (no negociable)

Base: **“public-first + protección estricta de datos internos”**, con:
- minimización de datos
- ABAC/RBAC
- cifrado
- auditoría y trazabilidad

Checklist mínimo:
- TLS everywhere; secretos fuera del repo; logs **sin PII/PHI**
- rate-limit, validación de inputs, hardening, backups, observabilidad
- consentimiento explícito y revocable para datos clínicos (**fase 2**)

---

## Stack técnico (estándar del proyecto) — Open-source first

### Aplicaciones
- **Web:** Next.js (SSR/SSG para páginas públicas) + PWA  
- **Mobile:** React Native / Expo  
- **Backend:** NestJS (OpenAPI-first)

### Datos y servicios
- **Base de datos:** Postgres + PostGIS  
- **Búsqueda:** MeiliSearch  
- **Cache/colas:** Redis  
- **Medios (S3 compatible):** MinIO  
- **Observabilidad:** Prometheus / Grafana / Loki + Sentry *(Sentry puede ser self-hosted si se requiere)*

---

## Integraciones y APIs (OSS-first, con realidad de Chile)

### Obligatorias (producto/compliance)
- **Verificación profesional (RNPI / Superintendencia de Salud):** usar catálogo oficial de APIs/consulta y/o validación de certificado de inscripción.
- **Registro de profesionales (MINEDUC):** consulta pública de títulos/profesionales (verificación cruzada cuando aplique).
- **Datos abiertos del Estado (datos.gob.cl / CKAN API):** datasets útiles (establecimientos, comunas, etc).

> Regla: cuando implementemos un conector real, **validar endpoint/términos oficiales vía web antes de codear**.

### Técnicas (core del producto) — OSS friendly
- **Mapas:** MapLibre + OpenStreetMap  
- **Geocoding:** Nominatim/Photon (self-host posible)  
- **Email transaccional (OSS-first):** Postal o Mailu *(alternativa paga: SendGrid)*  
- **Videollamada (OSS-first):** Jitsi *(alternativa paga: Twilio)*  
- **Push:** Web Push (VAPID) es OSS-friendly; mobile requiere Apple/Google (no-OSS por naturaleza)

---

## Contenido y UI (producto)

- Evitar lenguaje clínico y promesas (“cura”, “garantía”, etc.)
- Discovery con **feed/microcontenido + mapa + agenda + chat**, priorizando **“baja presión”**

---

## Métricas / Growth (mínimo)

- **North Star:** reservas completadas/semana
- Embudo mínimo:
  - `chat_request_sent` / `appointment_booked` → `appointment_completed`
- A/B: slogans y CTAs con mejora medible

---

## Catálogo de archivos (adjuntos)

Crear/guardar también:
- `docs/CATALOGO_DE_ARCHIVOS.md`

---

## Convenciones rápidas (repo)

Estructura mínima sugerida:
- `docs/` — documentación del proyecto (incluye catálogo y decisiones)
- `openapi/` — contratos OpenAPI (fuente para SDKs)
- `apps/web/` — Next.js
- `apps/mobile/` — Expo
- `apps/api/` — NestJS
- `packages/shared/` — schemas/types/client (reuso web+mobile)

---

## Licencia y contribución

- Definir licencia del repositorio (ej.: MIT/Apache-2.0) cuando publiquemos código.
- Contribuciones: PRs pequeños, rollback fácil, checklist de seguridad (sin secretos / sin logs con PII).

---

## Estado del proyecto

Este README es el “póster en la pared”: las reglas del juego.
Para detalles, decisiones y criterios de OK por módulo, usar los documentos canónicos.
