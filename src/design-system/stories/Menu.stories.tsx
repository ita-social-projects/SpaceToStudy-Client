import { useState } from 'react'
import { type Meta, type StoryObj } from '@storybook/react'
import { EditRounded } from '@mui/icons-material'
import { Checkbox } from '@mui/material'

import Menu from '~scss-components/menu/Menu'
import Button from '~scss-components/button/Button'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The Menu component is a dropdown menu that displays a list of items. 

#### Key features:
- **Menu Items:** Display a list of items in the menu. Each item can have a title, additional information, and an icon.
- **Items Removal:** Enable or disable the removal of items from the menu.
- **Default On Item Click:** Define the default function to call when a menu item is clicked.
- **Customization:** Customize the appearance of the menu items using the provided props.
        `
      }
    }
  },
  argTypes: {
    anchorEl: {
      description:
        'The element that serves as the anchor for the menu. This element is used to position the menu and open it.'
    },
    setAnchorEl: {
      description: 'Function to set the anchor element.'
    },
    menuItems: {
      description: `
The list of menu items to be displayed. Each menu item can have the following properties:
- **title***: \`string\`
- **additionalInfo**: \`string\`
- **graphics**: \`ReactNode\`
- **alignVariant**: \`'left' | 'center' | 'right'\`
- **colorVariant**: \`MenuItemColorVariant\`
- **defaultOnItemClickArgs**: \`OnItemClickArgs\`
- **isBottomBorder**: \`boolean\`
- **isDisabled**: \`boolean\`
- **isInitiallyToggled**: \`boolean\`
- **nestedMenuItems**: \`MenuItemProps[]\`
- **onClick**: \`function\`

Nested menu items can have all the same properties except \`nestedMenuItems\`.
      `,
      control: { type: 'object' }
    },
    allowToggleMultipleItems: {
      description:
        'Determines whether multiple items can be toggled on and off.',
      control: 'boolean'
    },
    anchorOrigin: {
      description: 'The anchor origin point of the menu.',
      control: { type: 'object' }
    },
    density: {
      description: 'The density of the menu items.',
      control: { type: 'radio' }
    },
    defaultOnItemClick: {
      description: 'The default function to call when a menu item is clicked.'
    },
    isItemsRemovalEnabled: {
      description: 'Determines whether the items can be removed from the menu.',
      control: 'boolean'
    },
    noItemsMessage: {
      description:
        'The message to display when there are no items in the menu.',
      control: { type: 'text' }
    },
    maxHeight: {
      description: 'The maximum height of the menu.',
      control: { type: 'number' }
    },
    minWidth: {
      description: 'The minimum width of the menu.',
      control: { type: 'number' }
    },
    removeAllItemsTitle: {
      description: 'The title of the button to remove all items',
      control: { type: 'text' }
    },
    transformOrigin: {
      description: 'The transform origin point of the menu.',
      control: { type: 'object' }
    },
    toggledItemsTitles: {
      description:
        'The titles of the items that are currently toggled. Used for controlled toggling.'
    },
    onToggleItemsChange: {
      description:
        'Function called when the toggled items change. Used for controlled toggling.'
    }
  },
  args: {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    isItemsRemovalEnabled: false,
    noItemsMessage: 'No items to display.',
    maxHeight: 200,
    minWidth: 200,
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left'
    }
  },
  decorators: [
    (Story, context) => {
      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
      }

      return (
        <>
          <Button color='tonal' onClick={handleClick}>
            Open Menu
          </Button>

          <Story
            args={{
              ...context.args,
              anchorEl,
              setAnchorEl
            }}
          />
        </>
      )
    }
  ]
}

export default meta

type Story = StoryObj<typeof Menu>

