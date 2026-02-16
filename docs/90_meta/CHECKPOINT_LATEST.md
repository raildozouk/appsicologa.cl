# CHECKPOINT_LATEST — appsicologa.cl
TS_LOCAL: 2026-02-16T14:12:42-03:00
TS_UTC: 2026-02-16T17:12:42+00:00

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
# configured search domains.
#
# Run "resolvectl status" to see details about the uplink DNS servers
# currently in use.
#
# Third party programs should typically not access this file directly, but only
# through the symlink at /etc/resolv.conf. To manage man:resolv.conf(5) in a
# different way, replace this symlink by a static file or a different symlink.
#
# See man:systemd-resolved.service(8) for details about the supported modes of
# operation for /etc/resolv.conf.


### nmcli (enp2s0)
netplan-enp2s0
100 (connected)
192.168.100.1
1.1.1.1 | 1.0.0.1

### resolvectl status (Global)
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

Link 5 (br-56eb402ea5d0)
    Current Scopes: none
         Protocols: -DefaultRoute -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported

Link 6 (docker0)
    Current Scopes: none
         Protocols: -DefaultRoute -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported

Link 19 (tailscale0)
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
                    ~64.100.in-addr.arpa ~65.100.in-addr.arpa
                    ~66.100.in-addr.arpa ~67.100.in-addr.arpa
                    ~68.100.in-addr.arpa ~69.100.in-addr.arpa
                    ~70.100.in-addr.arpa ~71.100.in-addr.arpa
                    ~72.100.in-addr.arpa ~73.100.in-addr.arpa
                    ~74.100.in-addr.arpa ~75.100.in-addr.arpa
                    ~76.100.in-addr.arpa ~77.100.in-addr.arpa
                    ~78.100.in-addr.arpa ~79.100.in-addr.arpa
                    ~80.100.in-addr.arpa ~81.100.in-addr.arpa
                    ~82.100.in-addr.arpa ~83.100.in-addr.arpa
                    ~84.100.in-addr.arpa ~85.100.in-addr.arpa
                    ~86.100.in-addr.arpa ~87.100.in-addr.arpa
                    ~88.100.in-addr.arpa ~89.100.in-addr.arpa
                    ~90.100.in-addr.arpa ~91.100.in-addr.arpa
                    ~92.100.in-addr.arpa ~93.100.in-addr.arpa
                    ~94.100.in-addr.arpa ~95.100.in-addr.arpa
                    ~96.100.in-addr.arpa ~97.100.in-addr.arpa
                    ~98.100.in-addr.arpa ~99.100.in-addr.arpa ~ts.net

### resolvectl status (enp2s0)
Link 2 (enp2s0)
    Current Scopes: DNS
         Protocols: +DefaultRoute -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported
Current DNS Server: 1.1.1.1
       DNS Servers: 1.1.1.1 1.0.0.1

### resolvectl status (tailscale0)
Link 19 (tailscale0)
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
                    ~64.100.in-addr.arpa ~65.100.in-addr.arpa
                    ~66.100.in-addr.arpa ~67.100.in-addr.arpa
                    ~68.100.in-addr.arpa ~69.100.in-addr.arpa
                    ~70.100.in-addr.arpa ~71.100.in-addr.arpa
                    ~72.100.in-addr.arpa ~73.100.in-addr.arpa
                    ~74.100.in-addr.arpa ~75.100.in-addr.arpa
                    ~76.100.in-addr.arpa ~77.100.in-addr.arpa
                    ~78.100.in-addr.arpa ~79.100.in-addr.arpa
                    ~80.100.in-addr.arpa ~81.100.in-addr.arpa
                    ~82.100.in-addr.arpa ~83.100.in-addr.arpa
                    ~84.100.in-addr.arpa ~85.100.in-addr.arpa
                    ~86.100.in-addr.arpa ~87.100.in-addr.arpa
                    ~88.100.in-addr.arpa ~89.100.in-addr.arpa
                    ~90.100.in-addr.arpa ~91.100.in-addr.arpa
                    ~92.100.in-addr.arpa ~93.100.in-addr.arpa
                    ~94.100.in-addr.arpa ~95.100.in-addr.arpa
                    ~96.100.in-addr.arpa ~97.100.in-addr.arpa
                    ~98.100.in-addr.arpa ~99.100.in-addr.arpa ~ts.net

### resolvectl query (www-appsicologa.brotherdrive.app)
www-appsicologa.brotherdrive.app: 172.67.220.39             -- link: enp2s0
                                  104.21.94.55              -- link: enp2s0
                                  2606:4700:3033::ac43:dc27 -- link: enp2s0
                                  2606:4700:3030::6815:5e37 -- link: enp2s0

-- Information acquired via protocol DNS in 10.3ms.
-- Data is authenticated: no; Data was acquired via local or encrypted transport: no
-- Data from: network

### getent ahosts (www-appsicologa.brotherdrive.app)
172.67.220.39   STREAM www-appsicologa.brotherdrive.app
172.67.220.39   DGRAM  
172.67.220.39   RAW    
104.21.94.55    STREAM 
104.21.94.55    DGRAM  
104.21.94.55    RAW    
2606:4700:3030::6815:5e37 STREAM 
2606:4700:3030::6815:5e37 DGRAM  
2606:4700:3030::6815:5e37 RAW    
2606:4700:3033::ac43:dc27 STREAM 
2606:4700:3033::ac43:dc27 DGRAM  
2606:4700:3033::ac43:dc27 RAW    

## Publicação provisória (smoke)
- https://appsicologa.brotherdrive.app/ -> HTTP/2 301 
- https://www-appsicologa.brotherdrive.app/ -> HTTP/2 200 

## Próximo passo (NEXT_STEP.md)
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

## Git status (porcelain)

