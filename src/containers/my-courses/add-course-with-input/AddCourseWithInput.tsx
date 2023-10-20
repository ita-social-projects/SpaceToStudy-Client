import { FC, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'

import AppButton from '~/components/app-button/AppButton'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'

import { authRoutes } from '~/router/constants/authRoutes'
import CoursesFilterBar from '~/containers/find-course/courses-filter-bar/CoursesFilterBar'
import { styles } from '~/containers/my-courses/add-course-with-input/AddCourseWithInput.styles'

interface AddCourseWithInputProps {
  button?: ReactElement
}

const AddCourseWithInput: FC<AddCourseWithInputProps> = () => {
  const { t } = useTranslation()

  const onClear = () => {
    console.log('Hello')
  }

  return (
    <Box sx={styles.container}>
      <AppButton component={Link} to={authRoutes.myCourses.newCourse.path}>
        {t('myCoursesPage.buttonLabel')}
        <AddIcon sx={styles.addIcon} />
      </AppButton>
      <Box sx={styles.container}>
        <CoursesFilterBar />
        <InputWithIcon
          endAdornment={<SearchIcon sx={styles.searchIcon} />}
          onClear={onClear}
          placeholder={t('common.search')}
          sx={styles.input}
        />
      </Box>
    </Box>
  )
}

export default AddCourseWithInput
