import { html } from 'lit';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { ifDefined } from 'lit/directives/if-defined.js';


import '../../../../packages/ui/src/elements/badge';

import '../../../../packages/ui/src/elements/tabs';
import '../../../../packages/ui/src/elements/tab';
import '../../../../packages/ui/src/elements/tab-panel';

import '../../../../packages/ui/src/elements/icon-bootstrap';
import { EnumRoundedSizes, EnumAppearances, roundedSizes, appearances } from '../../../../packages/ui/src/utilities/constants';

const meta: Meta = {
  title: 'Feedback & Status / Badge',
  component: 'kemet-badge',
  render: args => Template(args),
  argTypes: {
    status: {
      control: { type: 'select' },
      options: appearances,
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
  <kemet-badge status=${ifDefined(args.status)} rounded=${ifDefined(args.rounded)} ?outlined=${args.outlined} circle-padding=${ifDefined(args.circlePadding)}>
    ${args.left}
    ${args.rounded === EnumRoundedSizes.CIRCLE ? html`<kemet-icon-bootstrap icon="cart3"></kemet-icon-bootstrap>&nbsp;3` : 'Badge'}
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
    rounded: EnumRoundedSizes.PILL,
  },
};

export const Circle: Story = {
  args: {
    rounded: EnumRoundedSizes.CIRCLE,
    circlePadding: 24,
  },
};

export const LeftIcon: Story = {
  args: {
    left: html`<kemet-icon-bootstrap slot="left" icon="tag-fill" size="15"></kemet-icon-bootstrap>`,
  },
};

export const RightIcon: Story = {
  args: {
    right: html`<kemet-icon-bootstrap slot="right" icon="x-circle-fill" size="15"></kemet-icon-bootstrap>`,
  },
};

export const Outlined: Story = {
  args: {
    outlined: true,
  }
};

export const Success: Story = {
  args: {
    status: EnumAppearances.Success,
  },
};

export const Warning: Story = {
  args: {
    status: EnumAppearances.Warning,
  },
};

export const Error: Story = {
  args: {
    status: EnumAppearances.Error,
  },
};
