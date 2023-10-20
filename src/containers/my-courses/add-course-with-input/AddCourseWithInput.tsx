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

const AddCourseWithInput = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const { t } = useTranslation()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onClear = () => setInputValue('')

  return (
    <Box sx={styles.container}>
      <AppButton component={Link} to={authRoutes.myCourses.newCourse.path}>
        {t('myCoursesPage.buttonLabel')}
        <AddIcon sx={styles.addIcon} />
      </AppButton>
      <Box sx={styles.container}>
        <FiltersToggle />
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
    </Box>
  )
}

export default AddCourseWithInput
