import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // This maps @ to src/
    },
  },
  base: '/',
  server: { port: 5173, host: true, },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        format: 'iife', // <-- ✅ this is the key!
        entryFileNames: 'assets/index.js',
        assetFileNames: 'assets/index.css',
      },
    },
  },
});