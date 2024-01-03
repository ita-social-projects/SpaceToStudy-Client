import { FC } from 'react'
import { SxProps } from '@mui/system'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/loader/Loader.styles'

interface LoaderProps {
  size?: number
  sx?: SxProps
  containerSx?: SxProps
  pageLoad?: boolean
}

const Loader: FC<LoaderProps> = ({
  size = 70,
  sx,
  containerSx,
  pageLoad = false
}) => {
  return (
    <Box
      data-testid='loader'
      sx={spliceSx(styles.container(pageLoad), containerSx)}
    >
      <CircularProgress size={size} sx={spliceSx(styles.loader, sx)} />
    </Box>
  )
}
export default Loader
