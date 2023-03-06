import { useTranslation } from 'react-i18next'

import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/sort-by-select/SortBySelect.styles'

const SortBySelect = ({ setSortBy, sortBy, sortingFields }) => {
  const { t } = useTranslation()

  const changeSortBy = (e) => setSortBy(e.target.value)

  return (
    <Box sx={ styles.selectContainer } >
      <Typography sx={ styles.selectTitle } variant='subtitle1' >
        { t('sortBy.sortByTitle') }
        :
      </Typography>
      <Select
        inputProps={ { 'data-testid':'sort-by-select' } }
        onChange={ changeSortBy }
        sx={ styles.selectField }
        value={ sortBy }
      >
        { sortingFields.map(field => (
          <MenuItem key={ field.value } value={ field.value }>
            { t(field.title) }
          </MenuItem>)) 
        }
      </Select>
    </Box>
  )
}

export default SortBySelect
