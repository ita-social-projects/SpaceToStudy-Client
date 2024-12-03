import { Box, Typography, Divider } from '@mui/material'
import { cn } from '~/utils/cn'

import '~scss-components/divider/Divider.scss'

const variants = ['fullWidth', 'inset', 'middle'] as const
const orientation = ['vertical', 'horizontal'] as const
const thickness = ['sm', 'md', 'lg'] as const
const textAlign = ['left', 'right', 'center'] as const
const type = ['ellipse', 'linear'] as const
const size = ['small', 'large'] as const

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
  const borderColor = thickness === 'lg' ? '#9199A1' : '#C8CCD0'

  return (
    <Box
      className={cn('s2s-divider', {
        [`s2s-divider-${orientation}`]: orientation
      })}
    >
      {type === 'linear' ? (
        <Divider
          className={'s2s-divider-line'}
          orientation={orientation}
          sx={{
            '&.MuiDivider-root': {
              '&::before': {
                border: `thin solid ${borderColor}`
              },
              '&::after': {
                border: `thin solid ${borderColor}`
              }
            }
          }}
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
