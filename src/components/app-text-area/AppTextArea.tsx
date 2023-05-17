import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { TextFieldProps } from '@mui/material/TextField'

import AppTextField from '~/components/app-text-field/AppTextField'

import { VariantEnum } from '~/types'
import { styles } from '~/components/app-text-area/AppTextArea.styles'

interface AppTextAreaProps
  extends Omit<TextFieldProps, 'error' | 'helperText'> {
  maxLength?: number
  errorMsg?: string
  value?: string
}

const AppTextArea: FC<AppTextAreaProps> = ({
  minRows = 4,
  maxRows = 4,
  maxLength,
  title,
  value,
  sx,
  ...props
}) => {
  const titleEl = title && (
    <Typography sx={styles.title} variant={VariantEnum.Body2}>
      {title}
    </Typography>
  )
  return (
    <Box sx={{ position: 'relative', ...sx }}>
      {titleEl}
      <AppTextField
        inputProps={{ maxLength }}
        maxRows={minRows}
        minRows={maxRows}
        multiline
        sx={styles.textarea}
        value={value}
        {...props}
      />
      {maxLength && (
        <Typography
          color={value?.length === maxLength ? 'error' : 'text'}
          sx={styles.textLength}
          variant={VariantEnum.Body2}
        >
          {`${Number(value?.length)}/${maxLength}`}
        </Typography>
      )}
    </Box>
  )
}

export default AppTextArea
