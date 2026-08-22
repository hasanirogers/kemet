import { html } from 'lit';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { EnumRoundedSizes } from '../../../../packages/ui/src/utilities/constants';

import '../../../../packages/ui/src/elements/input-combo';
import '../../../../packages/ui/src/elements/field';
import '../../../../packages/ui/src/elements/combo';

const meta: Meta = {
  title: 'Elements / Input Combo',
  component: 'kemet-input-combo',
  render: args => Template(args),
  args: {
    options: [
      'Art',
      'Automotive',
      'Bar',
      'Beauty',
      'Contractor',
      'Finance',
      'Market',
      'Medical',
      'Restaurant',
      'Technology',
    ],
  },
  argTypes: {
    rounded: {
      control: "select",
      options: Object.values(EnumRoundedSizes)
    }
  }
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <kemet-field slug="categories" label="Categories">
    <kemet-input-combo
      slot="input"
      name="categories"
      .rounded=${args.rounded}
      ?disabled=${args.disabled}
      ?filled=${args.filled}
      ?required=${args.required}
      ?validate-on-blur=${args.validateOnBlur}
    ></kemet-input-combo>
    <kemet-combo slot="component" .options=${args.options}></kemet-combo>
  </kemet-field>
`;

export const Standard: Story = {};

export const Required: Story = {
  args: {
    validateOnBlur: true,
    required: true,
  }
}

export const Rounded: Story = {
  args: {
    rounded: EnumRoundedSizes.MD
  }
}
