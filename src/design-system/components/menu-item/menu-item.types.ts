import { ReactNode } from 'react'

export interface MenuItemProps {
  title: string
  additionalInfo?: string
  density?: 1 | 2
  graphics?: ReactNode
  variant?: 'default' | 'nested'
}
