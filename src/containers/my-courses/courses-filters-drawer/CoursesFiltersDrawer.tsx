import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import FilterListIcon from '@mui/icons-material/FilterList'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import AppDrawer from '~/components/app-drawer/AppDrawer'
import AppSelect from '~/components/app-select/AppSelect'
import CheckboxList from '~/components/checkbox-list/CheckboxList'

import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/containers/my-courses/courses-filters-drawer/CoursesFiltersDrawer.styles'
import {
  ButtonVariantEnum,
  CourseFilters,
  PositionEnum,
  ProficiencyLevelEnum,
  SizeEnum
} from '~/types'

interface CoursesFiltersDrawerProps {
  filters: CourseFilters
  handleFilterChange: (
    key: keyof CourseFilters,
    value: string | ProficiencyLevelEnum[]
  ) => void
  onClose: () => void
  isOpen: boolean
  handleReset: () => void
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
  isOpen,
  handleReset
}) => {
  const levelOptions = Object.values(ProficiencyLevelEnum)
  const { t } = useTranslation()

  return (
    <AppDrawer
      PaperProps={{ sx: styles.paper }}
      anchor={PositionEnum.Left}
      onClose={onClose}
      open={isOpen}
    >
      <Box sx={styles.titleWithIcon}>
        <FilterListIcon sx={styles.icon} />
        <Typography sx={styles.title}>
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
          label={t('myCoursesPage.coursesFilter.categoryLabel')}
          setValue={(value) => handleFilterChange('category', value)}
          size={SizeEnum.Small}
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
          <Typography sx={styles.inlineBlock(!!filters.category)}>
            {t('myCoursesPage.coursesFilter.subject')}:
          </Typography>
        </Typography>
        <AppSelect
          disabled={!filters.category}
          fields={fields}
          fullWidth
          label={t('myCoursesPage.coursesFilter.subjectLabel')}
          setValue={(value) => handleFilterChange('subject', value)}
          size={SizeEnum.Small}
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
        onClick={() => handleReset()}
        size={SizeEnum.ExtraLarge}
        sx={styles.clearButtonMb}
        variant={ButtonVariantEnum.Tonal}
      >
        {t('myCoursesPage.coursesFilter.clearFilters')}
      </Button>
      <Button size={SizeEnum.ExtraLarge} variant={ButtonVariantEnum.Contained}>
        {t('myCoursesPage.coursesFilter.applyFilters')}
      </Button>
    </AppDrawer>
  )
}

export default CoursesFiltersDrawer
