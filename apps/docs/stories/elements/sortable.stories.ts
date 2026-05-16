import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

import '../../../../packages/ui/src/elements/sortable';
import '../../../../packages/ui/src/elements/sortable-item';

import '../../../../packages/ui/src/elements/tabs';
import '../../../../packages/ui/src/elements/tab';
import '../../../../packages/ui/src/elements/tab-panel';

const meta: Meta = {
  title: 'Actions / Sortable',
  component: 'kemet-sortable',
  args: {
    numItems: 3,
  },
};
export default meta;

type Story = StoryObj;

const Template = (args) => {
  const items = [];

  for (let i = 0; i < args.numItems; i += 1) {
    items.push(html`<kemet-sortable-item>Item ${i + 1}</kemet-sortable-item>`);
  }

  return html`
    <kemet-sortable>
      ${items}
    </kemet-sortable>
  `;
};

export const Standard: Story = {
  render: args => Template(args),
};
