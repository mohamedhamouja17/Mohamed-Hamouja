import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Vite automatically copies all files from the public directory into the dist root.
  // This ensures sitemap.xml, robots.txt, etc., are served from the root URL.
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
});