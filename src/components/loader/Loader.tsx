import { FC } from 'react'
import { SxProps } from '@mui/system'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

interface LoaderProps {
  size: number,
  sx?: SxProps,
  pageLoad?: boolean
}

const Loader: FC<LoaderProps> = ({ size, sx, pageLoad }) => {
  return (
    <Box
      data-testid='loader'
      sx={ { display: 'flex', justifyContent: 'center', alignItems: 'center', flex: pageLoad ? 1 : 0 } }
    >
      <CircularProgress size={ size } sx={ { ...sx, color: 'basic.black' } } />
    </Box>
  )
}

export default Loader
