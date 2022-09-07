import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'

import { style } from './AppTextField.styles'

const AppTextField = ({ errorMsg, ...props }) => {
  const helperText = errorMsg ? (
    <Tooltip title={ errorMsg }>
      <Typography variant='caption'>
        { errorMsg }
      </Typography>
    </Tooltip>
  ) : (
    ' '
  )

  return (
    <TextField
      FormHelperTextProps={ { sx: style.helperText } }
      error={ Boolean(errorMsg) }
      helperText={ helperText }
      { ...props }
    />
  )
}

export default AppTextField
