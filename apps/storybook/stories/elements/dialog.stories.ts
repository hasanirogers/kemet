import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js'
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import Dialog, { EnumEffects } from '../../../../packages/ui/src/elements/dialog';
import { EnumRoundedSizes, roundedSizes } from '../../../../packages/ui/src/utilities/constants';

import '../../../../packages/ui/src/elements/dialog';
import '../../../../packages/ui/src/elements/dialog-close';
import '../../../../packages/ui/src/elements/button';
import '../../../../packages/ui/src/elements/icon';


const meta: Meta = {
  title: 'Elements / Dialog',
  component: 'kemet-dialog',
  args: {
    displayCloseBtn: true,
  },
  render: (args) => Template(args),
  argTypes: {
    effect: {
      control: { type: 'select' },
      options: Object.values(EnumEffects),
    },
    rounded: {
      control: { type: 'select' },
      options: roundedSizes,
    }
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => {
  const openDialog = () => {
    const dialog = document.querySelector('kemet-dialog') as Dialog;
    dialog.opened = true;
  };

  const makeCloseBtn = (display: any) => {
    if (display) {
      return html`
        <kemet-dialog-close tabindex="0" role="button" aria-label="Close Button" style="display:flex;">
          <kemet-icon name="x-circle" size="24"></kemet-icon>
        </kemet-dialog-close>
      `;
    }

    return null;
  };

  return html`
    <kemet-button @click="${() => openDialog()}">Open Modal</kemet-button>
    <kemet-dialog ?opened=${args.opened} rounded=${ifDefined(args.rounded)} effect="${ifDefined(args.effect)}" ?close-on-click="${args.closeOnClick}">
      <div style="padding:2rem;">
        ${makeCloseBtn(args.displayCloseBtn)}
        <h2 style="margin:0;">Modal Title</h2>
        <p>Your modal contents <a href="http://google.com"><strong>here</strong></a>.</p>
      </div>
    </kemet-dialog>
  `;
};

export const Standard: Story = {};

export const Rounded: Story = {
  args: {
    rounded: EnumRoundedSizes.MD
  }
};
