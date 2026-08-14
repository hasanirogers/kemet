import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { EnumSizes, EnumVariants } from '../../../../packages/ui/src/elements/button';
import { EnumAppearances, EnumRoundedSizes, roundedSizes } from '../../../../packages/ui/src/utilities/constants';

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
    size: {
      control: { type: 'select' },
      options: Object.values(EnumSizes),
    },
    polarity: {
      control: { type: 'radio' },
      options: ['light', 'dark'],
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(EnumVariants),
    },
    rounded: {
      control: { type: 'select' },
      options: roundedSizes,
    },
    appearance: {
      control: { type: 'select' },
      options: Object.values(EnumAppearances),
    },
  }
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <kemet-button
    variant="${ifDefined(args.variant)}"
    appearance="${ifDefined(args.appearance)}"
    size="${ifDefined(args.size)}"
    polarity="${ifDefined(args.polarity)}"
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

export const IconButton: Story = {
  args: {
    iconButton: true,
  },
};

export const RoundedMedium: Story = {
  args: {
    rounded: EnumRoundedSizes.MD,
  },
};

export const RoundedPill: Story = {
  args: {
    rounded: EnumRoundedSizes.PILL,
  },
};

export const VariantText: Story = {
  args: {
    variant: EnumVariants.Text,
  },
};

export const VariantOutlined: Story = {
  args: {
    variant: EnumVariants.Outlined,
  },
};

export const VariantEdge: Story = {
  args: {
    variant: EnumVariants.Edge,
  },
};

export const VariantPlain: Story = {
  args: {
    variant: EnumVariants.Plain,
  },
};

export const AppearanceBrand: Story = {
  args: {
    appearance: EnumAppearances.Brand,
  },
};

export const AppearanceInfo: Story = {
  args: {
    appearance: EnumAppearances.Info,
  },
};

export const OutlinedRounded: Story = {
  args: {
    variant: EnumVariants.Outlined,
    rounded: EnumRoundedSizes.MD,
  },
};

export const OutlinedPill: Story = {
  args: {
    variant: EnumVariants.Outlined,
    rounded: EnumRoundedSizes.PILL,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: EnumSizes.XLarge,
  },
};

export const ExtraSmall: Story = {
  args: {
    size: EnumSizes.XSmall,
  },
};

export const IconLeft: Story = {
  args: {
    iconLeft: 'chevron-left',
  },
};

export const IconRight: Story = {
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

