import type { Meta, StoryObj } from '@storybook/react'
import { IconButton } from '~/design-system/components/icon-button/IconButton'
import { IconButtonVariant } from '~/design-system/components/icon-button/IconButton.constants'

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The \`IconButton\` component provides a compact and customizable icon button that can handle various actions. It supports multiple variants, sizes, loading states, and toggling functionality for enhanced interactivity.

#### Key Features:
- **Variants:** Control the button's visual style, such as success, primary, or error.
- **Sizes:** Adjust the button size to fit different contexts, from small icons to larger touch targets.
- **Disabled state:** Disables icon and background to indicate that user doesn't have permission to interact with button.
- **Loading Indicator:** Replace the icon with a spinner to indicate ongoing processes.
- **Toggleable State:** Enable a toggleable mode to switch styles on click.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    children: { table: { disable: true } },
    to: { table: { disable: true } },
    variant: {
      description: 'The visual style of the button.',
      options: [
        IconButtonVariant.Primary,
        IconButtonVariant.Secondary,
        IconButtonVariant.Success,
        IconButtonVariant.Error
      ],
      control: { type: 'radio' }
    },
    size: {
      description: 'Size of the button.',
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'radio' }
    },
    loading: {
      description: 'Displays a loading indicator when true.',
      control: { type: 'boolean' }
    },
    disabled: {
      description: 'Disables the button, preventing interactions.',
      control: { type: 'boolean' }
    },
    toggleAble: {
      description: 'Enables toggleable functionality for the button.',
      control: { type: 'boolean' }
    },
    isToggled: {
      description: 'Set toggle styles for the button.',
      control: { type: 'boolean' }
    }
  },
  args: {
    variant: IconButtonVariant.Primary,
    size: 'lg',
    loading: false,
    disabled: false,
    toggleAble: false,
    isToggled: false
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <IconButton {...args} variant={IconButtonVariant.Primary} />
      <IconButton {...args} variant={IconButtonVariant.Secondary} />
      <IconButton {...args} variant={IconButtonVariant.Success} />
      <IconButton {...args} variant={IconButtonVariant.Error} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates all button variants in a row, including Primary, Secondary, Success and Error.'
      }
    }
  }
}

export const Primary: Story = {
  args: {
    variant: IconButtonVariant.Primary
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Primary" variant is a default button, suitable for main actions.'
      }
    }
  }
}
export const Secondary: Story = {
  args: {
    variant: IconButtonVariant.Secondary
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Secondary" variant is a secondary button, suitable for main actions.'
      }
    }
  }
}

export const Success: Story = {
  args: {
    variant: IconButtonVariant.Success
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Success" variant indicates a positive action using a green theme.'
      }
    }
  }
}
export const Error: Story = {
  args: {
    variant: IconButtonVariant.Error
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Error" variant is red and is often used for destructive actions or alerts.'
      }
    }
  }
}
export const Disabled: Story = {
  args: {
    disabled: true,
    variant: IconButtonVariant.Primary
  },
  parameters: {
    docs: {
      description: {
        story:
          'The disabled state disables icon and background to indicate that user doesn`t have permission to interact with button.'
      }
    }
  }
}

export const Loading: Story = {
  args: {
    loading: true,
    variant: IconButtonVariant.Primary
  },
  parameters: {
    docs: {
      description: {
        story:
          'The loading state replaces the icon with a spinner to indicate that a process is in progress.'
      }
    }
  }
}

export const ToggleAble: Story = {
  args: {
    toggleAble: true,
    isToggled: true,
    variant: IconButtonVariant.Primary
  },
  parameters: {
    docs: {
      description: {
        story:
          'This toggleable button switches states when clicked, providing visual feedback for toggling actions.'
      }
    }
  }
}
