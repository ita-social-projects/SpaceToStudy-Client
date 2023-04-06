import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import FindTutorBlock from '~/containers/student-home-page/find-tutor-block/FindTutorBlock'
import PopularCategories from '~/containers/student-home-page/popular-categories/PopularCategories'
import Faq from '~/containers/student-home-page/faq/Faq'
import StudentHowItWorks from '~/containers/student-home-page/student-how-it-works/StudentHowItWorks'

const StudentHome = () => {
  return (
    <Box
      sx={{ backgroundColor: 'backgroundColor', flex: 1, overflowY: 'auto' }}
    >
      <Container data-testid='studentHome' sx={{ pt: 6 }}>
        <FindTutorBlock />
        <PopularCategories />
        <StudentHowItWorks />
        <Faq />
      </Container>
    </Box>
  )
}

export default StudentHome
