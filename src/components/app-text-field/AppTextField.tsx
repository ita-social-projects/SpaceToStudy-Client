import { FC } from 'react'
import Typography from '@mui/material/Typography'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'

import { styles } from '~/components/app-text-field/AppTextField.styles'
import { TypographyVariantEnum } from '~/types'
import { SxProps } from '@mui/material'

interface AppTextFieldProps
  extends Omit<TextFieldProps, 'error' | 'helperText'> {
  errorMsg?: string
  withHelperText?: boolean
  sx?: SxProps
}

const AppTextField: FC<AppTextFieldProps> = ({
  errorMsg,
  multiline,
  withHelperText = true,
  ...props
}) => {
  const helperText = errorMsg ? (
    <Tooltip title={errorMsg}>
      <Typography variant={TypographyVariantEnum.Caption}>
        {errorMsg}
      </Typography>
    </Tooltip>
  ) : (
    ' '
  )

  return (
    <TextField
      FormHelperTextProps={{ sx: styles.helperText(multiline) }}
      error={Boolean(errorMsg)}
      helperText={withHelperText && helperText}
      multiline={multiline}
      {...props}
    />
  )
}

export default AppTextField
