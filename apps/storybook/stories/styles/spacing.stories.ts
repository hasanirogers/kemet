import { html } from 'lit';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Styles API / Spacing',
  render: args => Template(args),
  args: {
    type: 'padding',
    side: 'all',
    breakpoint: '2xs',
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
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
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
  breakpoint = '2xs',
  spacer = 'md'
}) => {
  const sideAttr = side !== 'all' ? `-${side}-` : '';
  const breakpointAttr = breakpoint !== '2xs' ? `mq${breakpoint}-` : '';
  return html`
    <div data-kemet="${type}:${breakpointAttr}${sideAttr}${spacer}">
      The quick brown fox jumps over the lazy dog.
    </div>
  `;
}

export const Standard: Story = {};

