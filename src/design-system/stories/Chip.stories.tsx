import type { Meta } from '@storybook/react'
import Chip from '~/design-system/components/chip/Chip'
import { type ChipProps } from '~/design-system/components/chip/ChipTypes'

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`Chip\` component is a versatile and stylish UI element designed to display contextual information, represent actions, or categorize content in your application. 
With multiple types, sizes, and visual states, it offers flexibility to suit various design and functional requirements while ensuring a consistent user experience.

#### Key Features:
- **Variants:** Choose between different types of chips, such as \`filter\`, \`input\`, \`category\`, or \`state\`, each tailored to specific use cases.
- **Chip Types:**
  - **\`filter\`:** Used for filtering actions, where users can select from a dropdown list of options, with \`filled\` or \`minimal\` styles.
  - **\`input\`:** Ideal for user input scenarios, supporting \`filled\`, \`outlined\`, and \`filled-outlined\` variants.
  - **\`category\`:** Displays categorized items, each with a descriptive label and detailed information.
  - **\`state\`:** Represents status or state, typically used to indicate the condition of an item (e.g., active, pending).
- **Sizes:** Select from \`sm\`, \`md\`, or \`lg\` sizes to match the chip to the context—whether you need a compact tag or a larger, more prominent element.
- **Icons:** Enhance the chip’s appearance with customizable \`startIcon\` and \`endIcon\` options to provide additional visual context or interactivity.
- **Disabled State:** The chip can be disabled to prevent user interaction, providing clear feedback to the user when an action is unavailable.

### Chip Types and Props:

0. **Shared Props**:
- **type**: Defines the type of chip. Available values: \`filter\`, \`input\`, \`category\`, \`state\`.
- **size**: Controls the size of the chip (\`sm\`, \`md\`, \`lg\`).
- **label**: The text displayed inside the chip (\`string\`).
- **startIcon**: An optional icon before the label (\`ReactNode\`).
- **endIcon**: An optional icon after the label (\`ReactNode\`).
- **disabled**: Makes the chip non-interactive (\`boolean\`).
1. **Filter Chip** (\`type: 'filter'\`):
   - **variant**: Defines the visual style (\`filled\` or \`minimal\`).
2. **Input Chip** (\`type: 'input'\`):
   - **variant**: Supports \`filled\`, \`outlined\`, and \`filled-outlined\` styles.
3. **Category Chip** (\`type: 'category'\`):
   - **detail**: Indicates certain detail about label (\`string\`).
   - **color**: Customizes the chip's color (\`string\`).
4. **State Chip** (\`type: 'state'\`):
   - **color**: Customizes the chip's color (\`string\`).
        `
      }
    }
  }
}

export default meta

export const FilterChip = (args: ChipProps) => <Chip {...args} />
FilterChip.args = {
  type: 'filter',
  size: 'md',
  label: 'Filter Chip',
  options: ['Option 1', 'Option 2', 'Option 3'],
  variant: 'filled',
  disabled: false
}
FilterChip.argTypes = {
  type: {
    control: { type: 'select' },
    options: ['filter'],
    description: 'Filter type.'
  },
  size: {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg'],
    description: 'Size of the chip.',
    table: { defaultValue: { summary: 'md' } }
  },
  options: {
    control: { type: 'array' },
    description: 'List of options for the filter chip',
    defaultValue: ['Option 1', 'Option 2', 'Option 3']
  },
  label: {
    control: { type: 'text' },
    description: 'Label text displayed on the chip.'
  },
  variant: {
    control: { type: 'select' },
    options: ['filled', 'minimal'],
    description: 'Visual style of the chip.',
    table: { defaultValue: { summary: 'filled' } }
  },
  startIcon: {
    control: { type: 'ReactNode' },
    description: 'Icon displayed at the start of the chip.'
  },
  endIcon: {
    control: { type: 'ReactNode' },
    description: 'Icon displayed at the end of the chip.'
  },
  disabled: {
    control: { type: 'boolean' },
    description: 'Disables the chip if true.',
    table: { defaultValue: { summary: false } }
  }
}

export const InputChip = (args: ChipProps) => <Chip {...args} />
InputChip.args = {
  type: 'input',
  size: 'lg',
  label: 'Input Chip',
  variant: 'outlined',
  disabled: false
}
InputChip.argTypes = {
  type: {
    control: { type: 'select' },
    options: ['input'],
    description: 'Input type.'
  },
  size: {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg'],
    description: 'Size of the chip.'
  },
  label: {
    control: { type: 'text' },
    description: 'Label text displayed on the chip.'
  },
  variant: {
    control: { type: 'select' },
    options: ['filled', 'outlined', 'filled-outlined'],
    description: 'Visual style of the chip.'
  },
  startIcon: {
    control: { type: 'object' },
    description: 'Icon displayed at the start of the chip.'
  },
  endIcon: {
    control: { type: 'object' },
    description: 'Icon displayed at the end of the chip.'
  },
  disabled: {
    control: { type: 'boolean' },
    description: 'Disables the chip if true.'
  }
}

export const CategoryChip = (args: ChipProps) => <Chip {...args} />
CategoryChip.args = {
  type: 'category',
  size: 'md',
  color: 'purple',
  label: 'Astronomy',
  detail: 'Advanced',
  disabled: false
}
CategoryChip.argTypes = {
  type: {
    control: { type: 'select' },
    options: ['category'],
    description: 'Category type.'
  },
  size: {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg'],
    description: 'Size of the chip.'
  },
  color: {
    control: { type: 'select' },
    options: [
      'blue-gray',
      'turquoise',
      'blue',
      'green',
      'yellow',
      'purple',
      'red',
      'neutral'
    ],
    description: 'Color of the chip.',
    table: { defaultValue: { summary: 'blue-gray' } }
  },
  label: {
    control: { type: 'text' },
    description: 'Label text displayed on the first chip.'
  },
  detail: {
    control: { type: 'text' },
    description: 'Secondary text displayed on the second chip.'
  },
  disabled: {
    control: { type: 'boolean' },
    description: 'Disables the chip if true.'
  }
}

export const StateChip = (args: ChipProps) => <Chip {...args} />
StateChip.args = {
  type: 'state',
  size: 'sm',
  color: 'green',
  label: 'Active',
  disabled: false
}
StateChip.argTypes = {
  type: {
    control: { type: 'select' },
    options: ['state'],
    description: 'State type.'
  },
  size: {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg'],
    description: 'Size of the chip.'
  },
  color: {
    control: { type: 'select' },
    options: [
      'blue-gray',
      'turquoise',
      'blue',
      'green',
      'yellow',
      'purple',
      'red',
      'neutral'
    ],
    description: 'Color of the chip.',
    table: { defaultValue: { summary: 'blue-gray' } }
  },
  label: {
    control: { type: 'text' },
    description: 'Label text displayed on the chip.'
  },
  startIcon: {
    control: { type: 'object' },
    description: 'Icon displayed at the start of the chip.'
  },
  disabled: {
    control: { type: 'boolean' },
    description: 'Disables the chip if true.'
  }
}
