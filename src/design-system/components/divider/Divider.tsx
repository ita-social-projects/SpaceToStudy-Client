import { Box, Typography, Divider } from '@mui/material'
import { cn } from '~/utils/cn'

import '~scss-components/divider/Divider.scss'

const variants = ['fullWidth', 'inset', 'middle'] as const
const orientation = ['vertical', 'horizontal'] as const
const thickness = ['sm', 'md', 'lg'] as const
const textAlign = ['left', 'right', 'center'] as const
const type = ['ellipse', 'linear'] as const
const size = ['small', 'big'] as const

type DividerProps = {
  variant: (typeof variants)[number]
  orientation: (typeof orientation)[number]
  thickness: (typeof thickness)[number]
  textAlign: (typeof textAlign)[number]
  caption: string
  type: (typeof type)[number]
  size?: (typeof size)[number]
}

const DividerComponent: React.FC<DividerProps> = ({
  variant,
  orientation,
  thickness,
  size,
  caption,
  textAlign,
  type
}) => {
  return (
    <Box className={'s2s-divider'}>
      {type === 'linear' ? (
        <Divider
          className={cn(`s2s-divider-line`, {
            [`s2s-divider-line-${thickness}`]: thickness
          })}
          orientation={orientation}
          textAlign={textAlign}
          variant={variant}
        >
          <Typography className='s2s-divider-caption'>{caption}</Typography>
        </Divider>
      ) : (
        <Box
          className={cn('s2s-divider-ellipse', {
            [`s2s-divider-ellipse-${size}`]: size,
            [`s2s-divider-ellipse-${thickness}`]: thickness
          })}
        ></Box>
      )}
    </Box>
  )
}

export default DividerComponent
