import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'

const Loader = ({ size }) => {
  return (
    <Box
      data-testid="loader"
      sx={ { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' } }
    >
      <CircularProgress color={ 'basic' } size={ size } />
    </Box>
  )
}

export default Loader
