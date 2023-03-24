import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FilterListIcon from '@mui/icons-material/FilterList'

import { styles } from '~/components/filters-title/FiltersTitle.styles'

interface FiltersTitleProps {
    chosenFiltersQty?:number,
    handleOpenFilters: () => void,
}

const FiltersTitle:FC<FiltersTitleProps> = ({ chosenFiltersQty = 0, handleOpenFilters }) => {
  const { t } = useTranslation()
  
  return (
    <Box sx={ styles.container }>
      <Box onClick={ handleOpenFilters } sx={ styles.cursorContainer }>
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

export default FiltersTitle
