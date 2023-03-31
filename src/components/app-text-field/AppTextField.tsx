import { FC } from 'react'
import Typography from '@mui/material/Typography'
import TextField,{ TextFieldProps } from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'

import { styles } from '~/components/app-text-field/AppTextField.styles'

interface AppTextFieldProps extends Omit<TextFieldProps, 'error'|'helperText'> {
  errorMsg?:string
}

const AppTextField:FC<AppTextFieldProps> = ({ errorMsg, ...props }) => {
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
      FormHelperTextProps={ { sx: styles.helperText } }
      error={ Boolean(errorMsg) }
      helperText={ helperText }
      { ...props }
    />
  )
}

export default AppTextField
