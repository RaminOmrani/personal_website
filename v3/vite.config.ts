import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1200,
    rolldownOptions: {
      // two pages, one app: Persian (index.html, right to left) and English (en.html, left to right)
      input: { main: resolve(import.meta.dirname, 'index.html'), en: resolve(import.meta.dirname, 'en.html') },
    },
  },
});
