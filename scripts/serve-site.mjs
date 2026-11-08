// Serves the built site the way the Nginx config does ($uri, $uri.html, $uri/index.html, then 404.html),
// to check a build in a browser:  node scripts/serve-site.mjs [dir=site] [port=4300]
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'site');
const port = Number(process.argv[3] ?? 4300);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.webmanifest': 'application/manifest+json',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.pdf': 'application/pdf',
  '.apk': 'application/vnd.android.package-archive',
};

createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const base = normalize(join(root, path));
  const file = [base, base + '.html', join(base, 'index.html')].find(
    (c) => c.startsWith(root) && existsSync(c) && statSync(c).isFile(),
  );
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    return req.method === 'HEAD' ? res.end() : createReadStream(join(root, '404.html')).pipe(res);
  }
  res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
  if (req.method === 'HEAD') return res.end();
  createReadStream(file).pipe(res);
}).listen(port, () => console.log(`serving ${root} on http://localhost:${port}`));
