import { html } from 'lit';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';

import '../../../../packages/ui/src/elements/checkbox/';
import { ifDefined } from 'lit/directives/if-defined.js';

const meta: Meta = {
  title: 'Elements / Checkbox',
  component: 'kemet-checkbox',
  render: args => Template(args),
  args: {
    label: 'Label',
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <kemet-checkbox
    label=${args.label}
    ?checked=${args.checked}
    ?indeterminate=${args.indeterminate}
    ?disabled=${args.disabled}
    ?rounded=${args.rounded}
    ?filled=${args.filled}
    appearance=${ifDefined(args.appearance)}
  ></kemet-checkbox>
`;

export const Standard: Story = {};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
  }
};

export const Rounded: Story = {
  args: {
    rounded: true,
  }
};

export const Filled: Story = {
  args: {
    checked: true,
    filled: true,
  }
};

export const Brand: Story = {
  args: {
    appearance: 'brand',
  }
};

