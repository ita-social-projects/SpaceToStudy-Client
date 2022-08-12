import { CircularProgress, Box } from '@mui/material'

const Loader = ({ size }) => {
  return (
    <Box
      data-testid="loader"
      sx={ { display:'flex', justifyContent: 'center', alignItems: 'center', height: '100%' } }
    >
      <CircularProgress 
        color={ 'basic' }
        size={ size }
        sx={ { transform: 'translate(-50%, -50%)' } }
      />
    </Box>
  )
}

export default Loader
