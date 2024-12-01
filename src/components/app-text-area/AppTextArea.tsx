import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SxProps } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField'

import AppTextField from '~/components/app-text-field/AppTextField'

import { spliceSx } from '~/utils/helper-functions'
import { TypographyVariantEnum } from '~/types'
import { styles } from '~/components/app-text-area/AppTextArea.styles'

interface AppTextAreaProps
  extends Omit<TextFieldProps, 'error' | 'helperText'> {
  maxLength?: number
  minLength?: number
  errorMsg?: string
  value?: string
  textFieldStyles?: SxProps
  withHelperText?: boolean
  isRightAligned?: boolean
}

const AppTextArea: FC<AppTextAreaProps> = ({
  minRows = 4,
  maxRows = 4,
  maxLength,
  minLength,
  title,
  value,
  sx,
  textFieldStyles,
  isRightAligned,
  ...props
}) => {
  const titleEl = title && <Typography sx={styles.title}>{title}</Typography>
  const textLengthStyle = isRightAligned
    ? styles.textLengthRight
    : styles.textLength
  const isLengthTooShort =
    minLength && value?.length < minLength && value?.length !== 0
  const isLengthTooLong = value?.length === maxLength
  const isLengthValid =
    isLengthTooShort || isLengthTooLong ? 'error' : 'primary.300'

  return (
    <Box sx={spliceSx(styles.container, sx)}>
      {titleEl}
      <AppTextField
        inputProps={{ maxLength }}
        maxRows={maxRows}
        minRows={minRows}
        multiline
        sx={spliceSx(styles.textarea, textFieldStyles)}
        value={value}
        {...props}
      />
      {maxLength && (
        <Typography
          color={isLengthValid}
          sx={textLengthStyle}
          variant={TypographyVariantEnum.Body2}
        >
          {`${Number(value?.length)}/${maxLength}`}
        </Typography>
      )}
    </Box>
  )
}

export default AppTextArea
