import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { SelectFieldType } from '~/types'
import { styles } from '~/components/app-select/AppSelect.styles'

interface AppSelectProps extends SelectProps<string> {
  setValue: (value: string) => void
  value: string
  fields: SelectFieldType[]
  selectTitle?: string
}

const AppSelect: FC<AppSelectProps> = ({
  setValue,
  value,
  fields,
  selectTitle = '',
  sx,
  ...props
}) => {
  const { t } = useTranslation()

  const changeValue = (event: SelectChangeEvent) => setValue(event.target.value)

  const fieldsList = fields.map((field) => (
    <MenuItem key={field.value} value={field.value}>
      {t(field.title)}
    </MenuItem>
  ))
  const titleEl = selectTitle.length ? (
    <Typography
      aria-label='select-title'
      sx={styles.selectTitle}
      variant='body2'
    >
      {t(selectTitle)}
    </Typography>
  ) : null

  return (
    <Box sx={{ ...styles.selectContainer, ...sx }}>
      {titleEl}
      <Select
        inputProps={{ 'data-testid': 'app-select' }}
        onChange={changeValue}
        sx={styles.selectField}
        value={value}
        {...props}
      >
        {fieldsList}
      </Select>
    </Box>
  )
}

export default AppSelect
