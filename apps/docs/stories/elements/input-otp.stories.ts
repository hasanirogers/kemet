import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';

import '../../../../packages/ui/src/elements/input-otp';

const meta: Meta = {
  title: 'Elements / Input OTP',
  component: 'kemet-input-otp',
  render: (args: Args) => Template(args),
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => {
  return html`
    <kemet-input-otp digits=${ifDefined(args.digits)} pattern=${ifDefined(args.pattern)}></kemet-input-otp>
  `;
};

export const Standard: Story = {};

export const FourDigits: Story = {
  args: {
    digits: 4
  }
}

export const StripSpecialCharacters: Story = {
  args: {
    pattern: '[^A-Za-z0-9]'
  }
}
