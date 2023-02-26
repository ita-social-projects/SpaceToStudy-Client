import Container from '@mui/material/Container'
import ProfileInfo from '~/containers/tutor-profile/profile-info/ProfileInfo'
import CompleteProfileBlock from '~/components/complete-profile/CompleteProfileBlock'
import { profileItems } from '~/components/profile-item/complete-profile.constants'
import VideoPresentation from '~/containers/tutor-profile-page/video-presentation/VideoPresentation'

const TutorProfile = () => {
  return (
    <Container style={ { flex: 1 } }>
      <ProfileInfo />
      <CompleteProfileBlock data={ {} } profileItems={ profileItems } />
      <VideoPresentation />
    </Container>
  )
}

export default TutorProfile
