# CHECKPOINT_LATEST — appsicologa.cl
TS_LOCAL: 2026-02-18T18:24:47-03:00
TS_UTC: 2026-02-18T21:24:47+00:00

## Serviços
- nginx: active
- cloudflared: active
- cockpit.socket: enabled=masked active=inactive

## DNS (systemd-resolved + NetworkManager)
### /etc/resolv.conf
lrwxrwxrwx 1 root root 39 ago  5  2025 /etc/resolv.conf -> ../run/systemd/resolve/stub-resolv.conf
/run/systemd/resolve/stub-resolv.conf
# This is /run/systemd/resolve/stub-resolv.conf managed by man:systemd-resolved(8).
# Do not edit.
#
# This file might be symlinked as /etc/resolv.conf. If you're looking at
# /etc/resolv.conf and seeing this text, you have followed the symlink.
#
# This is a dynamic resolv.conf file for connecting local clients to the
# internal DNS stub resolver of systemd-resolved. This file lists all

### nmcli (enp2s0)
netplan-enp2s0
100 (connected)
192.168.100.1
1.1.1.1 | 1.0.0.1

### resolvectl status (Global - resumo)
Global
         Protocols: -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported
  resolv.conf mode: stub

Link 2 (enp2s0)
    Current Scopes: DNS
         Protocols: +DefaultRoute -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported
Current DNS Server: 1.1.1.1
       DNS Servers: 1.1.1.1 1.0.0.1

Link 3 (wlxd03745c30241)
    Current Scopes: none
         Protocols: -DefaultRoute -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported

Link 4 (tailscale0)
    Current Scopes: DNS
         Protocols: -DefaultRoute -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported
Current DNS Server: 100.100.100.100
       DNS Servers: 100.100.100.100
        DNS Domain: taild6aa5e.ts.net ~0.e.1.a.c.5.1.1.a.7.d.f.ip6.arpa

### resolvectl status (enp2s0 - resumo)
Link 2 (enp2s0)
    Current Scopes: DNS
         Protocols: +DefaultRoute -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported
Current DNS Server: 1.1.1.1
       DNS Servers: 1.1.1.1 1.0.0.1

### resolvectl status (tailscale0 - resumo)
Link 4 (tailscale0)
    Current Scopes: DNS
         Protocols: -DefaultRoute -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported
Current DNS Server: 100.100.100.100
       DNS Servers: 100.100.100.100
        DNS Domain: taild6aa5e.ts.net ~0.e.1.a.c.5.1.1.a.7.d.f.ip6.arpa
                    ~100.100.in-addr.arpa ~101.100.in-addr.arpa
                    ~102.100.in-addr.arpa ~103.100.in-addr.arpa
                    ~104.100.in-addr.arpa ~105.100.in-addr.arpa
                    ~106.100.in-addr.arpa ~107.100.in-addr.arpa
                    ~108.100.in-addr.arpa ~109.100.in-addr.arpa
                    ~110.100.in-addr.arpa ~111.100.in-addr.arpa
                    ~112.100.in-addr.arpa ~113.100.in-addr.arpa
                    ~114.100.in-addr.arpa ~115.100.in-addr.arpa
                    ~116.100.in-addr.arpa ~117.100.in-addr.arpa
                    ~118.100.in-addr.arpa ~119.100.in-addr.arpa
                    ~120.100.in-addr.arpa ~121.100.in-addr.arpa
                    ~122.100.in-addr.arpa ~123.100.in-addr.arpa
                    ~124.100.in-addr.arpa ~125.100.in-addr.arpa
                    ~126.100.in-addr.arpa ~127.100.in-addr.arpa

## Publicação provisória (smoke)
- https://appsicologa.brotherdrive.app/ -> HTTP/2 301 
- https://www-appsicologa.brotherdrive.app/ -> HTTP/2 200 

## EDGE headers (auditável)
### https://appsicologa.brotherdrive.app/
HTTP/2 301 
location: https://www-appsicologa.brotherdrive.app/

### https://www-appsicologa.brotherdrive.app/
HTTP/2 200 
content-security-policy-report-only: default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; object-src 'none'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self'; connect-src 'self' https:; upgrade-insecure-requests
permissions-policy: camera=(), microphone=(), geolocation=()
referrer-policy: strict-origin-when-cross-origin
strict-transport-security: max-age=86400
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN

## Próximo passo (NEXT_STEP.md)
# NEXT STEP — appsicologa
TS_LOCAL: 2026-02-17T11:06:03-03:00
TS_UTC: 2026-02-17T14:06:03+00:00

## Estado atual (OK)
- [x] Landing pública + SEO básico + OG + assets
- [x] Redirects no EDGE (http/https + www canonical)
- [x] DEV stack (docker compose): Postgres/PostGIS + Redis + MeiliSearch + MinIO (healthy)

## Próximo passo real (agora)
1) Rodar CODEX com o brief:
   - docs/03_product/CODEX_TASK_MVP_v0_1.md
2) Gerar monorepo (apps/api + apps/web + packages/shared + openapi)
3) Commit/Push e depois smoke test do /v1/health

## Regra
- Implementação em lote = Codex.
- ChatGPT guia arquitetura/ordem/checklists.

## Git status (porcelain)
 M apps/api/package.json
 M apps/api/src/ai/ai.service.ts
 M pnpm-lock.yaml
?? apps/api/prisma.config.ts
?? apps/api/prisma/
?? docs/adr/ADR-0002-orm-prisma-postgres.md

