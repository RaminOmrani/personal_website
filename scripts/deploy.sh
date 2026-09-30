#!/usr/bin/env bash
# Uploads ./site to a Linux server over SSH (for the Nginx setup in deploy/nginx).
#   DEPLOY_TARGET=root@1.2.3.4 ./scripts/deploy.sh
# Optional: DEPLOY_PATH (default /var/www/raminomrani.ir), BUILD=0 to skip the build.
set -euo pipefail
cd "$(dirname "$0")/.."
: "${DEPLOY_TARGET:?set DEPLOY_TARGET, e.g. DEPLOY_TARGET=root@1.2.3.4}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/raminomrani.ir}"
if [ "${BUILD:-1}" != "0" ]; then node scripts/build-site.mjs; fi
# --delete removes files that no longer exist locally, so keep assetlinks.json in chooser/.well-known
rsync -avz --delete site/ "$DEPLOY_TARGET:$DEPLOY_PATH/"
echo "✓ uploaded to $DEPLOY_TARGET:$DEPLOY_PATH"
