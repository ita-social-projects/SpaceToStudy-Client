import { useTranslation } from 'react-i18next'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Typography from '@mui/material/Typography'

import { styles } from '~/pages/my-courses/MyCourses.styles'

const MyCourses = () => {
  const { t } = useTranslation()

  return (
    <PageWrapper>
      <Typography sx={styles.title}>{t('myCoursesPage.title')}</Typography>
    </PageWrapper>
  )
}

export default MyCourses
