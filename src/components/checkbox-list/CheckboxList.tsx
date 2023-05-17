import { useTranslation } from 'react-i18next'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Typography, { TypographyProps } from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'

import { styles } from './CheckboxList.styles'
import { updateCheckBoxState } from '~/utils/checkbox-list'

interface CheckboxListProps<T> extends Pick<TypographyProps, 'variant'> {
  items: T[]
  value?: T[]
  title?: string
  error?: string
  fillRange?: boolean
  onChange: (checkbox: T[]) => void
}

const CheckboxList = <T extends string>({
  items,
  error = '',
  value = [],
  title,
  fillRange,
  variant,
  onChange
}: CheckboxListProps<T>) => {
  const { t } = useTranslation()

  const handleCheckbox = (checkbox: T) => {
    const updatedCheckboxes = updateCheckBoxState<T>(
      items,
      value,
      checkbox,
      fillRange
    )

    onChange(updatedCheckboxes)
  }

  const checkboxesList = items.map((checkbox) => (
    <FormControlLabel
      checked={value.includes(checkbox)}
      control={
        <Checkbox
          inputProps={{ 'aria-label': checkbox }}
          sx={styles.checkbox}
        />
      }
      key={checkbox}
      label={<Typography variant={variant}>{t(checkbox)}</Typography>}
      onChange={() => handleCheckbox(checkbox)}
    />
  ))

  const checkboxesTitle = title && (
    <Typography
      aria-label='checkboxes-list-title'
      sx={styles.title}
      variant='h6'
    >
      {t(title)}
    </Typography>
  )

  const helperText = (
    <Tooltip title={error}>
      <Typography sx={styles.error} variant='caption'>
        {error}
      </Typography>
    </Tooltip>
  )

  return (
    <Box sx={styles.root}>
      {checkboxesTitle}
      {checkboxesList}
      {helperText}
    </Box>
  )
}

export default CheckboxList
