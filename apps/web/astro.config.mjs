// @ts-check
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  vite: {
    resolve: {
      alias: {
        'kemet-ui': path.resolve(__dirname, '../../packages/ui/src'),
      },
    }
  },
});
