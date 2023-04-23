import { FC } from 'react'
import { SxProps } from '@mui/system'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import { styles } from '~/components/loader/Loader.styles'

interface LoaderProps {
  size: number
  sx?: SxProps
  wrapperStyles?: SxProps
  pageLoad?: boolean
}

const Loader: FC<LoaderProps> = ({
  size,
  sx,
  wrapperStyles,
  pageLoad = false
}) => {
  return (
    <Box
      data-testid='loader'
      sx={{ ...styles.container(pageLoad), ...wrapperStyles }}
    >
      <CircularProgress size={size} sx={{ ...sx, ...styles.loader }} />
    </Box>
  )
}
export default Loader
