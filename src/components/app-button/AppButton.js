import { Button } from '@mui/material'

import Loader from '../loader/Loader'

const AppButton = ({ loading, label, ...props }) => {
  const loader = (
    <Button { ...props } disabled>
      <Loader size={ 20 } sx={ { opacity: '0.6', color: 'basic.black' } } />
    </Button>
  )

  const button = (<Button { ...props }>
    { label }
  </Button>)

  return loading ? loader : button
}

export default AppButton
