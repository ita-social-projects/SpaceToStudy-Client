import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import UserAvatar from '~scss-components/user-avatar/UserAvatar'

const meta: Meta<typeof UserAvatar> = {
  title: 'Components/UserAvatar',
  component: UserAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The \`UserAvatar\` component is a flexible and customizable avatar element that can be used to display user profile images, initials, and online status. It supports different variants, sizes, and states, making it a versatile component for showcasing user information across your application.

#### Key Features:
- **Variants**: Choose from several types of avatars:
    - Photo: Displays a user’s profile image (requires src prop).
    - Monogram: Shows the initials of the user based on the firstName and lastName props.
    - Check: Displays a check icon inside the avatar.
    - Avatar: Displays the user’s initials by default, making it ideal for generic avatars when no photo is available.
- **Sizes:** Adjust the avatar's size to fit your design needs, with options for sm (small), md (medium), or lg (large).
- **Online Status:** Show the user's online status with a small color-coded status dot that appears when isOnline is set to true.
- **Customizable:** Use the sx prop to apply custom styles or override the default styling to match your design requirements.
- **Monogram Generation:** Automatically generates a monogram based on the user’s first and last name, perfect when no image is available.

This component is ideal for user profile representations, whether in a user list, comments section, or anywhere you need to display user information.
          `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['check', 'avatar', 'monogram', 'photo'],
      description: 'The type of avatar to display.',
      table: {
        type: { summary: 'check | avatar | monogram | photo' }
      }
    },
    size: {
      control: { type: 'text' },
      description: 'The size of the avatar.',
      table: {
        type: { summary: 'sm | md | lg' }
      }
    },
    isOnline: {
      control: { type: 'boolean' },
      description: 'Displays online status if true.',
      table: {
        type: { summary: 'boolean' }
      }
    },
    src: {
      control: { type: 'text' },
      description: 'The URL of the image for the photo variant.',
      table: {
        type: { summary: 'string' }
      }
    },
    firstName: {
      control: { type: 'text' },
      description: 'The first name of the user.',
      table: {
        type: { summary: 'string' }
      }
    },
    lastName: {
      control: { type: 'text' },
      description: 'The last name of the user.',
      table: {
        type: { summary: 'string' }
      }
    }
  },
  args: {
    variant: 'avatar',
    size: 'sm',
    firstName: 'Test',
    lastName: 'User',
    isOnline: false,
    onClick: fn()
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '30px' }}>
      <UserAvatar
        {...args}
        src='/src/assets/img/user-profile-page/avatar.png'
        variant='photo'
      />
      <UserAvatar {...args} variant='monogram' />
      <UserAvatar {...args} variant='check' />
      <UserAvatar {...args} variant='avatar' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'This story showcases all avatar variants in a single row for easy comparison.'
      }
    }
  }
}

export const PhotoVariant: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Displays the photo variant of the UserAvatar component. Use this variant when displaying a user profile picture.'
      }
    }
  },
  args: {
    variant: 'photo',
    src: '/src/assets/img/user-profile-page/avatar.png'
  }
}

export const MonogramVariant: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Displays the monogram variant of the UserAvatar component. The user’s initials are shown as a fallback when no photo is provided.'
      }
    }
  },
  args: {
    variant: 'monogram'
  }
}

export const CheckVariant: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Displays the check variant of the UserAvatar component. This variant includes a check icon, typically used for selection or confirmation purposes.'
      }
    }
  },
  args: {
    variant: 'check'
  }
}

export const AvatarVariant: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Displays the default avatar variant of the UserAvatar component. The initials of the user are displayed by default, with optional online status.'
      }
    }
  },
  args: {
    variant: 'avatar'
  }
}
