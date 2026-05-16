import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

import '../../../../packages/ui/src/elements/multi-input';
import '../../../../packages/ui/src/elements/field';
import '../../../../packages/ui/src/elements/combo';

import '../../../../packages/ui/src/elements/tabs';
import '../../../../packages/ui/src/elements/tab';
import '../../../../packages/ui/src/elements/tab-panel';
import { EnumRoundedSizes, roundedSizes } from '../../../../packages/ui/src/utilities/constants';

const meta: Meta = {
  title: 'Form Controls / Multi Input',
  component: 'kemet-multi-input',
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
      options: roundedSizes
    }
  }
};
export default meta;

type Story = StoryObj;

const Template = args => html`
  <kemet-field slug="categories" label="Categories">
    <kemet-multi-input slot="input" name="categories" .rounded=${args.rounded} ?disabled=${args.disabled} ?filled=${args.filled} ?required=${args.required} ?validate-on-blur=${args.validateOnBlur}></kemet-multi-input>
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
