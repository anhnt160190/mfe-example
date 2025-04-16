import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfe-web-auth',
      filename: 'remoteEntry.js',
      exposes: {
        './pages': './src/exposes/pages.tsx',
        './hooks': './src/exposes/hooks.ts',
        './features': './src/exposes/features.ts',
      },
      shared: ['react', 'react-dom', 'react-router'],
    }),
  ],
  build: {
    target: 'esnext',
  },
});
