# NEXT STEP — appsicologa (atualize este arquivo sempre)
TS_LOCAL: 2026-02-16T13:27:27-03:00
TS_UTC: 2026-02-16T16:27:27+00:00

## Regra de retomada
Quando o SSH cair: reconectar e seguir exatamente o que está aqui.

## Decisão (agora)
- Vamos usar o domínio **brotherdrive.app** (já está no Cloudflare).
- Hostnames oficiais do appsicologa neste momento:
  - https://appsicologa.brotherdrive.app
  - https://www-appsicologa.brotherdrive.app
- Nota: **www.appsicologa.brotherdrive.app** (2 níveis) NÃO entra no Universal SSL padrão.

## Próximo passo real (agora)
1) Canonical: decidir e aplicar redirect 301 (ex: appsicologa.brotherdrive.app -> www-appsicologa.brotherdrive.app)
2) Hardening básico:
   - Cloudflare: Always Use HTTPS (rule) + cache rules se precisar
   - Nginx: headers mínimos e logs OK
3) Depois (quando quiser): migrar appsicologa.cl para Cloudflare (zona própria) e trocar hostnames
