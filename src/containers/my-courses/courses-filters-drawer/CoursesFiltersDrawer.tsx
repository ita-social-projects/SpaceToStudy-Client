import React, { FC } from 'react'

import { useTranslation } from 'react-i18next'
import FilterListIcon from '@mui/icons-material/FilterList'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'

import AppDrawer from '~/components/app-drawer/AppDrawer'
import AppSelect from '~/components/app-select/AppSelect'
import CheckboxList from '~/components/checkbox-list/CheckboxList'

import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/containers/my-courses/courses-filters-drawer/CoursesFiltersDrawer.styles'
import {
  ButtonVariantEnum,
  CourseFilters,
  ProficiencyLevelEnum,
  TypographyVariantEnum
} from '~/types'

interface CoursesFiltersDrawerProps {
  filters: CourseFilters
  handleFilterChange: (
    key: keyof CourseFilters,
    value: string | ProficiencyLevelEnum[]
  ) => void
  onClose: () => void
  open: boolean
}
const fields = [
  { value: 'music', title: 'Music' },
  { value: 'lang', title: 'Languages' },
  { value: 'development', title: 'Development' }
]

const CoursesFiltersDrawer: FC<CoursesFiltersDrawerProps> = ({
  filters,
  handleFilterChange,
  onClose,
  open
}) => {
  const levelOptions = Object.values(ProficiencyLevelEnum)
  const { t } = useTranslation()
  const clearFilters = () => {
    handleFilterChange('category', '')
    handleFilterChange('subject', '')
    handleFilterChange('proficiencyLevel', [])
  }

  return (
    <AppDrawer
      PaperProps={{ sx: styles.paper }}
      anchor='left'
      onClose={onClose}
      open={open}
    >
      <Box sx={styles.titleWithIcon}>
        <FilterListIcon sx={styles.icon} />
        <Typography sx={styles.title} variant={TypographyVariantEnum.H6}>
          {t('myCoursesPage.coursesFilter.coursesFilterLabel')}
        </Typography>
      </Box>

      <Box sx={styles.categorySelect}>
        <Typography sx={styles.titleMargin}>
          {t('myCoursesPage.coursesFilter.chooseThe')}
          <Typography sx={styles.boldText}>
            {t('myCoursesPage.coursesFilter.category')}:
          </Typography>
        </Typography>
        <AppSelect
          fields={fields}
          fullWidth
          label='Category'
          setValue={(value) => handleFilterChange('category', value)}
          size='small'
          value={filters.category}
        />
      </Box>

      <Box sx={styles.subjectSelect}>
        <Typography
          sx={
            !filters.category
              ? spliceSx(styles.disabledTitle, styles.titleMargin)
              : styles.titleMargin
          }
        >
          {t('myCoursesPage.coursesFilter.chooseThe')}
          <Typography
            sx={!filters.category ? styles.inlineBlock : styles.boldText}
          >
            {t('myCoursesPage.coursesFilter.subject')}:
          </Typography>
        </Typography>
        <AppSelect
          disabled={!filters.category}
          fields={fields}
          fullWidth
          label='Subject'
          setValue={(value) => handleFilterChange('subject', value)}
          size='small'
          value={filters.subject}
        />
      </Box>

      <Box sx={styles.checkboxContainer}>
        <Typography sx={styles.checkboxTitleMargin}>
          {t('myCoursesPage.coursesFilter.choose')}
          <Typography sx={styles.boldText}>
            {t('myCoursesPage.coursesFilter.levels')}:
          </Typography>
        </Typography>
        <CheckboxList
          items={levelOptions}
          onChange={(value) => handleFilterChange('proficiencyLevel', value)}
          value={filters.proficiencyLevel}
        />
      </Box>

      <Button
        onClick={clearFilters}
        size='extraLarge'
        sx={styles.clearButtonMb}
        variant={ButtonVariantEnum.Tonal}
      >
        {t('myCoursesPage.coursesFilter.clearFilters')}
      </Button>
      <Button size='extraLarge' variant={ButtonVariantEnum.Contained}>
        {t('myCoursesPage.coursesFilter.applyFilters')}
      </Button>
    </AppDrawer>
  )
}

export default CoursesFiltersDrawer
