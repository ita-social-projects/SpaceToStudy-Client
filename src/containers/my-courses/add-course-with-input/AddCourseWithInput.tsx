import { FC, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'

import FiltersToggle from '~/components/filters-toggle/FiltersToggle'
import AppButton from '~/components/app-button/AppButton'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import CoursesFilterBar from '~/containers/find-course/courses-filter-bar/CoursesFilterBar'
import CoursesFiltersDrawer from '~/containers/my-courses/courses-filters-drawer/CoursesFiltersDrawer'

import { authRoutes } from '~/router/constants/authRoutes'

import { useDrawer } from '~/hooks/use-drawer'
import useBreakpoints from '~/hooks/use-breakpoints'

import { CourseFilters, FiltersActions } from '~/types'
import { styles } from '~/containers/my-courses/add-course-with-input/AddCourseWithInput.styles'

interface AddCoursesWithInputProps {
  additionalParams: Record<string, number | string | undefined>
  chosenFiltersQty?: number
  filterActions: FiltersActions<CourseFilters>
  filters: CourseFilters
  setSort: (property: string) => void
  sort: string
}

const AddCourseWithInput: FC<AddCoursesWithInputProps> = ({
  additionalParams,
  chosenFiltersQty,
  filterActions,
  filters,
  setSort,
  sort
}) => {
  const { t } = useTranslation()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const { isTablet, isMobile } = useBreakpoints()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    filterActions.updateFiltersInQuery({
      ...additionalParams,
      title: e.target.value
    })
  }

  const onClear = () => {
    filterActions.updateFiltersInQuery({
      ...additionalParams,
      title: ''
    })
  }

  const handleToggle = () => (isOpen ? closeDrawer() : openDrawer())

  const desktopView = !isTablet && !isMobile && (
    <Box sx={styles.filtersBox(isTablet)}>
      <FiltersToggle
        chosenFiltersQty={chosenFiltersQty}
        handleToggle={handleToggle}
      />
      <CoursesFilterBar onValueChange={setSort} value={sort} />
      <InputWithIcon
        endAdornment={<SearchIcon sx={styles.searchIcon} />}
        onChange={onChange}
        onClear={onClear}
        placeholder={t('common.search')}
        sx={styles.input}
        value={filters.title}
      />
    </Box>
  )

  const tabletView = isTablet && (
    <Box sx={styles.filtersBox(isTablet)}>
      <FiltersToggle
        chosenFiltersQty={chosenFiltersQty}
        handleToggle={handleToggle}
      />
      <CoursesFilterBar onValueChange={setSort} value={sort} />
    </Box>
  )

  const mobileView = isMobile && <FiltersToggle handleToggle={handleToggle} />

  return (
    <Box sx={styles.container}>
      <AppButton
        component={Link}
        sx={isMobile ? styles.addBtn : undefined}
        to={authRoutes.myCourses.newCourse.path}
      >
        {t('myCoursesPage.buttonLabel')}
        <AddIcon sx={styles.addIcon} />
      </AppButton>

      {desktopView}
      {tabletView}
      {mobileView}

      <CoursesFiltersDrawer
        additionalParams={additionalParams}
        deviceFields={
          isMobile && (
            <CoursesFilterBar
              onValueChange={setSort}
              sx={styles.sortInput}
              value={sort}
            />
          )
        }
        filterActions={filterActions}
        filters={filters}
        isOpen={isOpen}
        onClose={closeDrawer}
      />
    </Box>
  )
}

export default AddCourseWithInput
