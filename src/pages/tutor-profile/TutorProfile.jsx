import Container from '@mui/material/Container'
import ProfileInfo from '~/containers/tutor-profile/profile-info/ProfileInfo'
import CompleteProfileBlock from '~/components/complete-profile/CompleteProfileBlock'
import { profileItems } from '~/components/profile-item/complete-profile.constants'

const TutorProfile = () => {
  return (
    <Container data-testid='tutorHome' style={ { flex: 1 } }>
      <ProfileInfo />
      <CompleteProfileBlock data={ {} } profileItems={ profileItems } />
    </Container>
  )
}

export default TutorProfile
