#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-}"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_DIR"

TS_LOCAL="$(date -Is)"
TS_UTC="$(date -u -Is)"

OUT="docs/90_meta/CHECKPOINT_LATEST.md"
NEXT="docs/90_meta/NEXT_STEP.md"
mkdir -p docs/90_meta

H="www-appsicologa.brotherdrive.app"
U1="https://appsicologa.brotherdrive.app/"
U2="https://www-appsicologa.brotherdrive.app/"

tmp="$(mktemp)"
{
  echo "# CHECKPOINT_LATEST — appsicologa.cl"
  echo "TS_LOCAL: $TS_LOCAL"
  echo "TS_UTC: $TS_UTC"
  echo

  echo "## Serviços"
  echo "- nginx: $(systemctl is-active nginx 2>/dev/null || true)"
  echo "- cloudflared: $(systemctl is-active cloudflared.service 2>/dev/null || true)"
  echo "- cockpit.socket: enabled=$(systemctl is-enabled cockpit.socket 2>/dev/null || true) active=$(systemctl is-active cockpit.socket 2>/dev/null || true)"
  echo

  echo "## DNS (systemd-resolved + NetworkManager)"
  echo "### /etc/resolv.conf"
  ls -l /etc/resolv.conf 2>/dev/null || true
  readlink -f /etc/resolv.conf 2>/dev/null || true
  sed -n "1,20p" /etc/resolv.conf 2>/dev/null || true
  echo

  if command -v nmcli >/dev/null 2>&1; then
    echo "### nmcli (enp2s0)"
    nmcli -g GENERAL.CONNECTION,GENERAL.STATE,IP4.GATEWAY,IP4.DNS dev show enp2s0 2>/dev/null || true
    echo
  else
    echo "- nmcli: (não encontrado)"
    echo
  fi

  if command -v resolvectl >/dev/null 2>&1; then
    echo "### resolvectl status (Global)"
    resolvectl status 2>/dev/null | sed -n "1,60p" || true
    echo
    echo "### resolvectl status (enp2s0)"
    resolvectl status enp2s0 2>/dev/null | sed -n "1,80p" || true
    echo
    echo "### resolvectl status (tailscale0)"
    resolvectl status tailscale0 2>/dev/null | sed -n "1,80p" || true
    echo
    echo "### resolvectl query ($H)"
    resolvectl query "$H" 2>/dev/null || true
    echo
    echo "### getent ahosts ($H)"
    getent ahosts "$H" 2>/dev/null || true
    echo
  else
    echo "- resolvectl: (não encontrado)"
    echo
  fi

  echo "## Publicação provisória (smoke)"
  echo "- $U1 -> $(curl -sS -I --max-time 12 "$U1" 2>/dev/null | head -n1 | tr -d "\r" || echo FAIL)"
  echo "- $U2 -> $(curl -sS -I --max-time 12 "$U2" 2>/dev/null | head -n1 | tr -d "\r" || echo FAIL)"
  echo

  echo "## Próximo passo (NEXT_STEP.md)"
  if [ -f "$NEXT" ]; then
    sed -n "1,80p" "$NEXT" || true
  else
    echo "- (não existe: $NEXT)"
  fi
  echo

  echo "## Git status (porcelain)"
  git status --porcelain=v1 2>/dev/null || true
  echo
} > "$tmp"

mv "$tmp" "$OUT"

if [[ "$MODE" == "--auto" ]]; then
  git add "$OUT" >/dev/null 2>&1 || true
  if ! git diff --cached --quiet 2>/dev/null; then
    git commit -m "checkpoint: auto $(date -u +%Y%m%dT%H%M%SZ)" >/dev/null 2>&1 || true
    git push >/dev/null 2>&1 || true
  fi
fi
