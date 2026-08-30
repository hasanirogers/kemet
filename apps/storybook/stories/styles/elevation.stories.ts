import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Styles API / Elevation',
};
export default meta;

type Story = StoryObj;

const Template = ({ layer = '3' }) => html`
  <div data-kemet="elevation:${layer} padding:2xl margin:2xl">The quick brown fox jumps over the lazy dog.</div>
`;

export const Standard: Story = {
  render: Template,
  args: {
    layer: '3',
  },
  argTypes: {
    layer: {
      control: { type: 'select' },
      options: ['none', '1', '2', '3', '4', '5', '6', 'inner'],
    },
  }
};
