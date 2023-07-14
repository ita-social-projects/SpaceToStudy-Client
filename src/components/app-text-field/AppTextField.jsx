import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/app-text-field/AppTextField.styles'

const AppTextField = ({ errorMsg, multiline, ...props }) => {
  const helperText = errorMsg ? (
    <Tooltip title={errorMsg}>
      <Typography variant='caption'>{errorMsg}</Typography>
    </Tooltip>
  ) : (
    ' '
  )

  return (
    <TextField
      FormHelperTextProps={{ sx: styles.helperText(multiline) }}
      error={Boolean(errorMsg)}
      helperText={helperText}
      multiline={multiline}
      {...props}
    />
  )
}

export default AppTextField
