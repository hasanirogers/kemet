import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Styles API / Visibility',
};
export default meta;

type Story = StoryObj;

const TemplateShow = ({
  label = 'This will show at the specified parameters.',
  breakpoint = 'medium',
  direction = 'up',
}) => {
  const kemetShow = direction === 'only' ? breakpoint : `[${breakpoint}]-${direction}`;

  return html`
    <p data-kemet="show:${kemetShow}" style="display:none;">${label}</p>
  `;
};

const TemplateHide = ({
  label = 'This will hide at the specified parameters.',
  breakpoint = 'medium',
  direction = 'down',
}) => {
  const kemetHide = direction === 'only' ? breakpoint : `[${breakpoint}]-${direction}`;

  return html`
    <p data-kemet="hide:${kemetHide}">${label}</p>
  `;
};

export const Show: Story = {
  render: TemplateShow,
  args: {
    label: 'This will show at he specified parameters.',
    breakpoint: 'md',
    direction: 'up',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    breakpoint: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    direction: {
      control: { type: 'radio' },
      options: ['only', 'up', 'down'],
    },
  }
}

export const Hide: Story = {
  render: TemplateHide,
  args: {
    label: 'This will hide at he specified parameters.',
    breakpoint: 'medium',
    direction: 'down',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    breakpoint: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    direction: {
      control: { type: 'radio' },
      options: ['only', 'up', 'down'],
    },
  }
}
