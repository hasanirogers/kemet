import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { EnumEffects } from '../../../../packages/ui/src/elements/drawer';
import { EnumDirections } from '../../../../packages/ui/src/utilities/constants';

import '../../../../packages/ui/src/elements/drawer';
import '../../../../packages/ui/src/elements/button';



const meta: Meta = {
  title: 'Elements / Drawer',
  component: 'kemet-drawer',
  render: args => Template(args),
  argTypes: {
    effect: {
      control: { type: 'select' },
      options: Object.values(EnumEffects),
    },
    side: {
      control: { type: 'select' },
      options: Object.values(EnumDirections),
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => {
  return html`
    <kemet-drawer
      ?opened=${args.opened}
      effect="${ifDefined(args.effect)}"
      side="${ifDefined(args.side)}"
      ?overlay=${args.overlay}
      ?fill-viewport=${args.fillViewport}>
      <aside slot="sidebar" style="padding:1rem;">
        <p>Your navigation goes here.</p>
        <kemet-button @click=${(event: any) => toggleDrawer(event)}>Toggle the Drawer</kemet-button>
      </aside>
      <main slot="body">
        <div style="padding:1rem;">
          <h2>Your content goes here.</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <br />
          <kemet-button @click=${(event: any) => toggleDrawer(event)}>Toggle the Drawer</kemet-button>
        </div>
      </main>
    </kemet-drawer>
  `;
};

const toggleDrawer = (event: any) => {
  const drawer = event.target.closest('kemet-drawer');
  drawer.opened = !drawer.opened;
};

export const Standard: Story = {};

export const FillViewport: Story = {
  args: {
    fillViewport: true,
  }
};

export const Overlay: Story = {
  args: {
    overlay: true,
  }
};

export const Top: Story = {
  args: {
    overlay: true,
    side: EnumDirections.Top
  }
};

export const Right: Story = {
  args: {
    overlay: true,
    side: EnumDirections.Right
  }
};

export const Bottom: Story = {
  args: {
    overlay: true,
    side: EnumDirections.Bottom
  }
};

export const Push: Story = {
  args: {
    overlay: true,
    effect: EnumEffects.Push
  }
};

export const Scale: Story = {
  args: {
    overlay: true,
    effect: EnumEffects.Scale
  }
};
