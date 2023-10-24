import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AddCourseWithInput from '~/containers/my-courses/add-course-with-input/AddCourseWithInput'
import { styles } from '~/pages/my-courses/MyCourses.styles'

const MyCourses = () => {
  const { t } = useTranslation()

  return (
    <PageWrapper>
      <Typography sx={styles.title}>{t('myCoursesPage.title')}</Typography>
      <Box sx={styles.divider}></Box>
      <AddCourseWithInput />
    </PageWrapper>
  )
}

export default MyCourses
