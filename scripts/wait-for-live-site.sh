#!/usr/bin/env bash
# Wait until GitHub Pages serves the exported site (HTML title is entity-encoded).
set -euo pipefail

URL="${1:-https://nopponcha.github.io/coffeeshop-demo/}"
MAX_ATTEMPTS="${2:-30}"
SLEEP_SEC="${3:-10}"
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

echo "Polling $URL (max ${MAX_ATTEMPTS} attempts, ${SLEEP_SEC}s apart, timeout $((MAX_ATTEMPTS * SLEEP_SEC))s)..."

for attempt in $(seq 1 "$MAX_ATTEMPTS"); do
  HTTP_CODE="000"
  if HTTP_CODE="$(curl -fsSL --max-time 30 -o "$TMP" -w "%{http_code}" "$URL" 2>/dev/null)"; then
    if [[ "$HTTP_CODE" == "200" ]] && grep -qE 'Bean (&amp;|&) Brew' "$TMP"; then
      echo "Live site is ready (HTTP 200, attempt ${attempt}/${MAX_ATTEMPTS})"
      exit 0
    fi
  else
    HTTP_CODE="000"
  fi

  echo "Not ready yet (attempt ${attempt}/${MAX_ATTEMPTS}, HTTP ${HTTP_CODE})..."
  sleep "$SLEEP_SEC"
done

echo "Live site did not become ready within $((MAX_ATTEMPTS * SLEEP_SEC)) seconds"
exit 1
