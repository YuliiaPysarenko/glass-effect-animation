import { defineConfig } from 'vite';

export default defineConfig({
  base: '/glass-effect-animation/',
  build: {
    outDir: "dist",
  },
  server: {
    open: true
  }
});