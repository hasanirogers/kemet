import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { EnumAppearances, EnumRoundedSizes } from '../../../../packages/ui/src/utilities/constants';

import '../../../../packages/ui/src/elements/fab/';
import '../../../../packages/ui/src/elements/icon';

const meta: Meta = {
  title: 'Elements / FAB',
  component: 'kemet-fab',
  render: (args: any) => Template(args),
  args: {
    label: 'Action',
  },
  argTypes: {
    rounded: {
      control: 'select',
      options: Object.values(EnumRoundedSizes),
    },
    appearance: {
      control: 'select',
      options: Object.values(EnumAppearances),
    },
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <kemet-fab
    ?expanded=${args.expanded}
    ?outlined=${args.outlined}
    ?disabled=${args.disabled}
    expand-point=${ifDefined(args.expandPoint || null)}
    collapse-point=${ifDefined(args.collapsePoint || null)}
    rounded=${ifDefined(args.rounded || null)}
    appearance=${ifDefined(args.appearance || null)}>
    <kemet-icon slot="icon" name="pencil-square" size="24"></kemet-icon>
    ${args.label}
  </kemet-fab>
`;

const TemplateMultiple = () => html`
  <style>
    .fabs {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 1rem;
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      z-index: 99;
      padding: 0;
      margin: 0;
      list-style: none;
    }
  </style>
  <ul class="fabs">
    <li>
      <kemet-fab rounded="pill">
        <kemet-icon slot="icon" name="envelope" size="24"></kemet-icon> Email
      </kemet-fab>
    </li>
    <li>
      <kemet-fab rounded="pill">
        <kemet-icon slot="icon" name="calendar" size="24"></kemet-icon> Calendar
      </kemet-fab>
    </li>
    <li>
      <kemet-fab rounded="pill">
        <kemet-icon slot="icon" name="pencil-square" size="24"></kemet-icon> Edit
      </kemet-fab>
    </li>
  </ul>
`;

export const Standard: Story = {};

export const Outlined: Story = {
  args: {
    outlined: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Rounded: Story = {
  args: {
    rounded: 'lg',
  },
};

export const Appearance: Story = {
  args: {
    appearance: EnumAppearances.Brand,
  },
};

export const Multiple: Story = {
  render: () => TemplateMultiple(),
}
