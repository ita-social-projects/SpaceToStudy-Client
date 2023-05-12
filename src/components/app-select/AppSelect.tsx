import { useTranslation } from 'react-i18next'

import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'

import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'

import { SelectFieldType } from '~/types'
import { styles } from '~/components/app-select/AppSelect.styles'

interface AppSelectProps<T> extends SelectProps<T> {
  setValue: (value: T) => void
  value: T
  fields: SelectFieldType<T>[]
  selectTitle?: string
}

const AppSelect = <T extends string | number>({
  setValue,
  value,
  fields,
  selectTitle,
  sx,
  label,
  ...props
}: AppSelectProps<T>) => {
  const { t } = useTranslation()

  const changeValue = (event: SelectChangeEvent<T>) =>
    setValue(event.target.value as T)

  const fieldsList = fields.map((field) => (
    <MenuItem key={field.title} value={field.value}>
      {t(field.title)}
    </MenuItem>
  ))
  const titleEl = selectTitle && (
    <Typography
      aria-label='select-title'
      sx={styles.selectTitle}
      variant='body2'
    >
      {t(selectTitle)}
    </Typography>
  )

  return (
    <Box sx={{ ...styles.selectContainer, ...sx }}>
      {titleEl}
      <FormControl fullWidth sx={styles.formControl}>
        <InputLabel id='select-label'>{label}</InputLabel>
        <Select
          inputProps={{ 'data-testid': 'app-select' }}
          label={label}
          labelId='select-label'
          onChange={changeValue}
          sx={styles.selectField}
          value={value}
          {...props}
        >
          {fieldsList}
        </Select>
      </FormControl>
    </Box>
  )
}

export default AppSelect
