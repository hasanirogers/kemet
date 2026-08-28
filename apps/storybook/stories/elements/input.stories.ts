import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import { EnumRoundedSizes, EnumAppearances } from '../../../../packages/ui/src/utilities/constants';
import { EnumInputModes, EnumInputTypes } from '../../../../packages/ui/src/elements/input';

import '../../../../packages/ui/src/elements/input/';
import '../../../../packages/ui/src/elements/icon/';


const meta: Meta = {
  title: 'Elements / Input',
  component: 'kemet-input',
  render: args => Template(args),
  argTypes: {
    type: {
      name: 'Type',
      control: { type: 'select' },
      options: Object.values(EnumInputTypes),
    },
    appearance: {
      control: { type: 'select' },
      options: Object.values(EnumAppearances),
    },
    autocomplete: {
      control: { type: 'radio' },
      options: ['off', 'on'],
    },
    inputmode: {
      control: { type: 'select' },
      options: Object.values(EnumInputModes),
    },
    rounded: {
      control: { type: 'select' },
      options: Object.values(EnumRoundedSizes),
    }
  }
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`<kemet-input
  type="${ifDefined(args.type)}"
  appearance="${ifDefined(args.appearance)}"
  pattern=${ifDefined(args.pattern)}
  ?required=${args.required}
  ?validate-on-blur=${args.validateOnBlur}
  rounded=${ifDefined(args.rounded)}
  ?filled=${args.filled}
  placeholder=${ifDefined(args.placeholder)}
  minlength=${ifDefined(args.minlength)}
  maxlength=${ifDefined(args.maxlength)}
  min=${ifDefined(args.min)}
  max=${ifDefined(args.max)}
  step=${ifDefined(args.step)}
  autocomplete="${ifDefined(args.autocomplete)}"
  inputmode="${ifDefined(args.inputmode)}"
  ?autofocus=${args.autofocus}
  ?disabled=${args.disabled}
  ?readonly=${args.readonly}
>
  ${args.left}
  ${args.right}
</kemet-input>`;

export const Standard: Story = {};

export const Rounded: Story = {
  args: {
    rounded: EnumRoundedSizes.MD,
  },
};

export const Filled: Story = {
  args: {
    filled: true,
  },
};

export const search: Story = {
  args: {
    type: 'search',
    left: html`<kemet-icon name="search" slot="left"></kemet-icon>`,
    placeholder: 'Input a value to see the clear icon appear'
  },
}

export const LeftIcon: Story = {
  args: {
    left: html`<kemet-icon name="phone" slot="left"></kemet-icon>`,
  },
};

export const RightIcon: Story = {
  args: {
    right: html`<kemet-icon name="search" slot="right"></kemet-icon>`,
  },
};

export const ValidateOnBlur: Story = {
  args: {
    validateOnBlur: true,
    required: true,
    inputmode: 'tel',
    pattern: "^(?:\\+?1\\p{White_Space}?)?(?:\\([2-9]\\d{2}\\)|[2-9]\\d{2})[\\p{White_Space}.\\-]?[2-9]\\d{2}[\\p{White_Space}.\\-]?\\d{4}$",
    placeholder: "Enter an invalid us phone number to see the input trigger an error on blur",
    left: html`<kemet-icon name="phone" slot="left"></kemet-icon>`
  },
};
