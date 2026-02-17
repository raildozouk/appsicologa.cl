#!/usr/bin/env bash
set -euo pipefail
echo "TS_LOCAL=$(date -Is)"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$REPO_ROOT/site/public"
DST="/var/www/appsicologa.cl/public"

echo "[INFO] deploy $SRC -> $DST"
sudo -n install -d -m 0755 "$DST"

if command -v rsync >/dev/null 2>&1; then
  sudo -n rsync -a --delete "$SRC/" "$DST/"
else
  # fallback sem rsync
  sudo -n find "$DST" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
  sudo -n cp -a "$SRC/." "$DST/"
fi

sudo -n find "$DST" -type d -exec chmod 0755 {} +
sudo -n find "$DST" -type f -exec chmod 0644 {} +
echo "[OK] deployed"
