# NEXT STEP — appsicologa (atualize este arquivo sempre)
TS_LOCAL: 2026-02-16T17:57:27-03:00
TS_UTC: 2026-02-16T20:57:27+00:00

## Regra de retomada
Quando o SSH cair: reconectar e seguir exatamente o que está aqui.

## Estado atual (OK)
- [x] DNS do host OK (NetworkManager -> systemd-resolved) (Cloudflare DNS 1.1.1.1/1.0.0.1)
- [x] Hostnames oficiais:
  - https://appsicologa.brotherdrive.app (301 -> www)
  - https://www-appsicologa.brotherdrive.app (200)
- [x] Nginx canonical redirect (301) configurado no origin
- [x] Hardening básico no origin:
  - X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
  - CSP em **Report-Only** (ainda não enforcing)
  - HSTS curto (max-age=86400) — lembrando que é efetivo no **edge** (TLS)
- [x] Checkpoint automático a cada 10 min + banner de retomada no SSH
- [x] Repo limpo + auto commit/push funcionando

## Próximo passo real (agora)
1) Cloudflare (brotherdrive.app):
   - Criar/validar regra: **Always Use HTTPS** (se ainda não estiver global)
   - Confirmar SSL/TLS mode: **Full (strict)** (depois que tivermos origin cert / CF Origin Cert)
2) Observabilidade leve:
   - Garantir logs Nginx ok (access/error) e rotação (logrotate)
3) Depois (quando quiser):
   - Migrar appsicologa.cl para Cloudflare (zona própria) e trocar hostnames definitivos

