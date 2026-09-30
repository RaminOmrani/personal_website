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
        prototypes: resolve(import.meta.dirname, 'prototypes.html'),
      },
    },
  },
});
