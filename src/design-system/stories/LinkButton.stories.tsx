import type { Meta, StoryObj } from '@storybook/react'
import LinkButton from '~scss-components/link-button/LinkButton'
import { BrowserRouter as Router } from 'react-router-dom'
import { LinkButtonVariantEnum, SizeEnum } from '~/types'

const meta: Meta<typeof LinkButton> = {
  title: 'Components/LinkButton',
  component: LinkButton,
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    )
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `

The \`LinkButton\` component is a versatile and customizable link button element that can be used for a variety of actions in your application. It supports different visual styles (variants), sizes, and states, making it a flexible component for many UI scenarios.

#### Key Features:
- **Variants:** Choose from two pre-defined styles light and dark to match the current theme.
- **Sizes:** Adjust the button's size to suit the context, whether you need a medium link button or a smaller, more subtle link button.
- **Loading State:** Display a loading indicator when an action is in progress, signaling to the user that something is happening.
- **Link Navigation:** Link button acts as a navigation element using the \`to\` prop.

This component is essential for navigating users throughout your application.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description:
        "The content to be displayed inside the link button, typically a text label that describes the button's action or route"
    },
    variant: {
      description:
        "The visual style of the button. This determines the button's appearance and behavior",
      options: ['light', 'dark'],
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
      options: ['medium', 'small'],
      control: { type: 'radio' }
    },
    to: {
      description:
        'A URL or path that the link button navigates to when clicked.',
      control: { type: 'text' }
    }
  },
  args: {
    disabled: false,
    loading: false,
    size: SizeEnum.Small,
    to: '/test-link'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <LinkButton {...args} variant={LinkButtonVariantEnum.Light}>
        Light
      </LinkButton>
      <LinkButton {...args} variant={LinkButtonVariantEnum.Dark}>
        Dark
      </LinkButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'This story showcases both link button variants in a single row for easy comparison.'
      }
    }
  }
}

export const Light: Story = {
  args: {
    children: 'Light',
    variant: LinkButtonVariantEnum.Light
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Light" variant is a solid link button with darker background for good contrast in light theme.'
      }
    }
  }
}

export const Dark: Story = {
  args: {
    children: 'Dark',
    variant: LinkButtonVariantEnum.Dark
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Dark" variant is a darker version of the light button for good contrast in dark theme.'
      }
    }
  }
}
