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

HOST_A="appsicologa.brotherdrive.app"
HOST_W="www-appsicologa.brotherdrive.app"
URL_A="https://${HOST_A}/"
URL_W="https://${HOST_W}/"

headers_edge() {
  local url="$1"
  curl -sS -I --max-time 12 "$url" 2>/dev/null \
    | awk 'BEGIN{IGNORECASE=1}
      /^HTTP\/|^location:|^strict-transport-security:|^content-security-policy-report-only:|^content-security-policy:|^x-content-type-options:|^x-frame-options:|^referrer-policy:|^permissions-policy:/{print}' \
    | sed 's/\r$//' || true
}

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
  sed -n "1,8p" /etc/resolv.conf 2>/dev/null || true
  echo
  echo "### nmcli (enp2s0)"
  if command -v nmcli >/dev/null 2>&1; then
    nmcli -g GENERAL.CONNECTION,GENERAL.STATE,IP4.GATEWAY,IP4.DNS dev show enp2s0 2>/dev/null || true
  else
    echo "- nmcli: (não encontrado)"
  fi
  echo
  echo "### resolvectl status (Global - resumo)"
  if command -v resolvectl >/dev/null 2>&1; then
    resolvectl status 2>/dev/null | sed -n "1,20p" || true
    echo
    echo "### resolvectl status (enp2s0 - resumo)"
    resolvectl status enp2s0 2>/dev/null | sed -n "1,20p" || true
    echo
    echo "### resolvectl status (tailscale0 - resumo)"
    resolvectl status tailscale0 2>/dev/null | sed -n "1,20p" || true
  else
    echo "- resolvectl: (não encontrado)"
  fi
  echo

  echo "## Publicação provisória (smoke)"
  for u in "$URL_A" "$URL_W"; do
    echo "- $u -> $(curl -sS -I --max-time 12 "$u" 2>/dev/null | head -n1 | tr -d "\r" || echo "FAIL")"
  done
  echo

  echo "## EDGE headers (auditável)"
  echo "### $URL_A"
  headers_edge "$URL_A"
  echo
  echo "### $URL_W"
  headers_edge "$URL_W"
  echo

  echo "## Próximo passo (NEXT_STEP.md)"
  if [ -f "$NEXT" ]; then
    sed -n "1,80p" "$NEXT"
  else
    echo "- (não existe: $NEXT)"
  fi
  echo

  echo "## Git status (porcelain)"
  gs="$(git status --porcelain=v1 2>/dev/null || true)"
  if [ -n "$gs" ]; then
    echo "$gs"
  else
    echo "(clean)"
  fi
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