export const Default: Story = {
  args: {
    defaultOnItemClick(args) {
      alert(`defaultOnItemClick args: ${JSON.stringify(args)}.`)
    },
    menuItems: [
      {
        title: 'Lesson',
        defaultOnItemClickArgs: { path: '/lesson' }
      },
      {
        title: 'Quiz',
        defaultOnItemClickArgs: { path: '/quiz' }
      },
      {
        title: 'Attachment',
        defaultOnItemClickArgs: { path: '/attachment' }
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'The most basic dropdown menu. Click on the button to open.'
      }
    }
  }
}

export const WithIcon: Story = {
  args: {
    defaultOnItemClick(args) {
      alert(`defaultOnItemClick args: ${JSON.stringify(args)}.`)
    },
    menuItems: [
      {
        title: 'Lesson',
        graphics: <EditRounded />,
        defaultOnItemClickArgs: { path: '/lesson' }
      },
      {
        title: 'Quiz',
        graphics: <EditRounded />,
        defaultOnItemClickArgs: { path: '/quiz' }
      },
      {
        title: 'Attachment',
        graphics: <EditRounded />,
        defaultOnItemClickArgs: { path: '/attachment' }
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          'The dropdown menu with custom icons. Click on the button to open.'
      }
    }
  }
}

export const WithCheckbox: Story = {
  args: {
    allowToggleMultipleItems: true,
    defaultOnItemClick(args) {
      alert(
        `Imagine some filtering triggered, args object: ${JSON.stringify(args)} is received by default, use defaultOnItemClickArgs to pass custom args.`
      )
    },
    menuItems: [
      {
        title: 'Lesson',
        graphics: <Checkbox />
      },
      {
        title: 'Quiz',
        graphics: <Checkbox />
      },
      {
        title: 'Attachment',
        graphics: <Checkbox />
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          'The dropdown menu with checkboxes. Click on the button to open the menu.'
      }
    }
  }
}

export const Mixed: Story = {
  args: {
    defaultOnItemClick(args) {
      alert(`defaultOnItemClick args: ${JSON.stringify(args)}.`)
    },
    menuItems: [
      {
        title: 'Lesson',
        graphics: <EditRounded />,
        defaultOnItemClickArgs: { path: '/lesson' }
      },
      {
        title: 'Quiz',
        graphics: <Checkbox />,
        defaultOnItemClickArgs: { path: '/quiz' },
        onClick: () => {
          alert(
            'Quiz onClick called. Imagine there is custom checkbox filter logic here.'
          )
        }
      },
      {
        title: 'Attachment',
        isBottomBorder: true,
        defaultOnItemClickArgs: { path: '/attachment' }
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          'The menu can have a mix of icons, checkboxes, and custom onClick functions. Click on the button to open.'
      }
    }
  }
}

export const WithAdditionalInfo: Story = {
  args: {
    density: 2,
    defaultOnItemClick(args) {
      alert(`${JSON.stringify(args.title)} clicked.`)
    },
    menuItems: [
      {
        title: 'Lesson',
        additionalInfo: 'Explore comprehensive lessons on various topics',
        graphics: <EditRounded />
      },
      {
        title: 'Quiz',
        additionalInfo: 'Test your knowledge with engaging quizzes',
        graphics: <EditRounded />
      },
      {
        title: 'Attachment',
        additionalInfo: 'Access all your important files and documents',
        graphics: <EditRounded />
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          'The dropdown menu with additional information and density value 2. Click on the button to open.'
      }
    }
  }
}

