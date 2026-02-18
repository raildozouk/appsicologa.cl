# ADR-0002 — ORM Prisma + PostgreSQL para persistencia
**TS_LOCAL:** 2026-02-18T17:29:45-03:00
**TS_UTC:** 2026-02-18T20:29:45+00:00
**Status:** Accepted
**Decisores:** Raildo + Assistente (CTO)

## Contexto
- Necesitamos persistir: perfiles (paciente/psicólogo), posts, follows, likes, preguntas públicas, y futuro agendamiento.
- Stack actual: NestJS (apps/api) + PostgreSQL.
- Node.js en el entorno: v24.x.

## Decisión
Usar **PostgreSQL** como base de datos principal y **Prisma ORM** como capa de acceso a datos (migrations + client).

## Alternativas consideradas
1) **TypeORM**
   - Pros: integrado al ecosistema Nest; setup rápido.
   - Contras: DX y migraciones menos consistentes; tipado y ergonomía inferiores vs Prisma.
2) **Drizzle**
   - Pros: muy liviano; SQL-first.
   - Contras: migraciones/flows y ecosistema menos “baterías incluidas” para este proyecto.
3) **SQL raw**
   - Pros: control total.
   - Contras: costo de mantenimiento; más riesgo; menos velocidad.

## Trade-offs
- **DX**: Prisma excelente (schema + generate + migrate).
- **Performance**: suficiente para MVP; optimizable con índices y consultas específicas.
- **Operación**: requiere engines y compatibilidad OpenSSL (ok en la mayoría de distros modernas).
- **Lock-in**: schema Prisma = leve acoplamiento (aceptable por velocidad de entrega).

## Consecuencias / Próximos pasos
- Instalar `prisma` + `@prisma/client` en `apps/api`.
- Crear `apps/api/prisma/schema.prisma` con modelos iniciales (User, ProfessionalProfile, Post, Follow, Like, Question).
- Configurar `DATABASE_URL` (en `var/secrets/` o `.env` local, nunca commitear).
