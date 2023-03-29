import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FilterListIcon from '@mui/icons-material/FilterList'

import { styles } from '~/components/filters-toggle/FiltersToggle.styles'

interface FiltersToggleProps {
    chosenFiltersQty?:number,
    handleToggle: () => void,
}

const FiltersToggle:FC<FiltersToggleProps> = ({ chosenFiltersQty = 0, handleToggle }) => {
  const { t } = useTranslation()

  return (
    <Box sx={ styles.container }>
      <Box onClick={ handleToggle } sx={ styles.cursorContainer }>
        <FilterListIcon sx={ styles.icon } />
        <Typography sx={ styles.title } variant='h6'>
          { t('filters.filtersListTitle') }
        </Typography>
      </Box>
      { chosenFiltersQty ? (
        <Typography sx={ styles.chosenFiltersQty } variant='subtitle2'>
          { chosenFiltersQty }
        </Typography>
      ) : null }
    </Box>
  )
}

export default FiltersToggle
