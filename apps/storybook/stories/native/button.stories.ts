import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';



const meta: Meta = {
  title: 'Native Elements / Button',
  render: args => Template(args),
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['size:xs', 'size:sm', 'size:md', 'size:lg', 'size:xl'],
    },
    variant: {
      control: { type: 'select' },
      options: ['variant:filled', 'variant:outlined', 'variant:edge', 'variant:plain'],
    },
    appearance: {
      control: { type: 'select' },
      options: ['appearance:brand', 'appearance:success', 'appearance:warning', 'appearance:error', 'appearance:info', 'appearance:link'],
    },
    rounded: {
      control: { type: 'select' },
      options: ['rounded:sm', 'rounded:md', 'rounded:lg', 'rounded:xl', 'rounded:circle', 'rounded:pill'],
    },
  },
  // argTypes: {
  //   size: {
  //     control: { type: 'select' },
  //     options: Object.values(EnumSizes),
  //   },
  //   polarity: {
  //     control: { type: 'radio' },
  //     options: ['light', 'dark'],
  //   },
  //   variant: {
  //     control: { type: 'select' },
  //     options: Object.values(EnumVariants),
  //   },
  //   rounded: {
  //     control: { type: 'select' },
  //     options: roundedSizes,
  //   },
  //   appearance: {
  //     control: { type: 'select' },
  //     options: Object.values(EnumAppearances),
  //   },
  // }
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <button data-kemet="${args.size} ${args.variant} ${args.appearance} ${args.rounded}">
    Kemet Native Button
  </button>
`;

const TemplateAnchor = (args: Args) => html`
  <a href="https://kemet.dev" data-kemet="${args.size} ${args.variant} ${args.appearance} ${args.rounded}">
    Kemet Native Button
  </a>
`;

export const Standard: Story = {};

export const AsAnchorElement: Story = {
  render: args => TemplateAnchor(args),
};
