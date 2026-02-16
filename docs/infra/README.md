# Infra (provisório) — appsicologa (TS_UTC: 2026-02-16T13:25:57+00:00)

## Publicação provisória
- Nginx: vhost HTTP (porta 80) servindo /var/www/appsicologa.cl/public
- Cloudflare Tunnel: "appsicologa" com rotas:
  - https://appsicologa.brotherdrive.app (OK)
  - https://www-appsicologa.brotherdrive.app (OK)
- Nota TLS: **www.appsicologa.brotherdrive.app** (2 níveis) NÃO funciona com Universal SSL padrão.

## Arquivos no servidor (fonte da verdade)
- /etc/nginx/sites-available/appsicologa.cl.conf
- /etc/cloudflared/config.yml
- /etc/systemd/system/cloudflared.service
- /etc/systemd/system/appsicologa-dns-pin.service

## Segurança (NÃO versionar)
- /etc/cloudflared/*.json (credenciais do tunnel)
- /etc/cloudflared/cert.pem

## Rollback rápido
- DNS pin:
  sudo systemctl disable --now appsicologa-dns-pin.service
  sudo rm -f /etc/systemd/system/appsicologa-dns-pin.service && sudo systemctl daemon-reload
  sudo resolvectl revert enp2s0

- Cloudflared:
  sudo systemctl disable --now cloudflared.service

- Nginx (desabilitar site):
  sudo rm -f /etc/nginx/sites-enabled/appsicologa.cl.conf
  sudo nginx -t && sudo systemctl reload nginx
