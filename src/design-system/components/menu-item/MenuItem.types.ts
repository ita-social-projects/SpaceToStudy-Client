import { ReactNode } from 'react'
import { MenuItemColorVariant } from './MenuItem.constants'

export type OnItemClickArgs = Record<string, string | Event>

export interface MenuItemProps {
  title: string
  additionalInfo?: string
  alignVariant?: 'left' | 'center' | 'right'
  colorVariant?: MenuItemColorVariant
  isDisabled?: boolean
  graphics?: ReactNode
  isBottomBorder?: boolean
  onClick?: () => void
}
