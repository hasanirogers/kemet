import { html } from 'lit';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { EnumAppearances } from '../../../../packages/ui/src/utilities/constants';

import '../../../../packages/ui/src/elements/field/';
import '../../../../packages/ui/src/elements/input/';
import '../../../../packages/ui/src/elements/textarea/';
import '../../../../packages/ui/src/elements/select/';
import '../../../../packages/ui/src/elements/select-option/';


const meta: Meta = {
  title: 'Elements / Field',
  component: 'kemet-accordion',
  args: {
    label: 'Label',
    message: 'This is a message.',
  },
  argTypes: {
    appearance: {
      name: 'Status',
      control: { type: 'select' },
      options: Object.values(EnumAppearances),
    },
  }
};
export default meta;

type Story = StoryObj;

const TemplateInput = (args: Args) => html`
  <kemet-field slug="unique-identifier" label="${args.label}" message="${args.message}" appearance="${args.appearance}">
    <kemet-input required slot="input" name="input-field" status="${args.status}" validate-on-blur></kemet-input>
  </kemet-field>
`;

const TemplateSelect = (args: Args) => html`
  <kemet-field slug="unique-identifier" label="${args.label}" message="${args.message}" appearance="${args.appearance}">
    <kemet-select slot="input" name="select-field" appearance="${args.appearance}" required>
      <kemet-select-option label="Choose an Item" value=""></kemet-select-option>
      <kemet-select-option label="Item 1" value="1"></kemet-select-option>
      <kemet-select-option label="Item 2" value="2" selected></kemet-select-option>
      <kemet-select-option label="Item 3" value="3"></kemet-select-option>
      <kemet-select-option label="Item 4" value="4" disabled></kemet-select-option>
    </kemet-select>
  </kemet-field>
`;

const TemplateTextarea = (args: Args) => html`
  <kemet-field slug="unique-identifier" label="${args.label}" message="${args.message}" appearance="${args.appearance}">
    <kemet-textarea required slot="input" name="textarea-field" status="${args.status}"></kemet-textarea>
  </kemet-field>
`;

export const Input: Story = {
  render: args => TemplateInput(args),
};

export const Select: Story = {
  render: args => TemplateSelect(args),
};

export const Textarea: Story = {
  render: args => TemplateTextarea(args),
};
