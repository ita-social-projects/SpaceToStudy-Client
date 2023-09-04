import { SxProps } from '@mui/material'
import { ReactNode } from 'react'

export interface AccordionItem {
  title: string
  description?: string
  content?: ReactNode
}
export interface AccordionStyles {
  root?: SxProps
  accordion?: SxProps
  active?: SxProps
  inactive?: SxProps
  summary?: SxProps
  titleActive?: SxProps
  titleInactive?: SxProps
  details?: SxProps
  description?: SxProps
}
export interface AccordionSx {
  withIcon?: AccordionStyles
  noIcon?: AccordionStyles
}
