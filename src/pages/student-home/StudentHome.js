import { Box, Container } from '@mui/material'
import FindMentorBlock from '~/containers/student-home-page/find-mentor-block/FindMentorBlock'
import Footer from '~/containers/footer/Footer'
import Faq from '~/containers/student-home-page/faq/Faq'

const StudentHome = () => {
  return (
    <Box sx={ { backgroundColor: 'backgroundColor' } }>
      <Container data-testid="studentHome" sx={ { pt: 6 } }>
        <FindMentorBlock />
        <Faq />
      </Container>
      <Footer />
    </Box>
  )
}

export default StudentHome
