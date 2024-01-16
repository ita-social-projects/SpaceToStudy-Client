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

  const sortOptions = sortTranslationKeys.map(({ title, value }) => ({
    title: t(title),
    value
  }))

  return (
    <Box sx={styles.container}>
      <AppSelect
        fields={sortOptions}
        selectTitle={t('filters.sortBy.sortByTitle')}
        setValue={onValueChange}
        sx={sx}
        value={value}
      />
    </Box>
  )
}

export default CoursesFilterBar