export const WithNestedMenuItems: Story = {
  args: {
    density: 2,
    defaultOnItemClick(args) {
      alert(`${JSON.stringify(args.title)} clicked.`)
    },
    menuItems: [
      {
        title: 'Lesson',
        additionalInfo: 'Explore comprehensive lessons on various topics',
        graphics: <EditRounded />,
        nestedMenuItems: [
          {
            title: 'Math',
            graphics: <EditRounded />
          },
          {
            title: 'Science',
            graphics: <EditRounded />
          },
          {
            title: 'History',
            graphics: <EditRounded />
          }
        ]
      },
      {
        title: 'Quiz',
        additionalInfo: 'Test your knowledge with engaging quizzes',
        graphics: <EditRounded />,
        nestedMenuItems: [
          {
            title: 'Geometry',
            graphics: <EditRounded />
          },
          {
            title: 'Chemistry',
            graphics: <EditRounded />
          },
          {
            title: 'Modern History',
            graphics: <EditRounded />
          }
        ]
      },
      {
        title: 'Attachment',
        additionalInfo: 'Files and documents',
        graphics: <EditRounded />,
        nestedMenuItems: [
          {
            title: 'Solid of revolution',
            graphics: <EditRounded />
          },
          {
            title: 'Molecule',
            graphics: <EditRounded />
          },
          {
            title: 'Modern world map',
            graphics: <EditRounded />
          }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          'The dropdown menu with nested menu items and density value 2. A nested menu item is a menu item that contains another list of menu items. Click on the button to open.'
      }
    }
  }
}

export const CustomAnchorOrigin: Story = {
  args: {
    maxHeight: 100,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center'
    },
    menuItems: [
      {
        title: 'Lesson'
      },
      {
        title: 'Quiz'
      },
      {
        title: 'Attachment'
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          'The dropdown menu with a custom anchor origin point. Click on the button to open.'
      }
    }
  }
}

export const CustomTransformOrigin: Story = {
  args: {
    maxHeight: 100,
    transformOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    menuItems: [
      {
        title: 'Lesson'
      },
      {
        title: 'Quiz'
      },
      {
        title: 'Attachment'
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          'The dropdown menu with a custom transform origin point. Click on the button to open.'
      }
    }
  }
}

export const RemovableItems: Story = {
  args: {
    isItemsRemovalEnabled: true,
    noItemsMessage: 'No notifications yet.',
    minWidth: 350,
    menuItems: [
      {
        title: 'Your cooperation was accepted'
      },
      {
        title: 'Your cooperation was declined'
      },
      {
        title: 'You have a new cooperation'
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          'The dropdown menu with removable items. All top-level non-dropdown menu items can be removed. It is possible to set a custom message when there are no items in the menu. Click on the button to open.'
      }
    }
  }
}

export const WithCustomToggling: Story = {
  render: (args) => {
    const CustomTogglingComponent = () => {
      const initialToggledItemsTitles = ['Lesson', 'Quiz', 'Attachment']
      const [toggledItemsTitles, setToggledItemsTitles] = useState<string[]>(
        initialToggledItemsTitles
      )

      const handleToggleItemsChange = (updatedItemTitles: string[]) => {
        alert(
          `Imagine this is some custom logic: ${updatedItemTitles.join(', ')} that happens when toggling items.`
        )
        setToggledItemsTitles(updatedItemTitles)
      }

      return (
        <Menu
          {...args}
          menuItems={[
            {
              title: 'Lesson',
              additionalInfo: 'Explore comprehensive lessons on various topics',
              graphics: <EditRounded />,
              nestedMenuItems: [
                {
                  title: 'Math',
                  graphics: <EditRounded />
                }
              ]
            },
            {
              title: 'Quiz',
              additionalInfo: 'Test your knowledge with engaging quizzes',
              graphics: <EditRounded />,
              nestedMenuItems: [
                {
                  title: 'Geometry',
                  graphics: <EditRounded />
                },
                {
                  title: 'Chemistry',
                  graphics: <EditRounded />
                }
              ]
            }
          ]}
          onToggleItemsChange={handleToggleItemsChange}
          toggledItemsTitles={toggledItemsTitles}
        />
      )
    }

    return <CustomTogglingComponent />
  },
  parameters: {
    docs: {
      description: {
        story:
          'It is possible to control the toggling of items in the menu by providing the `toggledItemsTitles` and `onToggleItemsChange` props. Click on the button to open.'
      }
    }
  }
}
