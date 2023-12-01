import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'

import { authRoutes } from '~/router/constants/authRoutes'
import FiltersToggle from '~/components/filters-toggle/FiltersToggle'
import AppButton from '~/components/app-button/AppButton'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import CoursesFilterBar from '~/containers/find-course/courses-filter-bar/CoursesFilterBar'
import { styles } from '~/containers/my-courses/add-course-with-input/AddCourseWithInput.styles'
import CoursesFiltersDrawer from '~/containers/my-courses/courses-filters-drawer/CoursesFiltersDrawer'
import useForm from '~/hooks/use-form'
import { useDrawer } from '~/hooks/use-drawer'
import { CourseFilters } from '~/types'

const AddCourseWithInput = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const { t } = useTranslation()

  const {
    data: filters,
    handleNonInputValueChange,
    resetData
  } = useForm<CourseFilters>({
    initialValues: {
      category: '',
      subject: '',
      proficiencyLevel: []
    }
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const onClear = () => setInputValue('')
  const handleToggle = () => (isOpen ? closeDrawer() : openDrawer())
  const handleClose = () => closeDrawer()

  return (
    <Box sx={styles.container}>
      <AppButton component={Link} to={authRoutes.myCourses.newCourse.path}>
        {t('myCoursesPage.buttonLabel')}
        <AddIcon sx={styles.addIcon} />
      </AppButton>
      <Box sx={styles.container}>
        <FiltersToggle handleToggle={handleToggle} />
        <CoursesFilterBar />
        <InputWithIcon
          endAdornment={<SearchIcon sx={styles.searchIcon} />}
          onChange={onChange}
          onClear={onClear}
          placeholder={t('common.search')}
          sx={styles.input}
          value={inputValue}
        />
      </Box>
      <CoursesFiltersDrawer
        filters={filters}
        handleFilterChange={handleNonInputValueChange}
        handleReset={resetData}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </Box>
  )
}

export default AddCourseWithInput
