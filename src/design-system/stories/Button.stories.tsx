import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Button from '~scss-components/button/Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `

The \`Button\` component is a versatile and customizable button element that can be used for a variety of actions in your application. It supports different visual styles (variants), sizes, and states, making it a flexible component for many UI scenarios.

#### Key Features:
- **Colors:** Choose from several pre-defined styles like primary, tonal, etc. to match the button's purpose with your design.
- **Sizes:** Adjust the button's size to suit the context, whether you need a large call-to-action button or a smaller, more subtle button.
- **Loading State:** Display a loading indicator when an action is in progress, signaling to the user that something is happening.
- **Customizable:** Use the \`sx\` prop to apply custom styles, or replace the button's root element with a custom component for even more flexibility.
- **Link Navigation:** If needed, the button can act as a navigation element using the \`to\` prop, making it easy to integrate into routing.

This component is essential for triggering actions, submitting forms, or navigating users throughout your application.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description:
        "The content to be displayed inside the button, typically a text label that describes the button's action"
    },
    color: {
      description:
        "The visual style of the button. This determines the button's appearance and behavior",
      options: [
        'primary',
        'tonal',
        'text-primary',
        'text-secondary',
        'tonal-success',
        'tonal-error'
      ],
      control: { type: 'radio' }
    },
    disabled: {
      description:
        'When true, the button is disabled, preventing user interaction and applying a "disabled" style'
    },
    loading: {
      description:
        'When true, the button content is replaced with a loading indicator, signaling that an action is in progress'
    },
    size: {
      description:
        'Specifies the size of the button, affecting its padding and font size',
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'radio' }
    },
    component: {
      description:
        'A custom component used to render the button. This allows for extending or modifying the button’s behavior and appearance beyond the default',
      control: { type: 'object' }
    },
    to: {
      description:
        'A URL or path that the button navigates to when clicked. Useful when the button is used as a link in navigation',
      control: { type: 'text' }
    },
    sx: {
      description:
        'An object representing custom styles to be applied to the button'
    }
  },
  args: {
    disabled: false,
    loading: false,
    size: 'sm',
    onClick: fn(),
    sx: {}
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button {...args} color='primary'>
        Primary
      </Button>
      <Button {...args} variant='tonal'>
        Tonal
      </Button>
      <Button {...args} variant='text-primary'>
        Text Primary
      </Button>
      <Button {...args} variant='text-secondary'>
        Text Secondary
      </Button>
      <Button {...args} variant='tonal-success'>
        Tonal Success
      </Button>
      <Button {...args} variant='tonal-error'>
        Tonal Error
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'This story showcases all button variants in a single row for easy comparison.'
      }
    }
  }
}

export const Primary: Story = {
  args: {
    children: 'Primary',
    color: 'primary'
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Primary" variant is a solid button with a primary background color, typically used for the main actions.'
      }
    }
  }
}

export const Tonal: Story = {
  args: {
    children: 'Tonal',
    variant: 'tonal'
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Tonal" variant is a lighter version of the contained button, ideal for less prominent actions.'
      }
    }
  }
}

export const TextPrimary: Story = {
  args: {
    children: 'Text Primary',
    variant: 'text-primary'
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Text Primary" variant is a minimalistic button style, offering no background and focusing solely on the text. It is ideal for secondary actions or inline interactions where a subtle approach is needed.'
      }
    }
  }
}

export const TextSecondary: Story = {
  args: {
    children: 'Text Secondary',
    variant: 'text-secondary'
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Text Secondary" variant is designed for subtle, less prominent actions. It features a transparent background with a soft blue-gray text color and hover effects for better interaction cues. The active state includes an underline for emphasis, while the disabled state uses muted tones to indicate inactivity.'
      }
    }
  }
}

export const TonalError: Story = {
  args: {
    children: 'Tonal Error',
    variant: 'tonal-error'
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Tonal Error" variant uses a red background color, perfect for actions that could have serious consequences, like deletions.'
      }
    }
  }
}

export const TonalSuccess: Story = {
  args: {
    children: 'Tonal Success',
    variant: 'tonal-success'
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Tonal Success" variant uses soft green tones to signify positive actions, with hover and active states providing subtle visual feedback.'
      }
    }
  }
}
