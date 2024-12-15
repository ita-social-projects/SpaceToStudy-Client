import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Menu from '~scss-components/menu/Menu'
import Button from '~scss-components/button/Button'
import { EditRounded } from '@mui/icons-material'
import { Checkbox } from '@mui/material'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
      }

      return (
        <div style={{ padding: '20px' }}>
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
        </div>
      )
    }
  ]
}

export default meta

type Story = StoryObj<typeof Menu>

export const Default: Story = {
  args: {
    defaultOnItemClick(args) {
      alert(`defaultOnItemClick args: ${JSON.stringify(args)}`)
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
  }
}

export const WithIcon: Story = {
  args: {
    defaultOnItemClick(args) {
      alert(`defaultOnItemClick args: ${JSON.stringify(args)}`)
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
  }
}

export const WithCheckbox: Story = {
  args: {
    defaultOnItemClick(args) {
      alert(`defaultOnItemClick args: ${JSON.stringify(args)}`)
    },
    menuItems: [
      {
        title: 'Lesson',
        graphics: <Checkbox />,
        defaultOnItemClickArgs: { path: '/lesson' }
      },
      {
        title: 'Quiz',
        graphics: <Checkbox />,
        defaultOnItemClickArgs: { path: '/quiz' }
      },
      {
        title: 'Attachment',
        graphics: <Checkbox />,
        defaultOnItemClickArgs: { path: '/attachment' }
      }
    ]
  }
}

export const Mixed: Story = {
  args: {
    defaultOnItemClick(args) {
      alert(`defaultOnItemClick args: ${JSON.stringify(args)}`)
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
        defaultOnItemClickArgs: { path: '/quiz' }
      },
      {
        title: 'Attachment',
        isBottomBorder: true,
        defaultOnItemClickArgs: { path: '/attachment' }
      }
    ]
  }
}

export const WithAdditionalInfo: Story = {
  args: {
    density: 2,
    defaultOnItemClick(args) {
      alert(`${JSON.stringify(args.title)} clicked`)
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
  }
}

export const WithNestedMenuItems: Story = {
  args: {
    density: 2,
    defaultOnItemClick(args) {
      alert(`${JSON.stringify(args.title)} clicked`)
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
  }
}
