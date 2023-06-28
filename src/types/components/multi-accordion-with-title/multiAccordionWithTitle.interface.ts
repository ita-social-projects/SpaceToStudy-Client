import { SxProps } from '@mui/material'
import { AccordionSx } from '~/types'

export interface MultiAccordionWithTitleSx extends AccordionSx {
  root?: SxProps
  title?: SxProps
  icon?: SxProps
  container?: SxProps
}
