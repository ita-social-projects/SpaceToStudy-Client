import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import FindTutorBlock from '~/containers/student-home-page/find-tutor-block/FindTutorBlock'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import Faq from '~/containers/student-home-page/faq/Faq'
import StudentHowItWorks from '~/containers/student-home-page/student-how-it-works/StudentHowItWorks'

const StudentHome = () => {
  const { t } = useTranslation()

  return (
    <Box
      sx={{ backgroundColor: 'backgroundColor', flex: 1, overflowY: 'auto' }}
    >
      <Container data-testid='studentHome' sx={{ pt: 6 }}>
        <FindTutorBlock />
        <PopularCategories
          description={t('studentHomePage.popularCategories.description')}
          title={t('studentHomePage.popularCategories.title')}
        />
        <StudentHowItWorks />
        <Faq />
      </Container>
    </Box>
  )
}

export default StudentHome
