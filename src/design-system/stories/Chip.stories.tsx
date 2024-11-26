import type { Meta } from '@storybook/react'
import Chip, { type ChipProps } from '~/design-system/components/chip/Chip'
export {}

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
  - **\`filter\`:** Used for filtering actions, with options like \`filled\` or \`minimal\` variants.
  - **\`input\`:** Ideal for user input scenarios, supporting \`filled\`, \`outlined\`, and \`filled-outlined\` variants.
  - **\`category\`:** Designed to display categories with a \`subject\` and \`level\`, allowing for clear categorization of content.
  - **\`state\`:** Represents status or state, typically used to indicate the condition of an item (e.g., active, pending).
- **Sizes:** Select from \`sm\`, \`md\`, or \`lg\` sizes to match the chip to the context—whether you need a compact tag or a larger, more prominent element.
- **Icons:** Enhance the chip’s appearance with customizable \`startIcon\` and \`endIcon\` options to provide additional visual context or interactivity.
- **Colors:** Use color options (\`red\`, \`yellow\` etc.) to align the chip -with your application's theme, or customize the color based on your design needs.
- **Disabled State:** The chip can be disabled to prevent user interaction, providing clear feedback to the user when an action is unavailable.

### Chip Types and Props:

0. **Shared Props**:
- **type**: Defines the type of chip. Available values: \`filter\`, \`input\`, \`category\`, \`state\`.
- **size**: Controls the size of the chip (\`sm\`, \`md\`, \`lg\`).
- **color**: Customizes the chip's color (\`string\`).
- **disabled**: Makes the chip non-interactive (\`boolean\`).
1. **Filter Chip** (\`type: 'filter'\`):
   - **label**: The text displayed inside the chip (\`string\`).
   - **variant**: Defines the visual style (\`filled\` or \`minimal\`).
   - **startIcon**: An optional icon before the label (\`ReactNode\`).
   - **endIcon**: An optional icon after the label (\`ReactNode\`).
   - **disabled**: Makes the chip non-interactive (\`boolean\`).
2. **Input Chip** (\`type: 'input'\`):
   - **label**: The text displayed inside the chip (\`string\`).
   - **variant**: Supports \`filled\`, \`outlined\`, and \`filled-outlined\` styles.
   - **startIcon**: An optional icon before the label (\`ReactNode\`).
   - **endIcon**: An optional icon after the label (\`ReactNode\`).
   - **disabled**: Makes the chip non-interactive.
3. **Category Chip** (\`type: 'category'\`):
   - **subject**: Represents the main category name (\`string\`).
   - **level**: Indicates the category level or subcategory (\`string\`).
4. **State Chip** (\`type: 'state'\`):
   - **label**: The text displayed inside the chip (\`string\`).
   - **startIcon**: An optional icon before the label (\`ReactNode\`).
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
  //   color: 'blue-gray',
  label: 'Filter Chip',
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
  //   color: {
  //     control: { type: 'text' },
  //     description: 'Color of the chip.',
  //     table: { defaultValue: { summary: 'blue-gray' } }
  //   },
  label: {
    control: { type: 'text' },
    description: 'Label text displayed on the chip.'
  },
  variant: {
    control: { type: 'const' },
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
  //   color: 'blue-gray',
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
  //   color: {
  //     control: { type: 'text' },
  //     description: 'Color of the chip.'
  //   },
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
  subject: 'Astronomy',
  level: 'Advanced',
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
    control: { type: 'text' },
    description: 'Color of the chip.'
  },
  subject: {
    control: { type: 'text' },
    description: 'Primary text displayed in the subject field.'
  },
  level: {
    control: { type: 'text' },
    description: 'Secondary text indicating the level or category.'
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
    control: { type: 'text' },
    description: 'Color of the chip.'
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
