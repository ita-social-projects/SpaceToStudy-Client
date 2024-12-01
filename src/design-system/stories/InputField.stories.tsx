import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'
import { InputFieldVariantEnum } from '~scss-components/input-field/InputField.constants'
import InputField, {
  InputFieldProps
} from '~scss-components/input-field/InputField'

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `

The \`InputField\` component is a highly versatile and customizable input element designed for modern user interfaces. It offers multiple features to enhance usability and integrate seamlessly with various application requirements.

#### Key Features:
- **Variants:** Choose from predefined styles like \`large\`, \`small\`, or \`outlined\` to fit the specific design and functional context of your input fields.
- **Label Support:** Includes a label for clear identification of the input field's purpose.
- **Helper Text:** Provides contextual hints or validation messages below the input field, improving user experience.
- **Search Capability:** Includes an optional search icon (\`SearchIcon\`) for fields requiring a search-related context, activated via the \`search\` prop.
- **Clear Functionality:** Displays a clear icon (\`ClearIcon\`) that allows users to easily reset the input field's value with one click.
- **Error State:** Highlights the input field with an error style if the \`error\` prop is enabled, signaling issues to the user.
- **Accessibility:** Supports \`disabled\` states, preventing user interaction when needed, while maintaining a clear visual indication.
- **Customizable Placeholder:** Offers a customizable placeholder to guide users about the expected input format or content.
- **SX Prop:** The \`sx\` prop allows you to customize the styling of the component using Material UI’s system for styling. It accepts an object containing CSS properties or theme-based values for more flexible styling. Use it to modify layout, spacing, colors, and more dynamically based on your app's requirements.


#### Usage:
This component is ideal for building robust and user-friendly forms, search bars, or any text input scenarios where flexibility, usability, and customization are required.

        `
      }
    }
  },
  tags: ['autodocs'],

  args: {
    variant: InputFieldVariantEnum.Small,
    value: '',
    label: 'Label',
    disabled: false,
    helperText: 'Supporting text',
    placeholder: '',
    search: true,
    error: false,
    onChange: fn(),
    onKeyDown: fn(),
    onClear: fn()
  },
  argTypes: {
    value: {
      description: 'Provides the value to the component.'
    },
    label: {
      description: 'Provide a label for the inputField.'
    },
    disabled: {
      description: 'Disables the inputField when true.'
    },
    variant: {
      description:
        'The visual style of the input. This determines the input\'s appearance(large, small, outlined) and behavior. Default: "Large"',

      options: ['large', 'small', 'outlined'],
      control: { type: 'radio' }
    },
    placeholder: {
      description: 'Supports placeholder for component.'
    },
    helperText: {
      description: 'Supports helperText in giving user hints or warnings.'
    },
    search: {
      description: 'The input field is used as a search field'
    },
    error: {
      description:
        'Supports error text and error icon in giving user hints or warnings when true'
    },
    sx: {
      description:
        "Use it to modify layout, spacing, colors, and more dynamically based on your app's requirements."
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const InputFieldTemplate = (args: InputFieldProps) => {
  const [value, setValue] = useState(args.value)

  const handleClearInput = () => {
    setValue('')
  }
  const handleKeyDown = args.onKeyDown

  return (
    <InputField
      {...args}
      onChange={(e) => setValue(e.target.value)}
      onClear={handleClearInput}
      onKeyDown={handleKeyDown}
      value={value}
    />
  )
}

export const All: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <InputFieldTemplate {...args} variant={InputFieldVariantEnum.Large} />

      <InputFieldTemplate {...args} variant={InputFieldVariantEnum.Small} />

      <InputFieldTemplate {...args} variant={InputFieldVariantEnum.Outlined} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'This story showcases all input variants in a single row for easy comparison.'
      }
    }
  }
}

export const Large: Story = {
  render: InputFieldTemplate,
  args: {
    variant: InputFieldVariantEnum.Large,
    placeholder: 'Large Input'
  },
  parameters: {
    docs: {
      description: {
        story: 'The "Large" variant is suitable for ...'
      }
    }
  }
}

export const Small: Story = {
  render: InputFieldTemplate,
  args: {
    variant: InputFieldVariantEnum.Small,
    placeholder: 'Small Input'
  },
  parameters: {
    docs: {
      description: {
        story: 'The "Small" variant is compact and best suited for ...'
      }
    }
  }
}

export const Outlined: Story = {
  render: InputFieldTemplate,
  args: {
    variant: InputFieldVariantEnum.Outlined,
    placeholder: 'Outlined Input'
  },
  parameters: {
    docs: {
      description: {
        story: 'The "Outlined" variant adds a border around the input ...'
      }
    }
  }
}
