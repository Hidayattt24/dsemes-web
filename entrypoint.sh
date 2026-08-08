#!/bin/sh
set -e

echo "[entrypoint] starting Next.js server on port ${PORT:-3000}..."
exec node server.js
