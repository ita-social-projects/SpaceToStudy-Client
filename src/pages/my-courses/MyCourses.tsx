import { useTranslation } from 'react-i18next'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'

import { styles } from '~/pages/my-courses/MyCourses.styles'
import AddCourseWithInput from '~/containers/my-courses/add-course-with-input/AddCourseWithInput'

const MyCourses = () => {
  const { t } = useTranslation()

  return (
    <PageWrapper>
      <Typography sx={styles.title}>{t('myCoursesPage.title')}</Typography>
    </PageWrapper>
  )
}

export default MyCourses
