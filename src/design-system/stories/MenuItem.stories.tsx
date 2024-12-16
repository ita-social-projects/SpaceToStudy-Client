import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '@mui/material'
import { EditRounded } from '@mui/icons-material'

import MenuItem from '~scss-components/menu-item/MenuItem'
import {
  MenuItemColorVariant,
  MenuItemVariant
} from '~scss-components/menu-item/MenuItem.constants'

const meta: Meta<typeof MenuItem> = {
  title: 'Components/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The MenuItem component can be used in a dropdown menu, a list of items.

#### Key features:
- **Graphics**: An icon or image to be displayed next to the title.
- **Is dropdown**: Whether the menu item is a dropdown. If selected, onRemove will be ignored.
- **On click**: The function to be called when the menu item is clicked.
- **On remove**: The function to be called when the menu item is removed.
- **Customization**: The color, alignment, and density of the menu item can be customized.
`
      }
    }
  },
  argTypes: {
    title: {
      description: 'The title of the menu item.',
      control: {
        type: 'text'
      }
    },
    additionalInfo: {
      description: 'Additional information to be displayed next to the title.',
      control: {
        type: 'text'
      }
    },
    graphics: {
      description: 'An icon or image to be displayed next to the title.',
      control: false
    },
    alignVariant: {
      description: 'The alignment of the menu item.',
      control: {
        type: 'select',
        options: ['left', 'center', 'right']
      }
    },
    colorVariant: {
      description: 'The color of the menu item.',
      control: {
        type: 'select',
        options: Object.values(MenuItemColorVariant)
      }
    },
    density: {
      description: 'The density of the menu item.',
      control: {
        type: 'radio'
      }
    },
    isDropdown: {
      description:
        'Whether the menu item is a dropdown. If selected, onRemove will be ignored.',
      control: {
        type: 'boolean'
      }
    },
    isToggled: {
      description:
        'Indicates whether the menu item is toggled. When selected, the background color will override other colors.',
      control: {
        type: 'boolean'
      }
    },
    isBottomBorder: {
      description:
        'Whether the menu item has a bottom border. Useful for separating items.',
      control: {
        type: 'boolean'
      }
    },
    isDisabled: {
      description: 'Whether the menu item is disabled.',
      control: {
        type: 'boolean'
      }
    },
    variant: {
      description: 'The variant of the menu item.',
      control: {
        type: 'select',
        options: Object.values(MenuItemVariant)
      }
    },
    onClick: {
      description: 'The function to be called when the menu item is clicked.'
    }
  },
  args: {
    title: 'Assigment',
    onClick: () => alert('Item was clicked.'),
    density: 1,
    alignVariant: 'left',
    colorVariant: MenuItemColorVariant.Default,
    isDropdown: false,
    isToggled: false,
    isBottomBorder: false,
    isDisabled: false,
    variant: MenuItemVariant.Default
  }
}

export default meta

type Story = StoryObj<typeof MenuItem>

export const Default: Story = {
  args: {
    title: 'Assigment',
    onClick: () => alert('Item "Default" was clicked.')
  },
  parameters: {
    docs: {
      description: {
        story: 'The most simple menu item with onClick.'
      }
    }
  }
}

export const WithGraphics: Story = {
  args: {
    title: 'Assigment',
    graphics: <EditRounded />,
    onClick: () => alert('Item "With Graphics" was clicked.')
  },
  parameters: {
    docs: {
      description: {
        story:
          'The menu item with an icon. It is possible to use text, icons, checkboxes, other nodes instead of the icon.'
      }
    }
  }
}

export const WithCheckbox: Story = {
  args: {
    title: 'Assigment',
    graphics: <Checkbox />,
    onClick: () => alert('Item "With Graphics" was clicked.')
  },
  parameters: {
    docs: {
      description: {
        story:
          'The menu item with a checkbox. The checkbox is interactive and can be toggled.'
      }
    }
  }
}

export const WithAdditionalInfo: Story = {
  args: {
    title: 'Assigment',
    graphics: <EditRounded />,
    additionalInfo: 'Due in 2 days',
    density: 2,
    onClick: () => alert('Item "With Additional Info" was clicked.')
  },
  parameters: {
    docs: {
      description: {
        story:
          'The menu item with additional information.  It is recommended to use the density prop with a value of 2 to enhance the visibility of the additional information.'
      }
    }
  }
}

export const WithDropdown: Story = {
  args: {
    title: 'Assigment',
    graphics: <EditRounded />,
    isDropdown: true,
    onClick: () => alert('Imagine dropdown was expanded.')
  },
  parameters: {
    docs: {
      description: {
        story:
          'The menu item with a dropdown icon. Set onClick to handle the dropdown expansion.'
      }
    }
  }
}

export const RemovableMenuItem: Story = {
  args: {
    title: 'Assigment',
    graphics: <EditRounded />,
    onClick: () => alert('Item "With Remove" was clicked.'),
    onRemove: () => alert('Imagine this item was removed')
  },
  parameters: {
    docs: {
      description: {
        story:
          'A menu item with a defined onRemove handler. Click the close icon in the right corner to remove the item. The onRemove handler will be ignored when isDropdown is true.'
      }
    }
  }
}

export const SecondaryColorAndCentered: Story = {
  args: {
    title: 'Assigment',
    graphics: <EditRounded />,
    alignVariant: 'center',
    colorVariant: MenuItemColorVariant.Secondary,
    onClick: () => alert('Item "Colored Menu Item" was clicked.')
  }
}
