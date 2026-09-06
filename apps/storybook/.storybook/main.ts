import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import type { StorybookConfig } from '@storybook/web-components-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.@(jsx|ts|tsx)'
  ],
  addons: [
    {
      name: getAbsolutePath("@storybook/addon-docs"),
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/preset-scss"),
    // getAbsolutePath("@chromatic-com/storybook")
  ],
  framework: {
    name: getAbsolutePath("@storybook/web-components-vite"),
    options: {}
  },
  docs: {}
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
