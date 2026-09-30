// Builds the whole domain into ./site, ready to upload to any static host:
//   /        the version chooser (chooser/)
//   /v1/     the dark, particle version (repo root)
//   /v2/     the light, simple version (v2/)
//   /v3/     the bright 3D film version (v3/)
//   /app/    the installable app (app/), when it exists
// Usage: node scripts/build-site.mjs            (runs npm ci + build in every project)
//        node scripts/build-site.mjs --no-install (skip npm ci when node_modules are fresh)
import { execSync } from 'node:child_process';
import { cpSync, existsSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const out = resolve(root, 'site');
const install = !process.argv.includes('--no-install');
const run = (cmd, cwd) => {
  console.log(`\n> ${cmd}  (${cwd === root ? '.' : cwd.slice(root.length + 1)})`);
  execSync(cmd, { cwd, stdio: 'inherit' });
};

const hasApp = existsSync(resolve(root, 'app/package.json'));
for (const dir of [root, resolve(root, 'v2'), resolve(root, 'v3'), ...(hasApp ? [resolve(root, 'app')] : [])]) {
  if (install || !existsSync(resolve(dir, 'node_modules'))) run('npm ci', dir);
  run('npm run build', dir);
}

rmSync(out, { recursive: true, force: true });
cpSync(resolve(root, 'chooser'), out, { recursive: true });
cpSync(resolve(root, 'dist'), resolve(out, 'v1'), { recursive: true });
cpSync(resolve(root, 'v2/dist'), resolve(out, 'v2'), { recursive: true });
cpSync(resolve(root, 'v3/dist'), resolve(out, 'v3'), { recursive: true });
if (hasApp) cpSync(resolve(root, 'app/dist'), resolve(out, 'app'), { recursive: true });

// v2's hero-variant picker is a design tool, not part of the site
rmSync(resolve(out, 'v2/prototypes.html'), { force: true });
for (const f of readdirSync(resolve(out, 'v2/assets'))) if (f.startsWith('prototypes-')) rmSync(resolve(out, 'v2/assets', f));

// custom domain for GitHub Pages branch deploys (Actions deploys set it in Settings → Pages instead)
writeFileSync(resolve(out, 'CNAME'), 'raminomrani.ir\n');
// Apache / cPanel hosts read this; Nginx and IIS use deploy/nginx and deploy/iis instead
cpSync(resolve(root, 'deploy/apache/.htaccess'), resolve(out, '.htaccess'));
console.log(`\n✓ site ready in ${out}`);
