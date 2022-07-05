import { Container } from '@mui/material'
import FindMentorBlock from '~/containers/student-home/find-mentor-block/FindMentorBlock'

const StudentHome = () => {
  return (
    <Container data-testid="studentHome" sx={ { pt: 6 } }>
      <FindMentorBlock />
    </Container>
  )
}

export default StudentHome
