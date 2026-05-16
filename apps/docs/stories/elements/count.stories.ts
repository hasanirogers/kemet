import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

import '../../../../packages/ui/src/elements/count';

import '../../../../packages/ui/src/elements/input';
import '../../../../packages/ui/src/elements/field';
import '../../../../packages/ui/src/elements/tabs';
import '../../../../packages/ui/src/elements/tab';
import '../../../../packages/ui/src/elements/tab-panel';

const meta: Meta = {
  title: 'Form Controls / Count',
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
    status: {
      control: { type: 'radio' },
      options: ['standard', 'error', 'warning'],
    },
  }
};
export default meta;

type Story = StoryObj;

const Template = (args) => html`
  <kemet-field slug="unique-identifier" label="${args.label}" message="${args.message}" status="${args.status}">
    <kemet-input slot="input" name="input-field" status="${args.status}" validate-on-blur></kemet-input>
    <kemet-count slot="component" message="${args.remaining}" limit="${args.limit}" ?validate-immediately=${args.validateImmediately}></kemet-count>
  </kemet-field>
`;

export const Standard: Story = {
  render: args => Template(args),
};
