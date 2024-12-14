import type { Meta, StoryObj } from '@storybook/react'

import Menu from '~scss-components/menu/Menu'
import { Book } from '@mui/icons-material'
import { Checkbox } from '@mui/material'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof Menu>

export const Default: Story = {
  args: {
    open: true,
    menuItems: [
      { title: 'Lesson', graphics: <Book /> },
      { title: 'Quiz', graphics: <Checkbox /> },
      { title: 'Attachment' }
    ]
  }
}

export const WithAdditionalInfo: Story = {
  args: {
    open: true,
    density: 2,
    menuItems: [
      {
        title: 'Lesson',
        additionalInfo: 'Explore comprehensive lessons on various topics',
        graphics: <Book />
      },
      {
        title: 'Quiz',
        additionalInfo: 'Test your knowledge with engaging quizzes',
        graphics: <Book />
      },
      {
        title: 'Attachment',
        additionalInfo: 'Access all your important files and documents',
        graphics: <Book />
      }
    ]
  }
}

export const WithNestedMenuItems: Story = {
  args: {
    open: true,
    menuItems: [
      {
        title: 'Lesson',
        graphics: <Book />,
        nestedMenuItems: [
          { title: 'Math', graphics: <Book /> },
          { title: 'Science', graphics: <Book /> },
          { title: 'History', graphics: <Book /> }
        ]
      },
      {
        title: 'Quiz',
        graphics: <Book />,
        nestedMenuItems: [
          { title: 'Math', graphics: <Book /> },
          { title: 'Science', graphics: <Book /> },
          { title: 'History', graphics: <Book /> }
        ]
      },
      {
        title: 'Attachment',
        graphics: <Book />,
        nestedMenuItems: [
          { title: 'Math', graphics: <Book /> },
          { title: 'Science', graphics: <Book /> },
          { title: 'History', graphics: <Book /> }
        ]
      }
    ]
  }
}
