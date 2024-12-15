import { ReactNode } from 'react'

export type OnItemClickArgs = Record<string, string | Event>

export interface MenuItemProps {
  title: string
  alignVariant?: 'left' | 'right' | 'center'
  colorVariant?: 'default' | 'danger' | 'secondary'
  isDisabled?: boolean
  graphics?: ReactNode
  isBottomBorder?: boolean
  onClick?: () => void
}
