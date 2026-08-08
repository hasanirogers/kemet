import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'kemet-ui': path.resolve(__dirname, '../../packages/ui/dist'),
    },
  },
  server: {
    port: 5173,
  },
});
