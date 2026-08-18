import { html } from 'lit';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { ifDefined } from 'lit/directives/if-defined.js';


import '../../../../packages/ui/src/elements/badge';

import '../../../../packages/ui/src/elements/icon';
import { EnumRoundedSizes, EnumAppearances, roundedSizes } from '../../../../packages/ui/src/utilities/constants';

const meta: Meta = {
  title: 'Feedback & Status / Badge',
  component: 'kemet-badge',
  render: args => Template(args),
  argTypes: {
    appearance: {
      control: { type: 'select' },
      options: Object.values(EnumAppearances),
    },
    rounded: {
      control: { type: 'select' },
      options: roundedSizes,
    },
  }
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <kemet-badge
    appearance=${ifDefined(args.appearance)}
    rounded=${ifDefined(args.rounded)}
    ?outlined=${args.outlined}
    circle-padding=${ifDefined(args.circlePadding)}>
    ${args.left}
    ${args.rounded === EnumRoundedSizes.Circle ? html`<kemet-icon name="cart3"></kemet-icon>&nbsp;3` : 'Badge'}
    ${args.right}
  </kemet-badge>
`;

export const Standard: Story = {};

export const Rounded: Story = {
  args: {
    rounded: EnumRoundedSizes.MD,
  }
}

export const Pill: Story = {
  args: {
    rounded: EnumRoundedSizes.Pill,
  },
};

export const Circle: Story = {
  args: {
    rounded: EnumRoundedSizes.Circle,
    circlePadding: 24,
  },
};

export const LeftIcon: Story = {
  args: {
    left: html`<kemet-icon slot="left" name="tag-fill" size="15"></kemet-icon>`,
  },
};

export const RightIcon: Story = {
  args: {
    right: html`<kemet-icon slot="right" name="x-circle-fill" size="15"></kemet-icon>`,
  },
};

export const Outlined: Story = {
  args: {
    outlined: true,
  }
};

export const Success: Story = {
  args: {
    appearance: EnumAppearances.Success,
  },
};

export const Warning: Story = {
  args: {
    appearance: EnumAppearances.Warning,
  },
};

export const Error: Story = {
  args: {
    appearance: EnumAppearances.Error,
  },
};
