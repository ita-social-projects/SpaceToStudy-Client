import type { Meta, StoryObj } from '@storybook/react'
import { EditRounded } from '@mui/icons-material'

import MenuItem from '~scss-components/menu-item/MenuItem'
import { MenuItemColorVariant } from '~scss-components/menu-item/MenuItem.constants'

const meta: Meta<typeof MenuItem> = {
  title: 'Components/MenuItem',
  component: MenuItem,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof MenuItem>

export const Default: Story = {
  args: {
    title: 'Assigment',
    onClick: () => alert('Item "Default" was clicked.')
  }
}

export const WithGraphics: Story = {
  args: {
    title: 'Assigment',
    graphics: <EditRounded />,
    onClick: () => alert('Item "With Graphics" was clicked.')
  }
}

export const WithAdditionalInfo: Story = {
  args: {
    title: 'Assigment',
    graphics: <EditRounded />,
    additionalInfo: 'Due in 2 days',
    density: 2,
    onClick: () => alert('Item "With Additional Info" was clicked.')
  }
}

export const WithDropdown: Story = {
  args: {
    title: 'Assigment',
    graphics: <EditRounded />,
    isDropdown: true,
    onClick: () => alert('Imagine dropdown was expanded.')
  }
}

export const Toggled: Story = {
  args: {
    title: 'Assigment',
    graphics: <EditRounded />,
    isToggled: true,
    onClick: () => alert('Item "Toggled" was clicked.')
  }
}

export const WithBottomBorder: Story = {
  args: {
    title: 'Assigment',
    graphics: <EditRounded />,
    isBottomBorder: true,
    onClick: () => alert('Item "With Bottom Border" was clicked.')
  }
}

export const Disabled: Story = {
  args: {
    title: 'Assigment',
    graphics: <EditRounded />,
    isDisabled: true,
    onClick: () => alert('Item "Disabled" was clicked.')
  }
}

export const RemovableMenuItem: Story = {
  args: {
    title: 'Assigment',
    graphics: <EditRounded />,
    onClick: () => alert('Item "With Remove" was clicked.'),
    onRemove: () => alert('Imagine this item was removed')
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
