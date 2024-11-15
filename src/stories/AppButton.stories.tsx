import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import AppButton from '~/components/app-button/AppButton'
import { ButtonVariantEnum, SizeEnum } from '~/types'

const meta: Meta<typeof AppButton> = {
  title: 'Components/AppButton',
  component: AppButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `

The \`AppButton\` component is a versatile and customizable button element that can be used for a variety of actions in your application. It supports different visual styles (variants), sizes, and states, making it a flexible component for many UI scenarios.

#### Key Features:
- **Variants:** Choose from several pre-defined styles like contained, tonal, or danger to match the button's purpose with your design.
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
    variant: {
      description:
        "The visual style of the button. This determines the button's appearance and behavior",
      options: ['contained', 'containedLight', 'tonal', 'danger'],
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
      options: ['xxl', 'extraLarge', 'large', 'medium', 'small'],
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
    size: SizeEnum.Small,
    onClick: fn(),
    sx: {}
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <AppButton {...args} variant={ButtonVariantEnum.Contained}>
        Contained
      </AppButton>
      <AppButton {...args} variant={ButtonVariantEnum.ContainedLight}>
        ContainedLight
      </AppButton>
      <AppButton {...args} variant={ButtonVariantEnum.Tonal}>
        Tonal
      </AppButton>
      <AppButton {...args} variant={ButtonVariantEnum.Danger}>
        Danger
      </AppButton>
      <AppButton {...args} variant={ButtonVariantEnum.Text}>
        Text
      </AppButton>
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

export const Contained: Story = {
  args: {
    children: 'Contained',
    variant: ButtonVariantEnum.Contained
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Contained" variant is a solid button with a primary background color, typically used for the main actions.'
      }
    }
  }
}

export const ContainedLight: Story = {
  args: {
    children: 'ContainedLight',
    variant: ButtonVariantEnum.ContainedLight
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "ContainedLight" variant is a lighter version of the contained button, ideal for less prominent actions.'
      }
    }
  }
}

export const Tonal: Story = {
  args: {
    children: 'Tonal',
    variant: ButtonVariantEnum.Tonal
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Tonal" variant offers a subtler background color, providing a middle ground between contained and text buttons.'
      }
    }
  }
}

export const Danger: Story = {
  args: {
    children: 'Danger',
    variant: ButtonVariantEnum.Danger
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Danger" variant uses a red background color, perfect for actions that could have serious consequences, like deletions.'
      }
    }
  }
}

export const Text: Story = {
  args: {
    children: 'Text',
    variant: ButtonVariantEnum.Text
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "Text" variant is a minimal button with no background color, typically used for less prominent actions.'
      }
    }
  }
}
