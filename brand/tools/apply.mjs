// Copies the brand kit into the sites and the app (run after build.mjs, then app/scripts/make-icons.mjs).
//   node brand/tools/apply.mjs
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const b = (p) => resolve(root, 'brand', p);
const copies = {
  'svg/mark.svg': ['v3/public/brand/logo-mark.svg', 'chooser/logo.svg', 'v2/public/brand-mark.svg'],
  'svg/favicon.svg': ['public/favicon.svg', 'v2/public/favicon.svg', 'v3/public/favicon.svg', 'chooser/favicon.svg'],
  'png/mark-512.png': ['v3/public/brand/logo-mark-512.png'],
  'png/icon-192.png': ['v3/public/brand/icon-192.png'],
  'png/logo-fa-600.png': ['v3/public/brand/logo-lockup.png'],
  'png/apple-touch-icon-180.png': ['v3/public/apple-touch-icon.png', 'chooser/apple-touch-icon.png'],
};
for (const [src, dsts] of Object.entries(copies)) {
  for (const d of dsts) {
    copyFileSync(b(src), resolve(root, d));
    console.log(`${src} -> ${d}`);
  }
}
