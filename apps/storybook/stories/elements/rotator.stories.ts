import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { EnumEffects } from '../../../../packages/ui/src/elements/rotator';
import '../../../../packages/ui/src/elements/rotator';



const meta: Meta = {
  title: 'Elements / Rotator',
  component: 'kemet-rotator',
  render: args => Template(args),
  args: {
    speed: 3,
    messages: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Praesent ornare porta nulla.', 'Nulla ipsum felis, aliquet nec nisl sit amet, suscipit facilisis massa.']
  },
  argTypes: {
    effect: {
      control: { type: 'radio' },
      options: Object.values(EnumEffects),
    },
  },
  parameters: {
    layout: 'padded',
  }
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <kemet-rotator
    effect="${ifDefined(args.effect)}"
    speed=${args.speed}
    .messages="${args.messages}">
  </kemet-rotator>
`;

export const Standard: Story = {};

export const Flip: Story = {
  args: {
    effect: 'flip',
  },
};
