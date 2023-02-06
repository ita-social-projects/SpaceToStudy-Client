import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const Loader = ({ size, sx, pageLoad }) => {
  return (
    <Box
      data-testid='loader'
      sx={ { display: 'flex', justifyContent: 'center', alignItems: 'center', flex: pageLoad && 1 } }
    >
      <CircularProgress color={ 'basic' } size={ size } sx={ sx } />
    </Box>
  )
}

export default Loader
