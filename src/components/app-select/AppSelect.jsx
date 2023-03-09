import { useTranslation } from 'react-i18next'

import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/app-select/AppSelect.styles'

const AppSelect = ({ setValue, value, fields, selectTitle = '' }) => {
  const { t } = useTranslation()

  const changeValue = (e) => setValue(e.target.value)

  const fieldsList = fields.map(field => (
    <MenuItem key={ field.value } value={ field.value }>
      { t(field.title) }
    </MenuItem>)
  )
  const titleEl = selectTitle.length ? (
    <Typography sx={ styles.selectTitle } variant='subtitle1' >
      { t(selectTitle) }
      :
    </Typography>
  ) : null 

  return (
    <Box sx={ styles.selectContainer } >
      { titleEl }
      <Select
        inputProps={ { 'data-testid': 'app-select' } }
        onChange={ changeValue }
        sx={ styles.selectField }
        value={ value }
      >
        { fieldsList }
      </Select>
    </Box>
  )
}

export default AppSelect
