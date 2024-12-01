import type { Meta, StoryObj } from '@storybook/react'
import RadioButton from '~scss-components/radio-button/RadioButton'
import { fn } from '@storybook/test'

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The \`RadioButton\` component is a customizable radio button element used for selecting one option from a group. It supports various sizes, colors, and states to suit different use cases in your application.
#### Key Features:
- **Sizes:** Adjust the size of the radio button to fit your UI requirements: sm (small), md (medium), lg (large).
- **Colors:** Choose from several predefined color options to align with your design: primary, success, error.
- **Checked/Unchecked States:** Toggle the button between selected and unselected states.
- **Loading State:** Use a loading indicator to signal an ongoing process while the button is clicked.
- **Disabled State:** Disable the button to prevent interaction.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'The label that describes the purpose of the radio button.',
      control: { type: 'text' }
    },
    size: {
      description: 'The size of the radio button.',
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' }
    },
    color: {
      description: 'The visual style of the radio button.',
      options: ['primary', 'success', 'error'],
      control: { type: 'radio' }
    },
    checked: {
      description: 'Indicates whether the radio button is selected.',
      control: { type: 'boolean' }
    },
    disabled: {
      description: 'Disables the radio button, preventing user interaction.',
      control: { type: 'boolean' }
    },
    loading: {
      description:
        'Displays a loading spinner instead of the radio button when true.',
      control: { type: 'boolean' }
    },
    labelPosition: {
      description: 'The position of the label relative to the radio button.',
      options: ['top', 'bottom', 'end'],
      control: { type: 'radio' }
    }
  },
  args: {
    label: 'Radio Button',
    checked: false,
    disabled: false,
    loading: false,
    size: 'md',
    color: 'primary',
    labelPosition: 'end',
    onChange: fn()
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Default Radio Button',
    color: 'primary'
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic unselected radio button.'
      }
    }
  }
}

export const Checked: Story = {
  args: {
    label: 'Checked Radio Button',
    checked: true
  },
  parameters: {
    docs: {
      description: {
        story: 'A radio button that is checked (selected).'
      }
    }
  }
}

export const Loading: Story = {
  args: {
    label: 'Loading Radio Button',
    loading: true
  },
  parameters: {
    docs: {
      description: {
        story:
          'A radio button with a loading spinner, indicating a process is ongoing.'
      }
    }
  }
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Radio Button',
    disabled: true
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled radio button that cannot be interacted with.'
      }
    }
  }
}

export const CustomSize: Story = {
  args: {
    label: 'Small Radio Button',
    size: 'sm'
  },
  parameters: {
    docs: {
      description: {
        story: 'A small-sized radio button.'
      }
    }
  }
}

export const CustomColor: Story = {
  args: {
    label: 'Error Radio Button',
    color: 'error'
  },
  parameters: {
    docs: {
      description: {
        story: 'A radio button with the error color variant.'
      }
    }
  }
}

export const LabelPositionTop: Story = {
  args: {
    label: 'Radio Button with Top Label',
    labelPosition: 'top'
  },
  parameters: {
    docs: {
      description: {
        story: 'A radio button with the label positioned above the button.'
      }
    }
  }
}

export const LabelPositionBottom: Story = {
  args: {
    label: 'Radio Button with Bottom Label',
    labelPosition: 'bottom'
  },
  parameters: {
    docs: {
      description: {
        story: 'A radio button with the label positioned below the button.'
      }
    }
  }
}
