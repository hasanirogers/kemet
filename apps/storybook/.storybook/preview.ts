import { setCustomElementsManifest, Preview } from '@storybook/web-components-vite';
import prettier from 'prettier/standalone';
import * as html from 'prettier/plugins/html';

import {  handleThemeSwitching, globalFormatting } from './decorators';
import customElements from 'kemet-ui/custom-elements.json';


import '../../../packages/ui/dist/styles/tokens.css';
import '../../../packages/ui/dist/styles/native.css';
import '../../../packages/ui/dist/styles/utilities.css';

import './ausar.scss';
import './storybook.scss';

setCustomElementsManifest(customElements);

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'auset',
      toolbar: {
        icon: 'circlehollow',
        // Array of plain string values or MenuItem shape (see below)
        items: ['auset', 'ausar'],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },

  decorators: [globalFormatting, handleThemeSwitching],

  parameters: {
    layout: 'centered',
    backgrounds: { disabled: true },
    docs: {
      codePanel: true,
      source: {
        type: 'dynamic',
        excludeDecorators: true,
        transform: async (src: string) => {
          if (!src) return src;
          try {
            const cleaned = src.replace(/\s+([a-zA-Z_:][a-zA-Z0-9_.:-]*)=""/g, ' $1'); // collapse empty attrs
            return await prettier.format(cleaned, {
              parser: 'html',
              plugins: [html],
              tabWidth: 2,
              printWidth: 80,
            });
          } catch {
            return src; // fallback if Prettier fails
          }
        },
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Introduction',
          'Styles API',
          ['Config', 'Core API'],
          'Icons',
          'Actions',
          'Form Controls',
          'Interactive',
          'Feedback & Status',
          'Organization',
          'Miscellaneous',
          'Templates'
        ],
      },
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  }
};

export default preview;
