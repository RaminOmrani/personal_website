#!/usr/bin/env bash
# A read-only look at a VPS before raminomrani.ir goes on it. It changes nothing.
#   curl -fsSL https://raw.githubusercontent.com/RaminOmrani/personal_website/HEAD/deploy/check-server.sh | sudo bash
# Prints no passwords or keys: only ports, process names, server names and versions.

h() { printf '\n===== %s =====\n' "$*"; }
has() { command -v "$1" >/dev/null 2>&1; }

h "System"
. /etc/os-release 2>/dev/null && echo "$PRETTY_NAME ($(uname -m))"
free -h 2>/dev/null | awk 'NR<=2'
df -h / 2>/dev/null | tail -1

h "Listening TCP ports (port -> program)"
if has ss; then
  ss -ltnpH 2>/dev/null | awk '{ n = split($4, a, ":"); port = a[n]; prog = $6; sub(/users:\(\("/, "", prog); sub(/".*/, "", prog); print port " -> " prog }' | sort -n -u
else
  netstat -ltnp 2>/dev/null
fi

h "Ports 80 and 443"
for p in 80 443; do
  who=$(ss -ltnpH "( sport = :$p )" 2>/dev/null | sed -n 's/.*users:(("\([^"]*\)".*/\1/p' | sort -u | tr '\n' ' ')
  echo "port $p: ${who:-free}"
done

h "Web servers and panels"
for s in nginx apache2 httpd caddy lighttpd haproxy traefik docker x-ui 3x-ui marzban hiddify; do
  if has systemctl && systemctl list-unit-files 2>/dev/null | grep -q "^$s\.service"; then
    echo "$s: $(systemctl is-active "$s" 2>/dev/null)"
  fi
done
has nginx && nginx -v 2>&1
has apache2 && apache2 -v 2>/dev/null | head -1

if has nginx; then
  h "Nginx sites (listen / server_name lines only)"
  for f in /etc/nginx/conf.d/*.conf /etc/nginx/sites-enabled/*; do
    [ -e "$f" ] || continue
    echo "--- $f"
    sed 's/#.*//' "$f" 2>/dev/null | grep -oE '\b(listen|server_name|root|proxy_pass)\s[^;]*;' | sed 's/^/    /'
  done
fi

if has apache2ctl; then
  h "Apache sites"
  apache2ctl -S 2>/dev/null | grep -E 'port|namevhost' | head -30
fi

if has docker; then
  h "Docker containers (name, ports)"
  docker ps --format '{{.Names}}  {{.Ports}}' 2>/dev/null | head -30
fi

h "Firewall"
if has ufw; then ufw status 2>/dev/null | head -25; else echo "ufw not installed"; fi

h "Domain"
getent hosts raminomrani.ir || echo "raminomrani.ir does not resolve yet"
getent hosts www.raminomrani.ir || echo "www.raminomrani.ir does not resolve yet"
echo "this server: $(hostname -I 2>/dev/null)"

h "Done (nothing was changed)"
