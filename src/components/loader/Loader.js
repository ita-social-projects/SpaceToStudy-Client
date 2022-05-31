import { CircularProgress } from '@mui/material'

const Loader = ({ size }) => {
  return (
    <CircularProgress 
      color={ 'basic' } 
      size={ size } 
      sx={ { position: 'fixed', left: '50%', top: '50%' } }
    />)
}

export default Loader
