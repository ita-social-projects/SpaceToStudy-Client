import { ReactNode } from 'react'

export interface MenuItemProps {
  title: string
  additionalInfo?: string
  isDropdown?: boolean
  graphics?: ReactNode
  variant?: 'default' | 'nested'
  onClick?: () => void
}
