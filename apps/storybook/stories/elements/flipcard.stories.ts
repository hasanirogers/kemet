import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { EnumRoundedSizes } from '../../../../packages/ui/src/utilities/constants';

import '../../../../packages/ui/src/elements/flipcard';
import '../../../../packages/ui/src/elements/flipcard-trigger';
import '../../../../packages/ui/src/elements/button';



const meta: Meta = {
  title: 'Elements / Flipcard',
  component: 'kemet-flipcard',
  render: (args) => Template(args),
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    axis: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    rounded: {
      control: { type: 'select' },
      options: Object.values(EnumRoundedSizes),
    }
  },
  args: {
    flipped: false
  }
}
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <kemet-flipcard
    ?flipped="${args.flipped}"
    ?measure="${args.measure}"
    axis="${ifDefined(args.axis)}"
    ?flip-on-hover="${args.flipOnHover}"
    rounded="${ifDefined(args.rounded)}">
    <div slot="front" style="padding:0.5rem 1rem;">
      <p>This is the front of the card.</p>
      <kemet-flipcard-trigger>
        <kemet-button>Flip to the back</kemet-button>
      </kemet-flipcard-trigger>
    </div>
    <div slot="back" style="padding:0.5rem 1rem;">
      <p>This is the back of the card.</p>
      <kemet-flipcard-trigger>
        <kemet-button>Flip to the front</kemet-button>
      </kemet-flipcard-trigger>
    </div>
  </kemet-flipcard>
`;

export const Standard: Story = {};

export const Vertical: Story = {
  args: {
    axis: 'vertical',
  },
};

export const Rounded: Story = {
  args: {
    rounded: EnumRoundedSizes.MD,
  },
};

export const Hover: Story = {
  args: {
    flipOnHover: true,
  },
};
