# MVP v0.1 — Appsicologa (Chile)
TS_LOCAL: 2026-02-17T10:41:26-03:00
TS_UTC: 2026-02-17T13:41:26+00:00

## 0) Regla de oro (Producto)
- **Público por defecto**: perfiles profesionales + contenido + Q&A (indexable).
- **Interno protegido por diseño**: chat 1:1, reservas/agenda, ficha/prontuario (fase 2), pagos, PII/PHI.
- Si una decisión aumenta fricción o exposición de datos, debe justificarse con beneficio claro (confianza/seguridad/crecimiento).

---

## 1) Alcance del MVP v0.1 (0–90 días) — “sí entra”
### 1.1 Roles
- **Paciente/Usuario**: puede explorar anónimo; perfil mínimo al crear cuenta.
- **Profesional**: solo aparece en discovery si está **verificado**.
- **Admin/Moderación**: revisión de verificación + reports + auditoría.

### 1.2 Módulos (MVP)
1) **Auth + cuentas**
   - login (email + magic link o password) + OAuth social (si es rápido)
   - roles (paciente/profesional/admin)
2) **Directorio público**
   - lista + filtros + búsqueda + “cerca de mí” (básico)
3) **Perfil público del profesional (verificado)**
   - bio, especialidades, idiomas, modalidades, ubicación/cobertura, precios (rango)
4) **Verificación profesional (pipeline + badges)**
   - carga de evidencias + revisión manual (MVP)
   - “niveles” visibles (badge con fecha)
5) **Contenido público**
   - posts simples (texto + imagen) por profesional verificado
   - Q&A público básico (sin PHI)
6) **Mapa básico**
   - PostGIS: punto + consulta por radio
7) **Agenda / Reservas**
   - slots + booking + estados + **ICS**
   - recordatorios (email/push) y política anti no-show (solo reglas, sin pagos)
8) **Chat privado 1:1**
   - conversaciones + mensajes + adjuntos mínimos
   - eventos auditables (sin PII en logs)
9) **Moderación básica**
   - reportar contenido/perfil
   - takedown rápido + registro de auditoría
10) **Observabilidad mínima**
   - logs saneados + métricas básicas de conversión

---

## 2) Fuera de alcance (v0.2+)
- **Pagos dentro de la plataforma** (por defecto pago directo profesional).
- **Ficha/prontuario** (fase 2, con consentimiento).
- Video/teleconsulta.
- Recomendación/ranking avanzado.

---

## 3) Flujos críticos (MVP)
### 3.1 Paciente
Descubrir → ver perfil → seguir/Q&A → **solicitar chat 1:1** o **reservar** → recordatorio → asistencia.

### 3.2 Profesional
Onboarding → envío de evidencias → **verificación** → configurar perfil/agenda → publicar contenido → responder chat/Q&A.

### 3.3 Moderación
Revisar verificación/reportes → acción (aprobar/rechazar/ocultar) → auditoría.

---

## 4) Reglas de privacidad y seguridad (MVP)
- Prohibido PHI en feed/Q&A; remover rápido.
- **Datos internos** requieren control fino (**ABAC/RBAC**) + auditoría.
- Logs: **sin PII/PHI** (mascaramiento).
- Archivos (evidencias/adjuntos): storage tipo S3 (MinIO) con URLs firmadas.

---

## 5) KPIs y criterios de OK (MVP)
### 5.1 Métricas núcleo
- Tiempo a primer contacto (perfil → chat o reserva).
- Tasa de reserva completada.
- No-show (con recordatorios).

### 5.2 OK mínimo (gate de release)
- **0 bugs de exposición PII/PHI** (QA + revisión manual).
- p50 de verificación **< 72h** (MVP).
- ≥ **80% profesionales activos verificados**.
- A/B: +10% en (profile_view → chat_request_sent) o (appointment_booked).

---

## 6) Modelo de datos mínimo (MVP)
- users (role, status)
- professional_profiles (slug, specialties, languages, modalities, price_range, verified_level)
- verification_requests / verification_evidence
- posts, questions, answers, follows
- appointments (slots, booking, status, ICS)
- conversations, messages, attachments
- reports, audit_events
- media_objects (minio keys, mime, size)

---

## 7) Orden de construcción (build order)
**Fase 0 — repo/stack dev**
- docker-compose dev: Postgres/PostGIS + Redis + MeiliSearch + MinIO
- Prisma schema + migrations
- shared types/schemas (Zod)

**Fase 1 — auth + roles**
- signup/login + sesión + guards
- OK: endpoints /v1/auth + user básico

**Fase 2 — profesionales + perfil público**
- create/update profile, slug, public view
- OK: /profissionais/[slug] renderiza

**Fase 3 — verificación (manual)**
- submit request + upload evidence + admin approve/reject + badge
- OK: solo verificados en discovery

**Fase 4 — directorio + búsqueda**
- listado + filtros + Meili index sync
- OK: búsqueda funcional + filtros

**Fase 5 — agenda/reservas + ICS**
- slots + booking + cancel + ICS download
- OK: reserva completa + recordatorio básico

**Fase 6 — chat 1:1**
- conversaciones + mensajes + anexos mínimos
- OK: chat funciona + auditoría de eventos

**Fase 7 — contenido + moderação**
- posts + Q&A + reports/takedown
- OK: report → action → audit_event

---

## 8) Integraciones (slots, no hardcode)
- Email: proveedor pluggable (SMTP primero).
- Push: (fase MVP si Expo/webpush se integra rápido).
- Verificación externa (RNPI/MINEDUC): **slot** para luego (no bloquear MVP).

