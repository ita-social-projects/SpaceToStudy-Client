import { FC } from 'react'
import { SxProps } from '@mui/system'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import { styles } from '~/components/loader/Loader.styles'

interface LoaderProps {
  size?: number
  sx?: {
    container?: SxProps
    loader?: SxProps
  }
  pageLoad?: boolean
}

const Loader: FC<LoaderProps> = ({ size = 70, sx, pageLoad = false }) => {
  return (
    <Box
      data-testid='loader'
      sx={{ ...styles.container(pageLoad), ...sx?.container }}
    >
      <CircularProgress size={size} sx={{ ...styles.loader, ...sx?.loader }} />
    </Box>
  )
}
export default Loader
