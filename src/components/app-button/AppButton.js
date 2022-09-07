import { Button, Box } from '@mui/material'

import Loader from '../loader/Loader'

import { style } from './AppButton.style'

const AppButton = ({ loading, label, ...props }) => {
  const loader = (
    <Box sx={ style.loaderContainer }>
      <Loader size={ 20 } />
    </Box>
  )

  const button = (<Button { ...props }>
    { label }
  </Button>)

  return loading ? loader : button
}

export default AppButton
