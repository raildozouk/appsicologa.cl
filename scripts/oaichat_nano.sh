#!/usr/bin/env bash
# appsicologa.cl — oaichat wrapper (nano-first)
set -euo pipefail

TS_LOCAL="$(date -Is)"
TS_UTC="$(date -u -Is)"
echo "TS_LOCAL=$TS_LOCAL"
echo "TS_UTC=$TS_UTC"
echo

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

# --- checks ---
if [[ ! -x ./bin/oaichat ]]; then
  echo "[ERR] ./bin/oaichat não existe ou não é executável."
  echo "      Rode a criação do oaichat primeiro (bin/oaichat)."
  exit 1
fi

python3 -m py_compile ./bin/oaichat >/dev/null 2>&1 || {
  echo "[ERR] ./bin/oaichat falhou no py_compile (arquivo corrompido?)."
  exit 1
}

CONV="${1:-dev}"
MODEL="${OPENAI_MODEL:-gpt-4o-mini}"

PROMPT_FILE="${PROMPT_FILE:-$REPO_ROOT/var/ai_cli/prompt.txt}"
LOG_DIR="$REPO_ROOT/var/log"
mkdir -p "$(dirname "$PROMPT_FILE")" "$LOG_DIR"
touch "$PROMPT_FILE"

echo "[INFO] conversation=$CONV"
echo "[INFO] model=$MODEL"
echo "[INFO] prompt_file=$PROMPT_FILE"
echo

echo "[INFO] Abrindo nano para editar o prompt..."
echo "      (Salvar: Ctrl+O, Enter | Sair: Ctrl+X)"
sleep 0.2
nano "$PROMPT_FILE"

PROMPT="$(tr -d '\r' < "$PROMPT_FILE")"
if [[ -z "${PROMPT//[[:space:]]/}" ]]; then
  echo "[ERR] prompt vazio. Edite $PROMPT_FILE e tente novamente."
  exit 2
fi

if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  read -rsp "OPENAI_API_KEY (não será exibida): " OPENAI_API_KEY
  echo
  export OPENAI_API_KEY
fi

LOG="$LOG_DIR/oaichat_${CONV}_$(date -u +%Y%m%dT%H%M%SZ).log"
echo "[INFO] log=$LOG"
echo

set +e
OUT="$(./bin/oaichat -c "$CONV" -m "$MODEL" "$PROMPT" 2>>"$LOG")"
RC=$?
set -e

printf "%s\n" "$OUT" | tee -a "$LOG"
echo

STATE_FILE="$REPO_ROOT/var/ai_cli/${CONV}.json"
if [[ -f "$STATE_FILE" ]]; then
  echo "[OK] state=$STATE_FILE" | tee -a "$LOG"
  sed -n "1,120p" "$STATE_FILE" | tee -a "$LOG"
else
  echo "[WARN] state file não encontrado em $STATE_FILE" | tee -a "$LOG"
fi

exit "$RC"
