import { html } from 'lit';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { EnumAppearances, EnumRoundedSizes, roundedSizes } from '../../../../packages/ui/src/utilities/constants';

import '../../../../packages/ui/src/elements/select';
import '../../../../packages/ui/src/elements/select-option';


const meta: Meta = {
  title: 'Elements / Select',
  component: 'kemet-select',
  render: args => Template(args),
  argTypes: {
    appearance: {
      control: { type: 'select' },
      options: Object.values(EnumAppearances),
    },
    rounded: {
      control: { type: 'select' },
      options: Object.values(EnumRoundedSizes),
    },
  }
};
export default meta;

type Story = StoryObj;


const Template = (args: Args) => html`
<kemet-select .appearance=${args.appearance} ?required=${args.required} ?disabled=${args.disabled}  ?filled=${args.filled} .rounded=${args.rounded}>
  <kemet-select-option label="Choose an Item" value=""></kemet-select-option>
  <kemet-select-option label="Item 1" value="1"></kemet-select-option>
  <kemet-select-option label="Item 2" value="2" selected></kemet-select-option>
  <kemet-select-option label="Item 3" value="3"></kemet-select-option>
  <kemet-select-option label="Item 4" value="4" disabled></kemet-select-option>
</kemet-select>
`;

export const Standard: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Filled: Story = {
  args: {
    filled: true,
  },
};

export const Rounded: Story = {
  args: {
    rounded: true,
  },
};

export const Appearance: Story = {
  args: {
    appearance: 'brand',
  },
};

