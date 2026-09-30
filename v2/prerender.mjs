// Renders the page to static HTML after the client build, so visitors and
// search engines get real content before JavaScript loads.
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = import.meta.dirname;
const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);

const file = resolve(root, 'dist/index.html');
const html = readFileSync(file, 'utf8');
if (!html.includes('<!--app-->')) throw new Error('dist/index.html has no <!--app--> placeholder');
writeFileSync(file, html.replace('<!--app-->', render()));
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true });
console.log('prerendered dist/index.html');
