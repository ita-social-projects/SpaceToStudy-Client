import { FC, ReactNode, useCallback, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import FilterListIcon from '@mui/icons-material/FilterList'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import AppDrawer from '~/components/app-drawer/AppDrawer'
import CheckboxList from '~/components/checkbox-list/CheckboxList'
import FilterInput from '~/components/filter-input/FilterInput'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/containers/my-courses/courses-filters-drawer/CoursesFiltersDrawer.styles'

import { spliceSx } from '~/utils/helper-functions'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { proficiencyLevelLabels } from '~/constants/labels'

import {
  ButtonVariantEnum,
  CategoryNameInterface,
  ComponentEnum,
  CourseFilters,
  FiltersActions,
  PositionEnum,
  ProficiencyLevelEnum,
  SizeEnum,
  SubjectNameInterface
} from '~/types'

interface CoursesFiltersDrawerProps {
  additionalParams: Record<string, number | string | undefined>
  filterActions: FiltersActions<CourseFilters>
  filters: CourseFilters
  onClose: () => void
  isOpen: boolean
  deviceFields?: ReactNode
}

const CoursesFiltersDrawer: FC<CoursesFiltersDrawerProps> = ({
  additionalParams,
  filterActions,
  filters,
  onClose,
  isOpen,
  deviceFields
}) => {
  const { t } = useTranslation()
  const levelOptions = Object.values(ProficiencyLevelEnum)
  const { updateFiltersInQuery, resetFilters } = filterActions
  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(filters.category),
    [filters.category]
  )

  const onCategoryChange = (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    updateFiltersInQuery({
      ...additionalParams,
      subject: '',
      category: value?._id ?? ''
    })
  }

  const onSubjectChange = (
    _: SyntheticEvent,
    value: SubjectNameInterface | null
  ) => {
    updateFiltersInQuery({ ...additionalParams, subject: value?._id ?? '' })
  }

  const updateFilterByKey =
    <K extends keyof CourseFilters>(key: K) =>
    (value: CourseFilters[K]) => {
      updateFiltersInQuery({ ...additionalParams, [key]: value })
    }

  const handleApplyFilters = () => {
    updateFiltersInQuery(additionalParams)
    onClose()
  }
  return (
    <AppDrawer anchor={PositionEnum.Left} onClose={onClose} open={isOpen}>
      <Box sx={styles.titleWithIcon}>
        <FilterListIcon sx={styles.icon} />
        <Typography sx={styles.title}>
          {t('myCoursesPage.coursesFilter.coursesFilterLabel')}
        </Typography>
      </Box>

      <Box sx={styles.addedFiled}>{deviceFields}</Box>

      <Box sx={styles.categorySelect}>
        <Typography sx={styles.titleMargin}>
          {t('myCoursesPage.coursesFilter.chooseThe')}
          <Typography component={ComponentEnum.Span} sx={styles.boldText}>
            {t('myCoursesPage.coursesFilter.category')}:
          </Typography>
        </Typography>
        <AsyncAutocomplete
          labelField='name'
          onChange={onCategoryChange}
          service={categoryService.getCategoriesNames}
          textFieldProps={{
            label: t('myCoursesPage.coursesFilter.categoryLabel')
          }}
          value={filters.category}
          valueField='_id'
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
            component={ComponentEnum.Span}
            sx={styles.inlineBlock(!!filters.category)}
          >
            {t('myCoursesPage.coursesFilter.subject')}:
          </Typography>
        </Typography>
        <AsyncAutocomplete
          disabled={!filters.category}
          labelField='name'
          onChange={onSubjectChange}
          service={getSubjectsNames}
          textFieldProps={{
            label: t('myCoursesPage.coursesFilter.subjectLabel')
          }}
          value={filters.subject}
          valueField='_id'
        />
      </Box>

      <Box sx={styles.checkboxContainer}>
        <Typography sx={styles.checkboxTitleMargin}>
          {t('myCoursesPage.coursesFilter.choose')}
          <Typography component={ComponentEnum.Span} sx={styles.boldText}>
            {t('myCoursesPage.coursesFilter.levels')}:
          </Typography>
        </Typography>
        <CheckboxList
          fillRange
          items={levelOptions}
          labels={proficiencyLevelLabels}
          onChange={updateFilterByKey('proficiencyLevel')}
          value={filters.proficiencyLevel}
        />
      </Box>

      <Typography sx={styles.titleMargin}>
        {t('myCoursesPage.coursesFilter.search')}:
      </Typography>
      <FilterInput
        onChange={updateFilterByKey('title')}
        placeholder={t('common.search')}
        value={filters.title}
      />

      <AppButton
        onClick={resetFilters}
        size={SizeEnum.ExtraLarge}
        sx={styles.clearButtonMb}
        variant={ButtonVariantEnum.Tonal}
      >
        {t('button.clearFilters')}
      </AppButton>
      <AppButton
        onClick={handleApplyFilters}
        size={SizeEnum.ExtraLarge}
        variant={ButtonVariantEnum.Contained}
      >
        {t('button.applyFilters')}
      </AppButton>
    </AppDrawer>
  )
}

export default CoursesFiltersDrawer
