import { Button, Box } from '@mui/material'

import Loader from '../loader/Loader'

import { style } from './AppButton.style'

const AppButton = ({ label, variant, size, buttonStyle, type, loading, disabled }) => {
  const loader = (
    <Box sx={ style.loaderContainer }>
      <Loader size={ 20 } />
    </Box>
  )

  const button = (
    <Button
      disabled={ disabled } size={ size } sx={ buttonStyle }
      type={ type } variant={ variant }
    >
      { label }
    </Button>
  )

  return loading ? loader : button
}

export default AppButton
