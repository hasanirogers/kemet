import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

import '../../../../packages/ui/src/elements/icon-lucide';
import '../../../../packages/ui/src/elements/button';

import '../../../../packages/ui/src/elements/tabs';
import '../../../../packages/ui/src/elements/tab';
import '../../../../packages/ui/src/elements/tab-panel';

import '../../.storybook/elements/docs-icons';


const meta: Meta = {
  title: 'Icons / Lucide',
  component: 'kemet-icon-lucide',
  args: {
    icon: 'code',
    size: 24,
  },
};
export default meta;

type Story = StoryObj;

const Template = args => html`
  <kemet-icon-lucide icon=${args.icon} size=${args.size}></kemet-icon-lucide>
`;

export const Standard: Story = {
  render: args => Template(args)
};
