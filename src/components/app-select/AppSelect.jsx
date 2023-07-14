import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/app-select/AppSelect.styles'

const AppSelect = ({
  setValue,
  value,
  fields,
  selectTitle,
  sx,
  label,
  ...props
}) => {
  const { t } = useTranslation()

  const changeValue = (event) => setValue(event.target.value)

  const fieldsList = fields.map(({ title, value }) => {
    if (typeof value === 'string' || typeof value === 'number') {
      return (
        <MenuItem key={title} value={value}>
          {t(title)}
        </MenuItem>
      )
    }
  })

  const titleEl = selectTitle && (
    <Typography aria-label='select-title' sx={styles.selectTitle}>
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
