import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Menu from '~scss-components/menu/Menu'
import Button from '~scss-components/button/Button'
import { Book } from '@mui/icons-material'
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
    menuItems: [
      {
        title: 'Lesson',
        graphics: <Book />,
        onClick: () => alert('Lesson clicked')
      },
      {
        title: 'Quiz',
        graphics: <Checkbox />,
        onClick: () => alert('Quiz clicked')
      },
      {
        title: 'Attachment',
        isBottomBorder: true,
        onClick: () => alert('Attachment clicked')
      }
    ]
  }
}

export const WithAdditionalInfo: Story = {
  args: {
    density: 2,
    menuItems: [
      {
        title: 'Lesson',
        additionalInfo: 'Explore comprehensive lessons on various topics',
        graphics: <Book />,
        onClick: () => alert('Lesson clicked')
      },
      {
        title: 'Quiz',
        additionalInfo: 'Test your knowledge with engaging quizzes',
        graphics: <Book />,
        onClick: () => alert('Quiz clicked')
      },
      {
        title: 'Attachment',
        additionalInfo: 'Access all your important files and documents',
        graphics: <Book />,
        onClick: () => alert('Attachment clicked')
      }
    ]
  }
}

export const WithNestedMenuItems: Story = {
  args: {
    density: 2,
    menuItems: [
      {
        title: 'Lesson',
        additionalInfo: 'Explore comprehensive lessons on various topics',
        graphics: <Book />,
        nestedMenuItems: [
          {
            title: 'Math',
            graphics: <Book />,
            onClick: () => alert('Math clicked')
          },
          {
            title: 'Science',
            graphics: <Book />,
            onClick: () => alert('Science clicked')
          },
          {
            title: 'History',
            graphics: <Book />,
            onClick: () => alert('History clicked')
          }
        ]
      },
      {
        title: 'Quiz',
        additionalInfo: 'Test your knowledge with engaging quizzes',
        graphics: <Book />,
        nestedMenuItems: [
          {
            title: 'Geometry',
            graphics: <Book />,
            onClick: () => alert('Geometry clicked')
          },
          {
            title: 'Chemistry',
            graphics: <Book />,
            onClick: () => alert('Chemistry clicked')
          },
          {
            title: 'Modern History',
            graphics: <Book />,
            onClick: () => alert('Modern History clicked')
          }
        ]
      },
      {
        title: 'Attachment',
        additionalInfo: 'Files and documents',
        graphics: <Book />,
        nestedMenuItems: [
          {
            title: 'Solid of revolution',
            graphics: <Book />,
            onClick: () => alert('Solid of revolution clicked')
          },
          {
            title: 'Molecule',
            graphics: <Book />,
            onClick: () => alert('Molecule clicked')
          },
          {
            title: 'Modern world map',
            graphics: <Book />,
            onClick: () => alert('Modern world map clicked')
          }
        ]
      }
    ]
  }
}
