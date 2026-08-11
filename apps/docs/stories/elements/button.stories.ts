import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { EnumVariants } from '../../../../packages/ui/src/elements/button';
import { EnumRoundedSizes, roundedSizes } from '../../../../packages/ui/src/utilities/constants';

import '../../../../packages/ui/src/elements/button';

import '../../../../packages/ui/src/elements/tabs';
import '../../../../packages/ui/src/elements/tab';
import '../../../../packages/ui/src/elements/tab-panel';

import '../../../../packages/ui/src/elements/icon';
import '../../../../packages/ui/src/elements/loader';



const meta: Meta = {
  title: 'Actions / Button',
  component: 'kemet-button',
  render: args => Template(args),
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.values(EnumVariants),
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
  <kemet-button 
    variant="${ifDefined(args.variant)}" 
    ?disabled=${args.disabled} 
    href=${ifDefined(args.href !== '' ? args.href : undefined)} 
    rounded=${ifDefined(args.rounded)}
    loading=${ifDefined(args.loading)}
  >
    Kemet Button
    ${!!args.iconLeft ? html`<kemet-icon slot="left" name="${args.iconLeft}" size="18"></kemet-icon>` : ''}
    ${!!args.iconRight ? html`<kemet-icon slot="right" name="${args.iconRight}" size="18"></kemet-icon>` : ''}
    ${args.loading ? html`<kemet-loader variant="three-dots" slot="loader" size="12"></kemet-loader>` : ''}
    ${!!args.iconButton ? html`<kemet-icon slot="icon-button" name="house" library="fontawesome" family="solid" size="24"></kemet-icon>` : ''}
  </kemet-button>
`;


export const Standard: Story = {
  args: {
    href: "https://google.com"
  }
};

export const Text: Story = {
  args: {
    variant: EnumVariants.TEXT,
  },
};

export const IconButton: Story = {
  render: args => Template(args),
  args: {
    iconButton: true,
  },
};

export const Rounded: Story = {
  render: args => Template(args),
  args: {
    rounded: EnumRoundedSizes.MD,
  },
};

export const Pill: Story = {
  render: args => Template(args),
  args: {
    rounded: EnumRoundedSizes.PILL,
  },
};

export const Outlined: Story = {
  render: args => Template(args),
  args: {
    variant: EnumVariants.OUTLINED,
  },
};

export const OutlinedRounded: Story = {
  render: args => Template(args),
  args: {
    variant: EnumVariants.OUTLINED,
    rounded: EnumRoundedSizes.MD,
  },
};

export const OutlinedPill: Story = {
  render: args => Template(args),
  args: {
    variant: EnumVariants.OUTLINED,
    rounded: EnumRoundedSizes.PILL,
  },
};

export const Edge: Story = {
  render: args => Template(args),
  args: {
    variant: EnumVariants.EDGE,
  },
};

export const Plain: Story = {
  render: args => Template(args),
  args: {
    variant: EnumVariants.PLAIN,
  },
};

export const IconLeft: Story = {
  render: args => Template(args),
  args: {
    iconLeft: 'chevron-left',
  },
};

export const IconRight: Story = {
  render: args => Template(args),
  args: {
    iconRight: 'chevron-right',
  },
};

export const Link: Story = {
  args: {
    href: 'https://google.com',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

