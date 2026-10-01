// Builds the whole domain into ./site, ready to upload to any static host:
//   /        the version chooser (chooser/)
//   /v1/     the dark, particle version (repo root)
//   /v2/     the light, simple version (v2/)
//   /v3/     the bright 3D film version (v3/)
//   /app/    the installable app (app/), when it exists
// Usage: node scripts/build-site.mjs              (runs npm ci + build in every project)
//        node scripts/build-site.mjs --no-install   (skip npm ci when node_modules are fresh)
//        node scripts/build-site.mjs --package      (also make release/raminomrani-site.tar.gz for the VPS;
//                                                    commit and push it, then on the server: setup-server.sh --update)
import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
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

// The Android app (deploy/android.json): Digital Asset Links, which prove the app and the site
// belong together (Google's entry once PWABuilder's signing-key fingerprint is filled in, and the
// check_validation entry Cafe Bazaar needs to verify a TWA), and the store / APK links that the
// chooser and the app show once they exist.
const android = JSON.parse(readFileSync(resolve(root, 'deploy/android.json'), 'utf8'));
const prints = android.sha256_cert_fingerprints ?? [];
for (const p of prints) {
  if (!/^([0-9A-F]{2}:){31}[0-9A-F]{2}$/i.test(p)) throw new Error(`deploy/android.json: "${p}" is not a SHA-256 fingerprint (AB:CD:… 32 pairs)`);
}
const assetlinks = [];
if (prints.length) {
  assetlinks.push({
    relation: ['delegate_permission/common.handle_all_urls'],
    target: { namespace: 'android_app', package_name: android.package, sha256_cert_fingerprints: prints.map((p) => p.toUpperCase()) },
  });
}
assetlinks.push({ relation: ['check_validation'], target: { namespace: 'cafebazaar_twa', package_name: android.package } });
mkdirSync(resolve(out, '.well-known'), { recursive: true });
writeFileSync(resolve(out, '.well-known/assetlinks.json'), JSON.stringify(assetlinks, null, 2) + '\n');
writeFileSync(resolve(out, 'app-links.json'), JSON.stringify({ package: android.package, apk: android.apk, stores: android.stores }, null, 2) + '\n');
if (!prints.length) console.log('\n! deploy/android.json has no signing-key fingerprint yet: assetlinks.json only has the Cafe Bazaar entry');

// custom domain for GitHub Pages branch deploys (Actions deploys set it in Settings → Pages instead)
writeFileSync(resolve(out, 'CNAME'), 'raminomrani.ir\n');
// Apache / cPanel hosts read this; Nginx and IIS use deploy/nginx and deploy/iis instead
cpSync(resolve(root, 'deploy/apache/.htaccess'), resolve(out, '.htaccess'));
console.log(`\n✓ site ready in ${out}`);

// --package: one file to upload to the VPS, with the setup script (see DEPLOY.md)
if (process.argv.includes('--package')) {
  const pkg = resolve(root, 'raminomrani-site');
  rmSync(pkg, { recursive: true, force: true });
  cpSync(out, resolve(pkg, 'site'), { recursive: true });
  cpSync(resolve(root, 'deploy/setup-server.sh'), resolve(pkg, 'setup-server.sh'));
  cpSync(resolve(root, 'deploy/nginx/raminomrani.ir.conf'), resolve(pkg, 'raminomrani.ir.conf'));
  mkdirSync(resolve(root, 'release'), { recursive: true });
  execSync('tar -czf release/raminomrani-site.tar.gz raminomrani-site', { cwd: root, stdio: 'inherit' });
  rmSync(pkg, { recursive: true, force: true });
  console.log(`✓ package ready: ${resolve(root, 'release/raminomrani-site.tar.gz')}`);
}
