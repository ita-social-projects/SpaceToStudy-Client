import { FC, ChangeEvent, useState, MutableRefObject } from 'react'
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
import { useDebounce } from '~/hooks/use-debounce'

import { CourseFilters } from '~/types'

interface AddCoursesWithInputProps {
  fetchData: () => Promise<void>
  searchRef: MutableRefObject<string>
}

const AddCourseWithInput: FC<AddCoursesWithInputProps> = ({
  searchRef,
  fetchData
}) => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState<string>('')
  const { openDrawer, closeDrawer, isOpen } = useDrawer()

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

  const debounceOnChange = useDebounce((text: string) => {
    searchRef.current = text
    void fetchData()
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    debounceOnChange(value)
  }

  const onClear = () => {
    setInputValue('')
    searchRef.current = ''
    void fetchData()
  }

  const handleToggle = () => (isOpen ? closeDrawer() : openDrawer())

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
        onClose={closeDrawer}
      />
    </Box>
  )
}

export default AddCourseWithInput
