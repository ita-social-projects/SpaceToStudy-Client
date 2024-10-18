import { FC, useMemo } from 'react'
import Typography from '@mui/material/Typography'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'

import { styles } from '~/components/app-text-field/AppTextField.styles'
import { TypographyVariantEnum } from '~/types'

interface AppTextFieldProps
  extends Omit<TextFieldProps, 'error' | 'helperText'> {
  errorMsg?: string
  withHelperText?: boolean
}

const AppTextField: FC<AppTextFieldProps> = ({
  errorMsg,
  multiline,
  withHelperText = true,
  ...props
}) => {
  const helperText = useMemo(() => {
    return errorMsg ? (
      <Tooltip title={errorMsg}>
        <Typography variant={TypographyVariantEnum.Caption}>
          {errorMsg}
        </Typography>
      </Tooltip>
    ) : null
  }, [errorMsg])

  return (
    <TextField
      FormHelperTextProps={{ sx: styles.helperText(multiline) }}
      error={Boolean(errorMsg)}
      helperText={withHelperText ? helperText : ' '}
      multiline={multiline}
      {...props}
    />
  )
}

export default AppTextField
