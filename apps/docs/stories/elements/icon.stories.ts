import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ifDefined } from 'lit/directives/if-defined.js';
import { EnumLibrary } from '../../../../packages/ui/src/elements/icon';

import '../../../../packages/ui/src/elements/icon';
import '../../../../packages/ui/src/elements/button';

import '../../../../packages/ui/src/elements/tabs';
import '../../../../packages/ui/src/elements/tab';
import '../../../../packages/ui/src/elements/tab-panel';
import '../../../../packages/ui/src/elements/accordion';
import '../../../../packages/ui/src/elements/accordion-panel';

import '../../.storybook/elements/docs-icons';


const meta: Meta = {
  title: 'Miscellaneous / Icon',
  component: 'kemet-icon',
  args: {
    name: 'gear',
    size: 64,
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Icon name from the sprite (use the Icon Browser below to find available names)',
    },
    size: {
      control: 'number',
    },
    family: {
      control: 'text',
      description: 'Icon family (for Font Awesome: regular, solid, brands)',
    },
    library: {
      control: 'select',
      options: Object.values(EnumLibrary),
    },
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: any) => html`
  <kemet-icon
    name=${args.name}
    size=${ifDefined(args.size)}
    family=${ifDefined(args.family)}
    library=${ifDefined(args.library)}
    version=${ifDefined(args.version)}
  ></kemet-icon>
`;

export const Standard: Story = {
  render: args => Template(args)
};
