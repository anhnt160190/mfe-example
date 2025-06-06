import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'web-admin',
      filename: 'remoteEntry.js',
      remotes: {
        'mfe-web-auth': 'http://localhost:4001/assets/remoteEntry.js',
        'mfe-web-users': 'http://localhost:4002/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router'],
    }),
  ],
  server: {
    port: 4000,
  },
  build: {
    target: 'esnext',
  },
});
