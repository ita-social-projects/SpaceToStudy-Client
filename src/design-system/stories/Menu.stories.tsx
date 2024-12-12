import type { Meta, StoryObj } from '@storybook/react'

import Menu from '~scss-components/menu/Menu'

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
    menuItems: [{ title: 'Lesson' }, { title: 'Quiz' }, { title: 'Attachment' }]
  }
}
