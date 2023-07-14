import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppTextField from '~/components/app-text-field/AppTextField'

import { styles } from '~/components/app-text-area/AppTextArea.styles'

const AppTextArea = ({
  minRows = 4,
  maxRows = 4,
  maxLength,
  title,
  value,
  sx,
  ...props
}) => {
  const titleEl = title && <Typography sx={styles.title}>{title}</Typography>

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
          color={value?.length === maxLength ? 'error' : 'primary.300'}
          sx={styles.textLength}
          variant={'body2'}
        >
          {`${Number(value?.length)}/${maxLength}`}
        </Typography>
      )}
    </Box>
  )
}

export default AppTextArea
