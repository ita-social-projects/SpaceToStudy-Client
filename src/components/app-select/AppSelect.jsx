import { useTranslation } from 'react-i18next'

import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/app-select/AppSelect.styles'

<<<<<<< HEAD
const AppSelect = ({ setValue, value, fields, selectTitle = '' }) => {
  const { t } = useTranslation()

  const changeValue = (e) => setValue(e.target.value)

  const sortingFieldsList = fields.map(field => (
=======
const AppSelect = ({ setSortBy, sortBy, sortingFields, selectTitle = '' }) => {
  const { t } = useTranslation()

  const changeSortBy = (e) => setSortBy(e.target.value)

  const sortingFieldsList = sortingFields.map(field => (
>>>>>>> 2bdaee9 (add mapping separately and updated component and connected files names)
    <MenuItem key={ field.value } value={ field.value }>
      { t(field.title) }
    </MenuItem>)
  )
<<<<<<< HEAD
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
=======

  return (
    <Box sx={ styles.selectContainer } >
      <Typography sx={ styles.selectTitle } variant='subtitle1' >
        { t(selectTitle) }
        :
      </Typography>
      <Select
        inputProps={ { 'data-testid': 'sort-by-select' } }
        onChange={ changeSortBy }
        sx={ styles.selectField }
        value={ sortBy }
>>>>>>> 2bdaee9 (add mapping separately and updated component and connected files names)
      >
        { sortingFieldsList }
      </Select>
    </Box>
  )
}

export default AppSelect
