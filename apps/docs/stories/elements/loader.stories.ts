import { html } from 'lit';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { ifDefined } from 'lit/directives/if-defined.js';

import '../../../../packages/ui/src/elements/loader';

import '../../../../packages/ui/src/elements/tabs';
import '../../../../packages/ui/src/elements/tab';
import '../../../../packages/ui/src/elements/tab-panel';

import '../../.storybook/elements/docs-icons';
import { EnumVariants } from '../../../../packages/ui/src/elements/loader';


const meta: Meta = {
  title: 'Feedback & Status / Loader',
  component: 'kemet-loader',
  args: {
    variant: 'no-border',
    size: 240
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.values(EnumVariants),
    }
  }
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <kemet-loader variant=${args.variant} size=${ifDefined(args.size)}></kemet-loader>
`;

export const Standard: Story = {
  render: args => Template(args)
};
