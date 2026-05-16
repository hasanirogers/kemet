import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js'
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import KemetModal, { effects } from '../../../../packages/ui/src/elements/modal';

import '../../../../packages/ui/src/elements/modal';
import '../../../../packages/ui/src/elements/modal-close';

import '../../../../packages/ui/src/elements/tabs';
import '../../../../packages/ui/src/elements/tab';
import '../../../../packages/ui/src/elements/tab-panel';
import '../../../../packages/ui/src/elements/button';

import '../../../../packages/ui/src/elements/icon-bootstrap';
import { EnumRoundedSizes, roundedSizes } from '../../../../packages/ui/src/utilities/constants';

const meta: Meta = {
  title: 'Organization / Modal',
  component: 'kemet-modal',
  args: {
    displayCloseBtn: true,
  },
  render: (args) => Template(args),
  argTypes: {
    effect: {
      control: { type: 'select' },
      options: effects,
    },
    rounded: {
      control: { type: 'select' },
      options: roundedSizes,
    }
  },
};
export default meta;

type Story = StoryObj;

const Template = (args) => {
  const openModal = () => {
    const modal = document.querySelector('kemet-modal') as KemetModal;
    modal.opened = true;
  };

  const makeCloseBtn = (display) => {
    if (display) {
      return html`
        <kemet-modal-close tabindex="0" role="button" aria-label="Close Button" style="display:flex;">
          <kemet-icon-bootstrap icon="x-circle" size="24" kemet-background-color="white" kemet-border-radius="circle"></kemet-icon-bootstrap>
        </kemet-modal-close>
      `;
    }

    return null;
  };

  return html`
    <kemet-button @click="${() => openModal()}">Open Modal</kemet-button>
    <kemet-modal ?opened=${args.opened} rounded=${ifDefined(args.rounded)} effect="${ifDefined(args.effect)}" ?close-on-click="${args.closeOnClick}">
      <div kemet-padding="xl">
        ${makeCloseBtn(args.displayCloseBtn)}
        <h2 kemet-margin="none">Modal Title</h2>
        <p>Your modal contents <a href="http://google.com" kemet-color="primary"><strong>here</strong></a>.</p>
      </div>
    </kemet-modal>
  `;
};

export const Standard: Story = {};

export const Rounded: Story = {
  args: {
    rounded: EnumRoundedSizes.MD
  }
};
