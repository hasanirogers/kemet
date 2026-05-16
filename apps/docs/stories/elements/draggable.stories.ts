import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

import '../../../../packages/ui/src/elements/draggable';

import '../../../../packages/ui/src/elements/tabs';
import '../../../../packages/ui/src/elements/tab';
import '../../../../packages/ui/src/elements/tab-panel';

import '../../../../packages/ui/src/elements/button';

const meta: Meta = {
  title: 'Actions / Draggable',
  component: 'kemet-draggable',
  args: {
    text: 'Drag Me',
    memory: 'kemet-draggable-demo',
  },
};
export default meta;

type Story = StoryObj;

const Template = (args) => html`
  <kemet-draggable memory=${ifDefined(args.memory || undefined)}>
    <kemet-button>${args.text}</kemet-button>
  </kemet-draggable>
`;

export const Standard: Story = {
  render: args => Template(args),
};
