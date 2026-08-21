import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { EnumRoundedSizes } from '../../../../packages/ui/src/utilities/constants';

import '../../../../packages/ui/src/elements/avatar';
import '../../../../packages/ui/src/elements/avatars';


const meta: Meta = {
  title: 'Elements / Avatar',
  component: 'kemet-avatar',
  render: (args: any) => Template(args),
  args: {
    icon: 'person',
  },
  argTypes: {
    rounded: {
      options: Object.values(EnumRoundedSizes),
      control: { type: 'select' },
    }
  }
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <kemet-avatar
    ?circle=${args.circle}
    rounded=${ifDefined(args.rounded)}
    image="${ifDefined(args.image !== '' ? args.image : null)}"
    initials="${ifDefined(args.initials !== '' ? args.initials : null)}"
  >
    ${args.icon !== '' && args.icon ? html`<kemet-icon name=${args.icon} size="48" kemet-margin="xs"></kemet-icon>` : null}
    ${args.status ? html`<kemet-badge slot="status" appearance="success" style="border:2px solid white;"></kemet-badge>` : null}
  </kemet-avatar>
`;

const TemplateMultiple = (args: Args) => {
  const avatars = Array.from({ length: args.numOfAvatars }, () => {
    return html`<kemet-avatar rounded="circle" image="https://placehold.co/64x64" style="border:4px solid white;"></kemet-avatar>`
  });

  return html`
    <style>
      kemet-avatars {
        --kemet-avatars-squeeze: ${args.squeeze};
      }
    </style>
    <kemet-avatars>
      ${avatars}
    </kemet-avatars>
  `;
};

export const Standard: Story = {};

export const Initials: Story = {
  args: {
    initials: 'KU',
  }
};

export const Image: Story = {
  args: {
    image: 'https://placehold.co/64x64',
  }
};

export const Rounded: Story = {
  args: {
    rounded: EnumRoundedSizes.XL,
    image: 'https://placehold.co/64x64',
  }
};

export const Circle: Story = {
  args: {
    rounded: EnumRoundedSizes.Circle,
    image: 'https://placehold.co/64x64',
  }
};

export const Status: Story = {
  args: {
    rounded: EnumRoundedSizes.Circle,
    image: 'https://placehold.co/64x64',
    status: true,
  }
};

export const Multiple: Story = {
  render: (args: any) => TemplateMultiple(args),
  args: {
    squeeze: '-1.5rem',
    numOfAvatars: 3,
  }
};
