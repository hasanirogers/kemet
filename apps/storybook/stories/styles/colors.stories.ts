import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { makeBackgroundColors, makeFontColors } from '../../.storybook/utilities';

const meta: Meta = {
  title: 'Styles API / Colors',
};
export default meta;

type Story = StoryObj;

const Template = ({
  font = 'none',
  background = 'none'
}) => {
  const fontAttr = font !== 'none' ? `cfont:${font}` : 'cfont:base';
  const backgroundAttr = background !== 'none' ? `cbackground:${background}` : 'cbackground:base';
  return html`
    <div data-kemet="${fontAttr} ${backgroundAttr} padding:xl elevation:3">The quick brown fox jumps over the lazy dog.</div>
  `;
};

export const Standard: Story = {
  render: args => Template(args),
  argTypes: {
    font: {
      control: { type: 'select' },
      options: makeFontColors(),
    },
    background: {
      control: { type: 'select' },
      options: makeBackgroundColors(),
    },
  }
}
