import { cn } from '~/utils/cn'
import { Box, Typography, Divider } from '@mui/material'

import '~scss-components/divider/Divider.scss'

const variants = ['linear', 'ellipse', 'middle'] as const
const orientation = ['vertical', 'horizontal'] as const
const thickness = ['vertical', 'horizontal'] as const

type DividerProps = {
  variant: (typeof variants)[number]
  orientation: (typeof orientation)[number]
  thickness: (typeof thickness)[number]
  caption: string
}

const DividerComponent: React.FC<DividerProps> = ({
  variant,
  orientation,
  thickness,
  caption
}) => {
  return (
    <Box className={cn('s2s-divider')}>
      <Divider variant={variant} />
      <Typography>{caption}</Typography>
      <Divider variant={variant} />
    </Box>
  )
}

export default DividerComponent
