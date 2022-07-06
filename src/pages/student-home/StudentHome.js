import { Container } from '@mui/material'
import FindMentorBlock from '~/containers/student-home-page/find-mentor-block/FindMentorBlock'
import Footer from '~/containers/footer/Footer'
import Faq from '~/containers/student-home-page/faq/Faq'

const StudentHome = () => {
  return (
    <Container data-testid="studentHome" sx={ { pt: 6 } }>
      <FindMentorBlock />
      <Faq />
      <Footer />
    </Container>
  )
}

export default StudentHome
