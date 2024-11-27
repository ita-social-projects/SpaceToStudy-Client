import { Box, Typography, Divider } from '@mui/material'

import '~scss-components/divider/Divider.scss'

const variants = ['fullWidth', 'inset', 'middle'] as const
const orientation = ['vertical', 'horizontal'] as const
const thickness = ['vertical', 'horizontal'] as const
const textAlign = ['left', 'right', 'center'] as const

type DividerProps = {
  variant: (typeof variants)[number]
  orientation: (typeof orientation)[number]
  thickness: (typeof thickness)[number]
  textAlign: (typeof textAlign)[number]
  caption: string
}

const DividerComponent: React.FC<DividerProps> = ({
  variant,
  orientation,
  thickness,
  caption,
  textAlign
}) => {
  return (
    <Box className={'s2s-divider'}>
      <Divider
        className={cn('s2s-divider-line')}
        orientation={orientation}
        textAlign={textAlign}
        // thickness={thickness}
        variant={variant}
      >
        <Typography className='s2s-divider-caption'>{caption}</Typography>
      </Divider>
    </Box>
  )
}

export default DividerComponent
