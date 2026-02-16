# appsicologa.cl — Plataforma pública + datos internos protegidos

> **Marketplace + red social profesional** para salud mental en Chile: descubrir, seguir y agendar con **profesionales verificados**.  
> **Principio central:** _público por defecto_ (perfiles + contenido) y _datos internos protegidos por diseño_ (chat 1:1, reservas, ficha/prontuario, pagos, PII/PHI).

---

## 🔐 TL;DR (qué resuelve)

**appsicologa.cl** reduce fricción y aumenta confianza en la elección de un profesional, combinando:

- **Descubrimiento “baja presión”**: directorio + mapa + bús queda + filtros.
- **Confianza verificable**: credenciales y verificación (con fallback manual si fuentes externas no ofrecen API estable).
- **Conversación y agendamiento**: chat + agenda + recordatorios.
 - **Privacidad & seguridad como requisito funcional**: minimización de datos, RBAC/ABAC, auditoría, observabilidad.

---

## 📚 Fuente de verdad (archivos canónicos)

Ci hay conflicto: **Documento Maestro > Playbook Técnico > resto**.

- `appsicologa_cl_documento_maestro_v1_2c_publico_reestructurado.pdf`
- `appsicologa_playbook_v1.md`
- `brend.md` (guías de UI/branding)

---

## 🧱 Arquitectura y tecnologías (OSS-first)

### Stack principal (badges)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![Postgres](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![PostGIS](https://img.shields.io/badge/PostGIS-2E5EAB?logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
![MeiliSearch](https://img.shields.io/badge/MeiliSearch-FF5CAA?logo=meilisearch&logoColor=white)
![MinIO](https://img.shields.io/badge/MinIO-C72E49?logo=minio&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?logo=socket.io&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![OpenAPI](https://img.shields.io/badge/OpenAPI-6BA539?logo=openapiinitiative&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?logo=grafana&logoColor=white)
![Loki](https://img.shields.io/badge/Loki-0A0A0A?logo=grafana&logoColor=white)
