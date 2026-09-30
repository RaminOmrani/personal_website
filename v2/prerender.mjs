// Renders each language's page to static HTML after the client build, so visitors and
// search engines get real content before JavaScript loads.
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = import.meta.dirname;
const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);

// both pages sit side by side in dist/, so every relative asset path works from either
const pages = [
  { file: 'index.html', lang: 'fa' },
  { file: 'en.html', lang: 'en' },
];

for (const { file, lang } of pages) {
  const path = resolve(root, 'dist', file);
  const html = readFileSync(path, 'utf8');
  if (!html.includes('<!--app-->')) throw new Error(`dist/${file} has no <!--app--> placeholder`);
  if (!html.includes(`<html lang="${lang}"`)) throw new Error(`dist/${file} is not a lang="${lang}" page`);
  writeFileSync(path, html.replace('<!--app-->', render(lang)));
  console.log(`prerendered dist/${file} (${lang})`);
}
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true });
