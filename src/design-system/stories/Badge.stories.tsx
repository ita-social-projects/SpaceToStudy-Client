import { IconButton } from '~/design-system/components/icon-button/IconButton'
import type { Meta, StoryObj } from '@storybook/react'
import Badge from '~scss-components/badge/Badge'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`Badge\` component is a versatile and reusable component designed to enhance your application's UI by displaying notifications, counts, or statuses. Built on top of Material-UI's Badge, this custom implementation ensures consistency with your design system while adding additional customization options.

#### Key Features:

- **Variants:** 
  - \`sm\`: Displays the badge as a small dot (ideal for simple status indicators).
  - \`lg\`: Displays the badge with a numeric value.
- **Visibility Control:** Use the \`isVisible\` prop to toggle the visibility of the badge dynamically. When set to \`false\`, the badge content is hidden.
- **Content Customization:** 
  - \`badgeContent\`: Render a numeric content.
  - \`maxContent\`: Specify the maximum value to display. If badgeContent exceeds this value, it displays \`maxContent+\`.
- **Color Options:** Supports predefined color options: \`primary\`, \`success\`, and \`error\`, aligning with the design system.
- **Children Support:** Seamlessly wrap any element (e.g., icons, text, buttons) with the badge, making it highly adaptable to your application's requirements.
`
      }
    }
  },
  argTypes: {
    variant: {
      description:
        'Specifies the style of the badge. `sm` displays the badge as a small dot for status indicators, while `lg` displays a numeric value.',
      control: { type: 'radio' },
      options: ['sm', 'lg']
    },
    color: {
      description:
        'Defines the color of the badge, affecting its visual style. Can be used to align the badge with your application`s theme.',
      control: { type: 'radio' },
      options: ['primary', 'success', 'error'],
      defaultValue: 'primary'
    },
    badgeContent: {
      description:
        'The content to be displayed inside the badge. If the variant is set to "sm," this prop is ignored.',
      control: { type: 'number' },
      defaultValue: 4
    },
    maxContent: {
      description:
        'Specifies the maximum value displayed by the badge. When set to `0`, the badge content is hidden.',
      control: { type: 'number' },
      defaultValue: 10
    },
    isZeroShown: {
      description:
        'determines whether the badge displays a `0` when the `variant` is set to `lg` and `badgeContent` is `0`',
      control: { type: 'boolean' },
      defaultValue: false
    },
    isVisible: {
      description:
        'Determines whether the badge is visible. Set this to `false` to hide the badge, regardless of its content.',
      control: { type: 'boolean' },
      defaultValue: true
    },
    children: {
      description:
        'The element to be wrapped by the badge. This is typically an icon, button, or other visual element.',
      control: { type: 'text' }
    }
  },
  args: {
    variant: 'lg',
    color: 'primary',
    badgeContent: 7,
    maxContent: 10,
    isZeroShown: false,
    isVisible: true
  }
}

export default meta

type Story = StoryObj<typeof Badge>

export const FullBadge: Story = {
  args: {
    variant: 'lg',
    color: 'primary',
    isVisible: true,
    badgeContent: 7,
    maxContent: 10,
    children: (
      <IconButton>
        <NotificationsRoundedIcon color='info' />
      </IconButton>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'A large badge (`lg` variant) with numeric content and a maximum display value of 10.'
      }
    }
  }
}

export const SmallBadge: Story = {
  args: {
    variant: 'sm',
    color: 'primary',
    isVisible: true,
    children: (
      <IconButton>
        <NotificationsRoundedIcon color='info' />
      </IconButton>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Simple configuration of the badge with a primary color, `sm` size displaying as small dot, and visibility enabled'
      }
    }
  }
}

export const SmallSuccessBadge: Story = {
  args: {
    ...SmallBadge.args,
    color: 'success'
  },
  parameters: {
    docs: {
      description: {
        story: 'A small badge with success color'
      }
    }
  }
}

export const SmallErrorBadge: Story = {
  args: {
    ...SmallBadge.args,
    color: 'error'
  },
  parameters: {
    docs: {
      description: {
        story: 'A small badge with error color'
      }
    }
  }
}

export const SuccessFullBadge: Story = {
  args: {
    ...FullBadge.args,
    color: 'success',
    maxContent: 99,
    badgeContent: 102
  },
  parameters: {
    docs: {
      description: {
        story:
          'A large badge (`lg` variant) with numeric content, success color, and a maximum display value of 99.'
      }
    }
  }
}

export const ErrorFullBadge: Story = {
  args: {
    ...FullBadge.args,
    color: 'error',
    maxContent: 10,
    badgeContent: 7
  },
  parameters: {
    docs: {
      description: {
        story:
          'A large badge (`lg` variant) with numeric content, error color, and a content of 7.'
      }
    }
  }
}
