import { createHash } from 'node:crypto';
import { createReadStream, existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const root = import.meta.dirname;
const v3 = resolve(root, '../v3');
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')) as { version: string };

/**
 * v3's images (project screenshots, client logos, Ramin's photos and the favicon) are the single source.
 * They are served straight from v3/public in dev and copied into the build, never committed twice.
 */
const shared: Record<string, string> = {
  'work/': resolve(v3, 'public/work'),
  'logos/': resolve(v3, 'public/logos'),
  'me/': resolve(v3, 'public/me'),
  'favicon.svg': resolve(v3, 'public/favicon.svg'),
};

const types: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

/** Every file of the shared v3 images, as [published path, file on disk]. */
function sharedFiles(): [string, string][] {
  const out: [string, string][] = [];
  for (const [prefix, src] of Object.entries(shared)) {
    if (!prefix.endsWith('/')) {
      out.push([prefix, src]);
      continue;
    }
    for (const name of readdirSync(src)) if (statSync(join(src, name)).isFile()) out.push([prefix + name, join(src, name)]);
  }
  return out;
}

function v3Images(): Plugin {
  return {
    name: 'ro:v3-images',
    configureServer(server) {
      const files = new Map(sharedFiles());
      server.middlewares.use((req, res, next) => {
        const path = decodeURIComponent((req.url ?? '').split('?')[0]).replace(/^\/+/, '');
        const file = files.get(path);
        if (!file) return next();
        res.setHeader('Content-Type', types[extname(file).toLowerCase()] ?? 'application/octet-stream');
        res.setHeader('Cache-Control', 'no-cache');
        createReadStream(file).pipe(res);
      });
    },
    buildStart() {
      for (const [fileName, file] of sharedFiles()) {
        this.addWatchFile(file);
        this.emitFile({ type: 'asset', fileName, source: readFileSync(file) });
      }
    },
  };
}

/**
 * The hand-written service worker (sw/sw.js) gets the list of files to precache and a version
 * derived from their contents, then ships as dist/sw.js next to index.html (scope "./").
 */
function serviceWorker(): Plugin {
  const publicDir = resolve(root, 'public');
  /** Loaded on first view and cached then (cache-first, capped), not precached. */
  const runtimeOnly = /^(work\/|screenshots\/|icons\/(?!icon-192|apple-touch))|^me\/me-think/;
  return {
    name: 'ro:service-worker',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const hash = createHash('sha256');
      const precache: string[] = [];
      const add = (path: string, source: string | Uint8Array) => {
        if (runtimeOnly.test(path) || path.endsWith('.map')) return;
        precache.push(path);
        hash.update(path).update(source);
      };
      for (const [path, out] of Object.entries(bundle)) add(path, out.type === 'chunk' ? out.code : out.source);
      // files in public/ are copied by Vite after this hook, so read them from disk
      const walk = (dir: string, prefix = '') => {
        for (const name of readdirSync(dir)) {
          const file = join(dir, name);
          if (statSync(file).isDirectory()) walk(file, `${prefix}${name}/`);
          else add(prefix + name, readFileSync(file));
        }
      };
      if (existsSync(publicDir)) walk(publicDir);
      const source = readFileSync(resolve(root, 'sw/sw.js'), 'utf8');
      hash.update(source);
      const version = `${pkg.version}-${hash.digest('hex').slice(0, 10)}`;
      precache.sort((a, b) => (a === 'index.html' ? -1 : b === 'index.html' ? 1 : a.localeCompare(b)));
      const code = source
        .replace('self.__RO_VERSION__', JSON.stringify(version))
        .replace('self.__RO_PRECACHE__', JSON.stringify(precache, null, 2));
      this.emitFile({ type: 'asset', fileName: 'sw.js', source: code });
      console.log(`\n  sw.js ${version}: ${precache.length} files precached`);
    },
  };
}

export default defineConfig({
  // relative URLs everywhere: the app is served from a sub-folder (raminomrani.ir/app/)
  base: './',
  plugins: [react(), v3Images(), serviceWorker()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
  resolve: {
    // v3's data modules import React from their own folder; always use the app's single copy
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 4180,
    strictPort: true,
    fs: { allow: [root, resolve(v3, 'src'), resolve(v3, 'public/brand')] },
  },
  preview: { port: 4181, strictPort: true },
  build: {
    target: 'es2022',
    // fonts and images stay files, so the service worker can cache them
    assetsInlineLimit: (file) => file.endsWith('.svg'),
  },
});
