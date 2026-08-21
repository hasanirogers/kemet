import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { EnumAppearances, EnumRoundedSizes } from '../../../../packages/ui/src/utilities/constants';
import { EnumInputModes } from '../../../../packages/ui/src/elements/input';

import '../../../../packages/ui/src/elements/textarea';


const meta: Meta = {
  title: 'Elements / Textarea',
  component: 'kemet-textarea',
  render: args => Template(args),
  argTypes: {
    appearance: {
      control: { type: 'select' },
      options: Object.values(EnumAppearances),
    },
    inputmode: {
      control: { type: 'select' },
      options: Object.values(EnumInputModes),
    },
    rounded: {
      control: { type: 'select' },
      options: Object.values(EnumRoundedSizes),
    },
  }
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`<kemet-textarea
  appearance=${ifDefined(args.appearance)}
  ?required=${args.required}
  ?validate-on-blur=${args.validateOnBlur}
  placeholder=${ifDefined(args.placeholder || null)}
  minlength=${ifDefined(args.minlength || null)}
  maxlength=${ifDefined(args.maxlength || null)}
  inputmode=${args.inputmode}
  ?autofocus=${args.autofocus}
  ?disabled=${args.disabled}
  ?readonly=${args.readonly}
  rows=${ifDefined(args.rows)}
  ?filled=${args.filled}
  .rounded=${args.rounded}
></kemet-textarea>`;

export const Standard: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const Filled: Story = {
  args: {
    filled: true
  }
};

export const Rounded: Story = {
  args: {
    rounded: EnumRoundedSizes.MD
  }
};

export const Appearance: Story = {
  args: {
    appearance: 'brand'
  }
};
