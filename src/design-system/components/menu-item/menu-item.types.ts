import { ReactNode } from 'react'

export type OnItemClickArgs = Record<string, string | Event>

export interface MenuItemProps {
  title: string
  graphics?: ReactNode
  isBottomBorder?: boolean
  onClick?: () => void
}
