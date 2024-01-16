import { useTranslation } from 'react-i18next'
import { Box, SxProps } from '@mui/material'

import AppSelect from '~/components/app-select/AppSelect'
import { sortTranslationKeys } from '~/containers/find-course/courses-filter-bar/CorseFilterBar.constants'
import { styles } from '~/containers/find-course/courses-filter-bar/CoursesFilterBar.styles'

interface CoursesFilterBarProps {
  value: string
  onValueChange: (value: string) => void
  sx?: SxProps
}

const CoursesFilterBar = ({
  value,
  onValueChange,
  sx
}: CoursesFilterBarProps) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.container}>
      <AppSelect
        fields={sortTranslationKeys}
        selectTitle={t('filters.sortBy.sortByTitle')}
        setValue={onValueChange}
        sx={sx}
        value={value}
      />
    </Box>
  )
}

export default CoursesFilterBar
