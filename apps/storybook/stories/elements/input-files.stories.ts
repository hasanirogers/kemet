import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';


import '../../../../packages/ui/src/elements/input-files';
import '../../../../packages/ui/src/elements/input-file';

const meta: Meta = {
  title: 'Elements / Input Files',
  component: 'kemet-input-files',
  args: {
    files: [
      {
        name: 'image.jpg',
        size: 2000000,
        loaded: 2000000,
        status: 'complete',
      },
      {
        name: 'image.png',
        size: 200000,
        loaded: 100000,
        status: 'uploading',
      },
      {
        name: 'package.zip',
        size: 8000000,
        loaded: 2000000,
        status: 'error',
        message: 'File size is too big.',
      },
    ],
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => {
  const uploadFiles: any[] = [];

  args.files.forEach((file: any) => {
    uploadFiles.push(html`
      <kemet-input-file name=${file.name} size=${file.size} loaded=${file.loaded} status=${file.status} message=${ifDefined(file.message)}></kemet-input-file>
    `);
  });

  return html`
    <kemet-input-files>
      ${uploadFiles}
    </kemet-input-files>
  `;
};

export const Standard: Story = {
  render: (args: any) => Template(args),
};
