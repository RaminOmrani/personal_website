// Renders both pages to static HTML after the client build, so visitors and
// search engines get real content before JavaScript loads:
// dist/index.html in Persian and dist/en.html in English, side by side so every
// relative asset path works the same on both.
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = import.meta.dirname;
const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);

for (const [name, lang] of [
  ['index.html', 'fa'],
  ['en.html', 'en'],
]) {
  const file = resolve(root, 'dist', name);
  const html = readFileSync(file, 'utf8');
  if (!html.includes('<!--app-->')) throw new Error(`dist/${name} has no <!--app--> placeholder`);
  if (!html.includes(`data-lang="${lang}"`)) throw new Error(`dist/${name} is not marked data-lang="${lang}"`);
  writeFileSync(file, html.replace('<!--app-->', render(lang)));
  console.log(`prerendered dist/${name} (${lang})`);
}
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true });
