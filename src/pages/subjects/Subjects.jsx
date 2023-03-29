import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import ExploreSubjects from '~/containers/subjects-page/explore-subjects/ExploreSubjects'

const Subjects = () => {
  return (
    <Box sx={{ backgroundColor: 'backgroundColor', flex: 1 }}>
      <Container>
        <ExploreSubjects />
      </Container>
    </Box>
  )
}

export default Subjects
