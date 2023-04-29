import { useTranslation } from 'react-i18next'

import Container from '@mui/material/Container'

import FindTutorBlock from '~/containers/student-home-page/find-tutor-block/FindTutorBlock'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import Faq from '~/containers/student-home-page/faq/Faq'
import StudentHowItWorks from '~/containers/student-home-page/student-how-it-works/StudentHowItWorks'

const StudentHome = () => {
  const { t } = useTranslation()

  return (
    <Container data-testid='studentHome' sx={{ flex: 1 }}>
      <FindTutorBlock />
      <PopularCategories
        description={t('studentHomePage.popularCategories.description')}
        title={t('studentHomePage.popularCategories.title')}
      />
      <StudentHowItWorks />
      <Faq />
    </Container>
  )
}

export default StudentHome
