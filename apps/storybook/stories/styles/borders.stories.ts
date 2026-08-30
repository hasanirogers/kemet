import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { makeColors } from '../../.storybook/utilities';

const meta: Meta = {
  title: 'Styles API / Border',
};
export default meta;

type Story = StoryObj;

const Template = ({
  width = '1',
  side = 'all',
  style = 'solid',
  radius = 'none',
  color = 'none',
}) => {
  const colorAttr = color !== 'none' ? `border:${color}` : '';
  const sideAttr = side !== 'all' ? `border:${side}` : '';
  const styleAttr = style !== 'solid' ? `border:${style}` : '';
  const radiusAttr = radius !== 'none' ? `border:rounded-${radius}` : '';

  return html`
    <div data-kemet="${colorAttr} ${sideAttr} border:${width} ${styleAttr} ${radiusAttr} padding:xl">The quick brown fox jumps over the lazy dog.</div>
  `;
};

export const Standard: Story = {
  render: args => Template(args),
  args: {
    width: '1',
    side: 'all',
    style: 'solid',
    color: 'auto',
    radius: 'none',
  },
  argTypes: {
    width: {
      control: { type: 'select' },
      options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    },
    side: {
      control: { type: 'select' },
      options: ['all', 'top', 'right', 'bottom', 'left', 'horizontal', 'vertical'],
    },
    style: {
      control: { type: 'select' },
      options: ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden'],
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'circle', 'pill'],
    },
    color: {
      control: { type: 'select' },
      options: makeColors(),
    },
  }
}
