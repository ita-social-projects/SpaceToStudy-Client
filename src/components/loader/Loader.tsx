import { FC } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

type LoaderProps = {
  size: number
  sx?: { [key: string]: number | string }
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
