import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import CheckBox from '~scss-components/checkbox/CheckBox'

const meta: Meta<typeof CheckBox> = {
  title: 'Components/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`CheckBox\` component is a highly customizable and user-friendly checkbox designed to fit seamlessly into your application's UI. With support for various styles, sizes, and states, it offers flexibility for diverse use cases while maintaining accessibility and visual consistency.

#### Key Features:
- **Variants:** Choose between the \`check\` style for a standard checkbox or the \`middle\` variant to display a minus sign instead of a checkmark, offering an alternative visual representation.
- **Label Placement:** Position the label above, below, or beside the checkbox to suit your layout preferences (\`top\`, \`bottom\`, or \`end\`).
- **Sizes:** Select from \`sm\`, \`md\`, or \`lg\` to match the checkbox to the context—whether it’s a compact form or a prominent control.
- **Loading State:** When an action is in progress, the checkbox displays a spinner and becomes temporarily non-interactive, enhancing user feedback.
- **Colors:** Use predefined color options like \`primary\`, \`secondary\`, \`success\`, or \`error\` to align the checkbox with your application's theme.

#### Controlled vs. Uncontrolled States:
- **Controlled Checkbox:** A checkbox is considered controlled when its state is managed by a parent component using the \`checked\` prop. In this case, the parent component controls the checked state, and the checkbox becomes a controlled component, meaning its state can be set externally.
- **Uncontrolled Checkbox:** In contrast, when the \`checked\` prop is not provided, the checkbox is considered uncontrolled. It manages its own internal state and changes its state based on user interaction.


This component is ideal for use in forms, settings pages, or any interface requiring intuitive selection controls. Whether you need a straightforward checkbox or a visually distinctive option with loading feedback, the \`CheckBox\` component adapts to your design and functionality needs.
            
            `
      }
    }
  },
  argTypes: {
    variant: {
      description: '',
      control: { type: 'radio' },
      options: ['check', 'middle']
    },
    labelPosition: {
      description:
        'Specifies the position of the label relative to the checkbox.',
      control: { type: 'radio' },
      options: ['top', 'bottom', 'end']
    },
    color: {
      description:
        "Defines the color of the checkbox, affecting its visual style. Can be used to align the component with your application's theme.",
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'error', 'success']
    },
    size: {
      description:
        "Determines the size of the checkbox, adjusting its dimensions and the label's appearance.",
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg']
    },
    loading: {
      description:
        'When true, displays a loading spinner instead of the checkbox and disables user interaction, signaling an action is in progress.',
      control: 'boolean'
    },
    disabled: {
      description:
        'When true, disables the checkbox, preventing user interaction and applying a `disabled` style.',
      control: 'boolean'
    },
    label: {
      description: 'The content to be displayed as the label of the checkbox.'
    },
    checked: {
      description:
        'When provided, the checkbox becomes controlled. This value determines its checked state, overriding internal state management.',
      control: 'boolean'
    },
    defaultChecked: {
      description:
        'Determines the initial checked state of the checkbox when the component is first rendered. It only applies when the checkbox is not controlled via the `checked` prop',
      control: 'boolean'
    },
    onChange: {
      description: 'Callback fired when the checkbox state changes.'
    }
  }
}
export default meta

type Story = StoryObj<typeof CheckBox>

export const Default: Story = {
  args: {
    variant: 'check',
    labelPosition: 'end',
    label: 'Check me',
    color: 'primary',
    size: 'md'
  },
  parameters: {
    docs: {
      description: {
        story:
          'The default configuration of the checkbox with a primary color, medium size, and label positioned at the end.'
      }
    }
  }
}

export const Controlled: Story = {
  args: {
    ...Default.args,
    label: 'Controlled checkbox',
    checked: false
  },
  parameters: {
    docs: {
      description: {
        story:
          'A checkbox controlled by the parent component using the `checked` prop. Changes to its state are managed internally unless the `checked` prop is externally set. In that case, it becomes a controlled component.'
      }
    }
  },
  render: (args) => {
    const ControlledCheckBox = () => {
      const [isChecked, setIsChecked] = useState(args.checked)

      return (
        <div>
          <CheckBox
            {...args}
            checked={isChecked}
            onChange={(checked) => {
              setIsChecked(checked)
            }}
          />
          <p>Checkbox is currently {isChecked ? 'checked' : 'unchecked'}</p>
        </div>
      )
    }
    return <ControlledCheckBox />
  }
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true
  },
  parameters: {
    docs: {
      description: {
        story:
          'A disabled checkbox that prevents user interaction and applies a "disabled" style.'
      }
    }
  }
}

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true
  },
  parameters: {
    docs: {
      description: {
        story:
          'A checkbox in a loading state, displaying a spinner and disabling user interaction.'
      }
    }
  }
}

export const Error: Story = {
  args: {
    ...Default.args,
    color: 'error'
  },
  parameters: {
    docs: {
      description: {
        story:
          'A checkbox styled with an error color to indicate an issue or invalid state.'
      }
    }
  }
}

export const Success: Story = {
  args: {
    ...Default.args,
    color: 'success'
  },
  parameters: {
    docs: {
      description: {
        story:
          'A checkbox styled with a success color, often used to indicate a positive or successful action.'
      }
    }
  }
}

export const Indeterminate: Story = {
  args: {
    ...Default.args,
    variant: 'middle'
  },
  parameters: {
    docs: {
      description: {
        story:
          'A checkbox that visually displays a minus sign instead of a checkmark, functioning the same as the "check" variant.'
      }
    }
  }
}
