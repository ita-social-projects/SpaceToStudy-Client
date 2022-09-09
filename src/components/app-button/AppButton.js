import { Button } from '@mui/material'

import Loader from '../loader/Loader'

const AppButton = ({ children, loading, disabled, ...props }) => {
  const loader = <Loader size={ 20 } sx={ { opacity: '0.6', color: 'basic.black' } } />

  return (
    <Button { ...props } disabled={ loading || disabled }>
      { loading ? loader : children }
    </Button>
  )
}

export default AppButton
