import Container from '@mui/material/Container'
import CompleteProfileBlock from '~/components/complete-profile/CompleteProfileBlock'
import { profileItems } from '~/components/profile-item/complete-profile.constants'
import VideoPresentation from '~/containers/tutor-profile-page/video-presentation/VideoPresentation'

const TutorProfile = () => {
  return (
    <Container data-testid='tutorProfile' style={ { flex: 1 } }>
      TutorProfile Page Placeholder
      <CompleteProfileBlock data={ {} } profileItems={ profileItems } />
      <VideoPresentation />
    </Container>
  )
}

export default TutorProfile
