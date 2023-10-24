import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'

import AppSelect from '~/components/app-select/AppSelect'
import { sortTranslationKeys } from '~/containers/find-course/courses-filter-block/CoursesFilterBlock.constants'
import { styles } from '~/containers/find-course/courses-filter-bar/CoursesFilterBar.styles'

const CoursesFilterBar = () => {
  const { t } = useTranslation()

  const handleSortBy = (value: string) => {
    console.log(value)
  }

  const sortOptions = sortTranslationKeys.map(({ title, value }) => ({
    title: t(title),
    value
  }))

  return (
    <Box sx={styles.container}>
      <AppSelect
        fields={sortOptions}
        selectTitle={t('filters.sortBy.sortByTitle')}
        setValue={handleSortBy}
        value={sortOptions[0].value}
      />
    </Box>
  )
}

export default CoursesFilterBar
