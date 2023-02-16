import Box from '@mui/material/Box'
import MainInfo from '~/containers/tutor-profile/main-info/MainInfo'

const TutorProfile = () => {
  return (
    <Box sx={ { maxWidth: '1158px', margin: '0 auto' } }>
      <MainInfo />
      <Box sx={ { height: '100px' } } />
    </Box>
  )
}

export default TutorProfile
