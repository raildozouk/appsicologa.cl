# NEXT STEP — appsicologa (atualize este arquivo sempre)

## Regra de retomada
Quando o SSH cair: reconectar e seguir exatamente o que está aqui.

## Status atual
- [x] DNS “definitivo” via NetworkManager + systemd-resolved (enp2s0 com 1.1.1.1/1.0.0.1)
- [ ] Migrar appsicologa.cl para Cloudflare (zona própria) e remover hostnames provisórios (*.brotherdrive.app)
- [ ] Depois: HTTPS end-to-end (origin) se/quando necessário

## Próximo passo real (agora)
1) Migrar domínio appsicologa.cl para Cloudflare (nameservers)
2) Criar hostnames no tunnel: appsicologa.cl + www.appsicologa.cl
3) Ajustar Nginx server_name (já está pronto)
