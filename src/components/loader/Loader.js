import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const Loader = ({ size, sx }) => {
  return (
    <Box data-testid='loader' sx={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
      <CircularProgress color={ 'basic' } size={ size } sx={ sx } />
    </Box>
  )
}

export default Loader
