import { Meta, StoryObj } from '@storybook/react'
import DividerComponent from '~scss-components/divider/Divider'

const meta: Meta<typeof DividerComponent> = {
  title: 'Components/DividerComponent',
  component: DividerComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### DividerComponent

The \`DividerComponent\` is a versatile UI element used to visually separate content. It supports:

- **Linear Divider**: Ideal for separating sections with optional captions.
- **Ellipse Divider**: A unique shape-based separator.

#### Props:
| **Name**       | **Type**     | **Description**                                           |
| --------------- | ------------ | --------------------------------------------------------- |
| \`variant\`     | \`string\`   | The variant of the divider: \`fullWidth\`, \`inset\`, \`middle\`. |
| \`orientation\` | \`string\`   | Divider orientation: \`horizontal\` or \`vertical\`.       |
| \`thickness\`   | \`string\`   | Thickness of the divider: \`sm\`, \`md\`, or \`lg\`.      |
| \`caption\`     | \`string\`   | Text to display as a caption (for linear dividers only).  |
| \`textAlign\`   | \`string\`   | Text alignment: \`left\`, \`center\`, or \`right\`.       |
| \`type\`        | \`string\`   | Divider type: \`linear\` or \`ellipse\`.                 |
| \`size\`        | \`string\`   | Optional size for ellipse dividers: \`small\`, \`large\`.  |

#### Usage
Use this component to add visual distinction between content elements. Supports custom styles via SCSS and dynamic configuration through props.

---
      `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'The variant of the divider.',
      options: ['fullWidth', 'inset', 'middle'],
      control: { type: 'radio' }
    },
    orientation: {
      description: 'The orientation of the divider.',
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' }
    },
    thickness: {
      description: 'The thickness of the divider.',
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' }
    },
    textAlign: {
      description: 'Text alignment when a caption is provided.',
      options: ['left', 'center', 'right'],
      control: { type: 'radio' }
    },
    caption: {
      description: 'Text to display as a caption for the divider.',
      control: { type: 'text' }
    },
    type: {
      description: 'Type of the divider, linear or ellipse.',
      options: ['linear', 'ellipse'],
      control: { type: 'radio' }
    },
    size: {
      description: 'Size of the ellipse type divider (optional).',
      options: ['small', 'large'],
      control: { type: 'radio' }
    }
  },
  args: {
    variant: 'fullWidth',
    orientation: 'horizontal',
    thickness: 'md',
    textAlign: 'center',
    caption: 'Divider Caption',
    type: 'linear'
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const LinearDivider: Story = {
  args: {
    type: 'linear',
    caption: 'Linear Divider'
  }
}

export const LinearDividerThick: Story = {
  args: {
    type: 'linear',
    caption: 'Thick Linear Divider',
    thickness: 'lg',
    variant: 'fullWidth',
    orientation: 'horizontal',
    textAlign: 'center'
  }
}

export const EllipseDividerSmall: Story = {
  args: {
    type: 'ellipse',
    size: 'small',
    thickness: 'sm'
  }
}

export const EllipseDividerBig: Story = {
  args: {
    type: 'ellipse',
    size: 'large',
    thickness: 'lg'
  }
}

export const VerticalDivider: Story = {
  args: {
    orientation: 'vertical',
    type: 'linear',
    caption: 'Vertical Divider',
    textAlign: 'center'
  }
}
