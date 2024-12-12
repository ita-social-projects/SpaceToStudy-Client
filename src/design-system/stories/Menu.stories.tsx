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
