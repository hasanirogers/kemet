import { html } from 'lit';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Styles API / Spacing',
  render: args => Template(args),
  args: {
    type: 'padding',
    side: 'all',
    spacer: 'md',
  },
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['padding', 'margin'],
    },
    side: {
      control: { type: 'select' },
      options: ['all', 'top', 'right', 'bottom', 'left'],
    },
    breakpoint: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    spacer: {
      control: { type: 'select' },
      options: ['auto', 'none', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
  },
};
export default meta;

type Story = StoryObj;

const Template = ({
  type = 'padding',
  side = 'all',
  breakpoint = 'xs',
  spacer = 'md'
}) => {
  const sideAttr = side !== 'all' ? `-${side}-` : '';
  const breakpointAttr = !!breakpoint ? `[${breakpoint}]-` : '';
  return html`
    <div data-kemet="${type}:${breakpointAttr}${sideAttr}${spacer} border:1">
      The quick brown fox jumps over the lazy dog.
    </div>
  `;
}

export const Standard: Story = {};

