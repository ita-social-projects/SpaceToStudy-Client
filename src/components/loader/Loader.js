import { CircularProgress, Box } from '@mui/material'

const Loader = ({ size }) => {
  return (
    <Box data-testid='loader' sx={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
      <CircularProgress color={ 'basic' } size={ size } />
    </Box>
  )
}

export default Loader
