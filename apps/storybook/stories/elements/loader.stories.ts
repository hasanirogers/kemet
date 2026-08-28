import { html } from 'lit';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { ifDefined } from 'lit/directives/if-defined.js';

import '../../../../packages/ui/src/elements/loader';
import { EnumVariants } from '../../../../packages/ui/src/elements/loader';


const meta: Meta = {
  title: 'Elements / Loader',
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

export const NoBorder: Story = {};

export const BorderTop: Story = {
  args: {
    variant: 'border-top'
  }
};

export const DoubleBorder: Story = {
  args: {
    variant: 'double-border'
  }
};

export const DoubleSpinners: Story = {
  args: {
    variant: 'double-spinners'
  }
};

export const ThreeDots: Story = {
  args: {
    variant: 'three-dots',
    size: 24
  }
};

export const FullCircle: Story = {
  args: {
    variant: 'full-circle',
    size: 24
  }
};

export const Spinner: Story = {
  args: {
    variant: 'spinner'
  }
};

export const Mesh: Story = {
  args: {
    variant: 'mesh',
    size: 24
  }
};



