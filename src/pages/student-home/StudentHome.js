import { Box, Container } from '@mui/material'
import FindMentorBlock from '~/containers/student-home-page/find-mentor-block/FindMentorBlock'
import PopularCategories from '~/containers/student-home-page/popular-categories/PopularCategories'
import Faq from '~/containers/student-home-page/faq/Faq'
import StudentHowItWorks from '~/containers/student-home-page/student-how-it-works/StudentHowItWorks'

const StudentHome = () => {
  return (
    <Box sx={ { backgroundColor: 'backgroundColor' } }>
      <Container data-testid="studentHome" sx={ { pt: 6 } }>
        <FindMentorBlock />
        <PopularCategories />
        <StudentHowItWorks />
        <Faq />
      </Container>
    </Box>
  )
}

export default StudentHome
