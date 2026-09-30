import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2022',
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        // the English page: same app, same folder (so relative asset paths hold), its own <head>
        en: resolve(import.meta.dirname, 'en.html'),
        prototypes: resolve(import.meta.dirname, 'prototypes.html'),
      },
    },
  },
});
