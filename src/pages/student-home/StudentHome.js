import { Box, Container } from '@mui/material'
import FindMentorBlock from '~/containers/student-home-page/find-mentor-block/FindMentorBlock'
import Faq from '~/containers/student-home-page/faq/Faq'
import ScrollToTop from '~/components/scroll-to-top/ScrollToTop'
import Footer from '~/containers/footer/Footer'

const StudentHome = () => {
  return (
    <Box sx={ { backgroundColor: 'backgroundColor' } }>
      <Container data-testid="studentHome" sx={ { pt: 6 } }>
        <FindMentorBlock />
        <Faq />
      </Container>
      <ScrollToTop />
      <Footer />
    </Box>
  )
}

export default StudentHome
