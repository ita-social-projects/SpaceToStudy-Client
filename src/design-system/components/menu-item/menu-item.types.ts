import { ReactNode } from 'react'

export interface MenuItemProps {
  title: string
  additionalInfo?: string
  density?: 1 | 2
  dropDownIconVariant?: 'up' | 'down'
  graphics?: ReactNode
  variant?: 'default' | 'nested'
}
