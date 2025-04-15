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
        './LoginPage': './src/pages/auth/Login.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'esnext',
  },
});
