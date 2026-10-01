#!/usr/bin/env bash
# Puts raminomrani.ir on an Ubuntu/Debian VPS: Nginx, the site files and free HTTPS.
# Run it from the folder you extracted (it contains site/ and raminomrani.ir.conf):
#
#   sudo bash setup-server.sh            install what is in this folder (first install, or an update)
#   sudo bash setup-server.sh --update   download the newest package from GitHub and install it
#   sudo bash setup-server.sh --https    only (re)try the HTTPS certificate
#
# Safe to run again: later runs replace the site files and keep the Nginx/HTTPS setup.
set -euo pipefail

DOMAIN=raminomrani.ir
# the newest build, committed to the repository's default branch by `npm run package:site`
PACKAGE_URL=${PACKAGE_URL:-https://raw.githubusercontent.com/RaminOmrani/personal_website/HEAD/release/raminomrani-site.tar.gz}
ROOT=/var/www/$DOMAIN
CONF=/etc/nginx/sites-available/$DOMAIN.conf
HERE=$(cd "$(dirname "$0")" && pwd)

say() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok() { printf '\033[1;32m✓ %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m! %s\033[0m\n' "$*"; }
fail() { printf '\033[1;31m✗ %s\033[0m\n' "$*"; exit 1; }

[ "$(id -u)" = 0 ] || fail "Run it with sudo:  sudo bash setup-server.sh"
command -v apt-get >/dev/null || fail "This script is for Ubuntu/Debian (apt). Tell Claude which Linux the VPS runs."

# Asks Let's Encrypt for a certificate once the domain really reaches this server.
https() {
  say "HTTPS"
  # a one-off file proves that the domain points here and Nginx serves it
  local token seen
  token=$(head -c 12 /dev/urandom | od -An -tx1 | tr -d ' \n')
  mkdir -p "$ROOT/.well-known"
  echo "$token" >"$ROOT/.well-known/ro-check.txt"
  seen=$(curl -s --max-time 10 "http://$DOMAIN/.well-known/ro-check.txt" || true)
  rm -f "$ROOT/.well-known/ro-check.txt"
  if [ "$seen" != "$token" ]; then
    if [ -d "/etc/letsencrypt/live/$DOMAIN" ]; then
      ok "A certificate already exists; certbot renews it by itself."
      return
    fi
    warn "http://$DOMAIN does not reach this server yet."
    echo "   The domain's A records (@ and www) must point to this server's IP, and DNS changes can take a few hours."
    echo "   Check with:  getent hosts $DOMAIN      then run:  sudo bash setup-server.sh --https"
    return
  fi

  # www goes on the certificate only if it points to the same place as the bare domain
  local names=(-d "$DOMAIN") want="$DOMAIN" ip www
  ip=$(getent ahostsv4 "$DOMAIN" | awk 'NR==1 {print $1}')
  www=$(getent ahostsv4 "www.$DOMAIN" | awk 'NR==1 {print $1}' || true)
  if [ -n "$www" ] && [ "$www" = "$ip" ]; then
    names+=(-d "www.$DOMAIN")
    want="$DOMAIN www.$DOMAIN"
  else
    warn "www.$DOMAIN does not point here (yet); the certificate covers $DOMAIN only. Add an A record for www and run --https again later."
  fi

  local cert="/etc/letsencrypt/live/$DOMAIN/cert.pem" missing=0 n
  if [ -f "$cert" ]; then
    for n in $want; do openssl x509 -in "$cert" -noout -text | grep -q "DNS:$n\b" || missing=1; done
    if [ "$missing" = 0 ]; then
      ok "The certificate already covers $want; certbot renews it by itself."
      return
    fi
  fi

  local mail=(--register-unsafely-without-email)
  [ -n "${EMAIL:-}" ] && mail=(-m "$EMAIL" --no-eff-email)
  if certbot --nginx --non-interactive --agree-tos --expand "${mail[@]}" "${names[@]}" --redirect; then
    ok "HTTPS is on: https://$DOMAIN"
  else
    warn "certbot could not get a certificate. Send Claude the lines above."
  fi
}

if [ "${1:-}" = "--update" ]; then
  say "Downloading the newest site from GitHub"
  command -v curl >/dev/null || { apt-get update -y -q && apt-get install -y -q curl; }
  tmp=$(mktemp -d)
  curl -fL --retry 3 --progress-bar -o "$tmp/site.tar.gz" "$PACKAGE_URL" ||
    fail "Could not download $PACKAGE_URL (is GitHub reachable from this server?). Upload the package by hand instead."
  tar -xzf "$tmp/site.tar.gz" -C "$tmp"
  ok "Downloaded"
  # run the freshly downloaded script, so improvements to it apply too
  exec bash "$tmp/raminomrani-site/setup-server.sh"
fi

if [ "${1:-}" = "--https" ]; then
  https
  exit 0
fi

[ -f "$HERE/site/index.html" ] || fail "site/ is missing next to this script. Extract the whole package first."

# ---- before changing anything: the site needs ports 80 and 443, shared only with Nginx ----
say "Checking ports 80 and 443 (other sites and ports on this server are left alone)"
command -v ss >/dev/null || fail "The 'ss' command is missing (package iproute2). Tell Claude."
port_owner() {
  echo $(ss -ltnpH "( sport = :$1 )" 2>/dev/null | sed -n 's/.*users:(("\([^"]*\)".*/\1/p' | sort -u)
}
for p in 80 443; do
  who=$(port_owner "$p")
  if [ -n "$who" ] && [ "$who" != "nginx" ]; then
    fail "Port $p is already used by: $who. Nothing was changed. Send Claude the output of check-server.sh so we can fit the site in safely."
  fi
  ok "port $p: ${who:-free}"
done
had_nginx=0
command -v nginx >/dev/null && had_nginx=1

say "Installing Nginx and Certbot"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y -q
# --no-upgrade: an Nginx that already runs other sites is not upgraded or restarted
apt-get install -y -q --no-upgrade nginx certbot python3-certbot-nginx curl openssl
ok "Installed"

say "Copying the site to $ROOT"
mkdir -p "$ROOT"
# replace everything except .well-known (the Android app's assetlinks.json lives there)
find "$ROOT" -mindepth 1 -maxdepth 1 ! -name '.well-known' -exec rm -rf {} +
cp -a "$HERE/site/." "$ROOT/"
rm -f "$ROOT/.htaccess" "$ROOT/CNAME"
chown -R www-data:www-data "$ROOT"
find "$ROOT" -type d -exec chmod 755 {} +
find "$ROOT" -type f -exec chmod 644 {} +
ok "$(find "$ROOT" -type f | wc -l) files in place"

# "zz-" loads it after the other sites, so it never becomes the catch-all for requests to the bare IP
LINK=/etc/nginx/sites-enabled/zz-$DOMAIN.conf
if [ -f "$CONF" ]; then
  say "Nginx is already set up for $DOMAIN (kept as it is)"
else
  say "Adding $DOMAIN to Nginx"
  sed "s#/var/www/raminomrani.ir#$ROOT#" "$HERE/raminomrani.ir.conf" >"$CONF"
  ln -sf "$CONF" "$LINK"
  # a brand-new Nginx only shows its welcome page from "default"; an Nginx that was already
  # here keeps every site it had, "default" included
  [ "$had_nginx" = 0 ] && rm -f /etc/nginx/sites-enabled/default
  if ! nginx -t 2>/tmp/ro-nginx-test.txt; then
    if grep -q 'Address family not supported' /tmp/ro-nginx-test.txt; then
      warn "No IPv6 on this server; listening on IPv4 only."
      sed -i '/listen \[::\]:80;/d' "$CONF"
    fi
    if ! nginx -t; then
      rm -f "$LINK" "$CONF"
      fail "Nginx rejected the new site, so it was removed again; your other sites are untouched. Send Claude the lines above."
    fi
  fi
fi

nginx -t 2>/dev/null || fail "Nginx's configuration has an error (see: sudo nginx -t). Nothing was reloaded."
if systemctl is-active --quiet nginx 2>/dev/null; then
  systemctl reload nginx # graceful: sites already running keep running
elif command -v systemctl >/dev/null && systemctl enable --now nginx 2>/dev/null; then
  :
else
  nginx -s reload 2>/dev/null || nginx
fi
ok "Nginx is serving the site"

if command -v ufw >/dev/null && ufw status 2>/dev/null | grep -q 'Status: active'; then
  ufw allow 'Nginx Full' >/dev/null && ok "Firewall: ports 80 and 443 open"
fi

https

say "Done"
echo "   Open https://$DOMAIN (or http:// until HTTPS is on)."
echo "   Later updates:  sudo bash /root/raminomrani-site/setup-server.sh --update"
