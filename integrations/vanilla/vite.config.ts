import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    port: 5173,
    fs: {
      // Allow serving files from parent directories
      allow: ['..'],
    },
  },
  // Configure the public directory to serve from UI dist
  publicDir: path.resolve(__dirname, '../../packages/ui/dist'),
});
