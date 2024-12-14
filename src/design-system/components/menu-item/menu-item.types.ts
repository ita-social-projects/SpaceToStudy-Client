import { ReactNode } from 'react'

export interface MenuItemProps {
  title: string
  graphics?: ReactNode
  isBottomBorder?: boolean
  onClick?: () => void
}
