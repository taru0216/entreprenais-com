#!/bin/sh
set -e

# homepage — docker-static template (#4071)
# 任意で AUTH_USER / AUTH_PASS による Basic 認証を有効化する。

if [ -n "${AUTH_USER:-}" ] && [ -n "${AUTH_PASS:-}" ]; then
  PASS_HASH=$(caddy hash-password --plaintext "${AUTH_PASS}")

  sed -i "/@healthz path/i \\
@protected not path /healthz\\n\
basicauth @protected {\\n\
  ${AUTH_USER} ${PASS_HASH}\\n\
}" /etc/caddy/Caddyfile

  echo "[homepage] basic auth enabled for user: ${AUTH_USER}"
else
  echo "[homepage] basic auth disabled (AUTH_USER/AUTH_PASS not set)"
fi

exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
