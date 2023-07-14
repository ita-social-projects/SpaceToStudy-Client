import { useTranslation } from 'react-i18next'

import FilterListIcon from '@mui/icons-material/FilterList'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/filters-toggle/FiltersToggle.styles'

const FiltersToggle = ({ chosenFiltersQty = 0, handleToggle }) => {
  const { t } = useTranslation()

  return (
    <Box onClick={handleToggle} sx={styles.container}>
      <Box
        data-testid='toggle-button'
        sx={styles.cursorContainer(Boolean(handleToggle))}
      >
        <FilterListIcon sx={styles.icon} />
        <Typography sx={styles.title} variant='h6'>
          {t('filters.filtersListTitle')}
        </Typography>
      </Box>
      {chosenFiltersQty ? (
        <Typography
          data-testid='filters-qty'
          sx={styles.chosenFiltersQty}
          variant='subtitle2'
        >
          {chosenFiltersQty}
        </Typography>
      ) : null}
    </Box>
  )
}

export default FiltersToggle
