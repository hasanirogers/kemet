import { html } from 'lit';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { EnumAppearances } from '../../../../packages/ui//src/utilities/constants';

import '../../../../packages/ui/src/elements/count';
import '../../../../packages/ui/src/elements/input/';
import '../../../../packages/ui/src/elements/field/';


const meta: Meta = {
  title: 'Elements / Count',
  component: 'kemet-count',
  args: {
    label: 'Label',
    message: 'Too many characters!',
    status: 'standard',
    remaining: 'characters remaining.',
    validateImmediately: true,
    limit: 8,
  },
  argTypes: {
    appearance: {
      control: { type: 'select' },
      options: Object.values(EnumAppearances),
    },
  }
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <kemet-field slug="unique-identifier" label="${args.label}" message="${args.message}" appearance="${args.appearance}">
    <kemet-input slot="input" name="input-field" appearance="${args.appearance}" validate-on-blur></kemet-input>
    <kemet-count slot="component" message="${args.remaining}" limit="${args.limit}" ?validate-immediately=${args.validateImmediately}></kemet-count>
  </kemet-field>
`;

export const Standard: Story = {
  render: args => Template(args),
};
