import Container from '@mui/material/Container'
import MainInfo from '~/containers/tutor-profile/main-info/MainInfo'
import CompleteProfileBlock from '~/components/complete-profile/CompleteProfileBlock'
import { profileItems } from '~/components/profile-item/complete-profile.constants'

const TutorProfile = () => {
  return (
    <Container data-testid='tutorHome' style={{ flex: 1 }}>
      <MainInfo />
      <CompleteProfileBlock data={{}} profileItems={profileItems} />
    </Container>
  )
}

export default TutorProfile
