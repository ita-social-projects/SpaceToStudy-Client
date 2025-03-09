import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { SxProps } from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FilterListIcon from '@mui/icons-material/FilterList'

import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/filters-toggle/FiltersToggle.styles'

interface FiltersToggleProps {
  chosenFiltersQty?: number
  handleToggle?: () => void
  sx?: {
    icon?: SxProps
    title?: SxProps
  }
}

const FiltersToggle: FC<FiltersToggleProps> = ({
  chosenFiltersQty = 0,
  handleToggle,
  sx
}) => {
  const { t } = useTranslation()

  return (
    <Box onClick={handleToggle} sx={styles.container}>
      <Box
        data-testid='toggle-button'
        sx={styles.cursorContainer(Boolean(handleToggle))}
      >
        <FilterListIcon sx={spliceSx(styles.icon, sx?.icon)} />
        <Typography sx={spliceSx(styles.title, sx?.title)}>
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
