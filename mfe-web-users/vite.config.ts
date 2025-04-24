import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfe-web-users',
      filename: 'remoteEntry.js',
      exposes: {},
      shared: ['react', 'react-dom', 'react-router'],
    }),
  ],
  build: {
    target: 'esnext',
  },
});
