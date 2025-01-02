import { Meta, StoryObj } from '@storybook/react/*'
import Switch from '~/design-system/components/switch/Switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
  ### Switch

  The **Switch** component is a flexible switch element used for toggling between two states (on/off) in your application. It includes customizable sizes, states, and label positions to suit various use cases.

  ---

  **Key Features:**
  - 🏷️ **Label Customization**: Easily add labels and position them relative to the switch.
  - 🖼️ **Sizes**: Supports small, medium, and large sizes.
  - 🔄 **Loading State**: Indicate in-progress actions with a loading spinner.
  - 🚫 **Disabled State**: Prevent user interaction when required.

  This component is ideal for settings toggles, feature switches, and more.
          `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'The label for the switch.',
      control: 'text'
    },
    labelPosition: {
      description: 'The position of the label relative to the switch.',
      options: ['start', 'end', 'top', 'bottom'],
      control: { type: 'radio' }
    },
    size: {
      description: 'The size of the switch.',
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' }
    },
    loading: {
      description: 'Displays a loading state when true.',
      control: 'boolean'
    },
    disabled: {
      description: 'Disables the switch when true.',
      control: 'boolean'
    }
  },
  args: {
    label: 'Switch',
    labelPosition: 'end',
    size: 'md',
    loading: false,
    disabled: false
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Default Switch',
    size: 'md',
    disabled: false,
    loading: false
  },
  parameters: {
    docs: {
      description: {
        story: 'A default switch with a label positioned on the right.'
      }
    }
  }
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Switch',
    size: 'md',
    disabled: true
  },
  parameters: {
    docs: {
      description: {
        story: 'A switch that is disabled, preventing any interaction.'
      }
    }
  }
}

export const Loading: Story = {
  args: {
    label: 'Loading Switch',
    size: 'md',
    loading: true
  },
  parameters: {
    docs: {
      description: {
        story:
          'A switch in a loading state, typically used when an action is in progress.'
      }
    }
  }
}

export const SmallSize: Story = {
  args: {
    label: 'Small Switch',
    size: 'sm',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story:
          'A small-sized switch, suitable for tight spaces or minimal designs.'
      }
    }
  }
}

export const LargeSize: Story = {
  args: {
    label: 'Large Switch',
    size: 'lg',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story:
          'A large-sized switch, making it more prominent and easier to interact with.'
      }
    }
  }
}

export const TopPosition: Story = {
  args: {
    label: 'Top Label Position',
    size: 'md',
    labelPosition: 'top',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Switch with the label positioned above it.'
      }
    }
  }
}

export const BottomPosition: Story = {
  args: {
    label: 'Bottom Label Position',
    size: 'md',
    labelPosition: 'bottom',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Switch with the label positioned below it.'
      }
    }
  }
}

export const StartPosition: Story = {
  args: {
    label: 'Start Label Position',
    size: 'md',
    labelPosition: 'start',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Switch with the label positioned to the left.'
      }
    }
  }
}

export const EndPosition: Story = {
  args: {
    label: 'End Label Position',
    size: 'md',
    labelPosition: 'end',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Switch with the label positioned to the right.'
      }
    }
  }
}
