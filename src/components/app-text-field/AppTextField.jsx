import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'

import { styles } from '~/components/app-text-field/AppTextField.styles'

const AppTextField = ({ errorMsg, ...props }) => {
  const helperText = errorMsg ? (
    <Tooltip title={ errorMsg }>
      <Typography variant='caption'>
{errorMsg}
</Typography>
    </Tooltip>
  ) : (
    ' '
  )

  return (
    <TextField
      FormHelperTextProps={ { sx: styles.helperText } }
      error={ Boolean(errorMsg) }
      helperText={ helperText }
      { ...props }
    />
  )
}

export default AppTextField
