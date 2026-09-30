import { defineConfig, type Plugin } from 'vite';
import { site, ui } from './src/content';
import { listSamples, renderApp, renderHead, renderPreloader } from './src/render';

/**
 * Pre-renders the whole page into index.html at build time,
 * so visitors (and search engines) get real HTML before any JavaScript runs.
 */
function prerender(): Plugin {
  let dev = false;
  return {
    name: 'prerender-portfolio',
    configResolved(config) {
      dev = config.command === 'serve';
    },
    buildStart() {
      if (dev) return;
      const samples = listSamples();
      if (samples.length) {
        this.warn(
          `\n⚠  ${samples.length} placeholder item(s) are still marked "sample: true" in src/content.ts:\n` +
            samples.map((s) => `   • ${s}`).join('\n') +
            '\n   Replace them with your real content before publishing.\n',
        );
      }
    },
    transformIndexHtml(html) {
      const lang = site.defaultLang;
      const year = new Date().getFullYear();
      const head = renderHead(lang);
      const replacements: Record<string, string> = {
        '%LANG%': lang,
        '%DIR%': lang === 'fa' ? 'rtl' : 'ltr',
        '%TITLE%': head.title,
        '%DESCRIPTION%': head.description,
        '%URL%': site.url,
        '%JSONLD%': head.jsonLd.replace(/</g, '\\u003c'),
        '%SKIP%': ui.skip[lang],
        '%PRELOADER%': renderPreloader(lang, year),
        '%APP%': renderApp(lang, { dev, year }),
      };
      return html.replace(/%[A-Z]+%/g, (key) => replacements[key] ?? key);
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [prerender()],
  build: {
    target: 'es2022',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 900,
  },
});
