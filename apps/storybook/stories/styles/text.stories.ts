import { html } from 'lit';
import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Styles API / Text',
  render: args => Template(args),
  args: {
    breakpoint: '2xs',
    size: 'md',
  },
  argTypes: {
    breakpoint: {
      control: { type: 'select' },
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    size: {
      control: { type: 'select' },
      options: ['2xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
    },
  },
};
export default meta;

type Story = StoryObj;

const Template = ({
  breakpoint = '2xs',
  size = 'md'
}) => {
  const breakpointAttr = breakpoint !== '2xs' ? `mq${breakpoint}-` : '';
  return html`
    <div data-kemet="text:${breakpointAttr}${size}">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </div>
  `;
}

export const Standard: Story = {};
