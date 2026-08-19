import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { EnumElevation } from '../../../../packages/ui/src/elements/card';
import { EnumRoundedSizes } from '../../../../packages/ui/src/utilities/constants';

import '../../../../packages/ui/src/elements/card';
import '../../../../packages/ui/src/elements/avatar';
import '../../../../packages/ui/src/elements/icon';


const meta: Meta = {
  title: 'Organization / Card',
  component: 'kemet-card',
  render: (args: any) => Template(args),
  args: {
    bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    captionText: '',
    isCentered: false,
  },
  argTypes: {
    mediaType: {
      control: { type: 'radio' },
      options: ['none', 'image', 'avatar', 'video', 'embed'],
    },
    elevation: {
      control: { type: 'select' },
      options: Object.values(EnumElevation),
    },
    rounded: {
      control: { type: 'select' },
      options: Object.values(EnumRoundedSizes),
    },
  }
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <kemet-card
    ?center=${args.isCentered}
    ?filled=${args.filled}
    elevation="${ifDefined(args.elevation)}"
    rounded="${ifDefined(args.rounded)}"
    ?borderless=${args.borderless}
  >
    ${args.showHeader ? html`<div slot="header">This is the header.</div>` : null}
    ${showMedia(args.mediaType)}
    ${args.captionText && args.captionText !== '' ? html`<div slot="caption">${args.captionText}</div>` : null}
    ${args.bodyText}
    ${args.showFooter ? html`<div slot="footer">This is the footer.</div>` : null}
  </kemet-card>
`;

const showMedia = (type: string) => {
  if (type === 'image') {
    return html`<img slot="media" src="https://placehold.co/1920x1080" alt="a placeholder" />`;
  }

  if (type === 'avatar') {
    return html`
      <kemet-avatar circle slot="media">
        <kemet-icon size="196" name="person"></kemet-icon>
      </kemet-avatar>
    `;
  }

  if (type === 'video') {
    return html`
      <video slot="media" controls style="width:100%; aspect-ratio:16/9">
        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
  }

  if (type === 'embed') {
    return html`
      <iframe slot="media" width="100%" style="aspect-ratio:16/9;" src="https://www.youtube.com/embed/5gBqTXctxO8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
  }

  return null;
};

export const Standard: Story = {};

export const Header: Story = {
  args: {
    showHeader: true
  }
};

export const Footer: Story = {
  args: {
    showFooter: true
  }
};

export const HeaderAndFooter: Story = {
  args: {
    showHeader: true,
    showFooter: true
  }
};

export const Image: Story = {
  args: {
    mediaType: 'image'
  }
};

export const Video: Story = {
  args: {
    mediaType: 'video'
  }
};

export const Embed: Story = {
  args: {
    mediaType: 'embed'
  }
};

export const Avatar: Story = {
  args: {
    mediaType: 'avatar',
    isCentered: true
  }
};

export const Full: Story = {
  args: {
    mediaType: 'embed',
    showHeader: true,
    showFooter: true,
  }
}

export const Rounded: Story = {
  args: {
    rounded: EnumRoundedSizes.MD
  }
}

export const Filled: Story = {
  args: {
    filled: true
  }
}

export const Elevation: Story = {
  args: {
    elevation: 'level5'
  }
}
