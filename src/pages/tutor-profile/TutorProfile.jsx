import Container from '@mui/material/Container'

import ProfileInfo from '~/containers/tutor-profile/profile-info/ProfileInfo'
import CompleteProfileBlock from '~/components/complete-profile/CompleteProfileBlock'
import { profileItems } from '~/components/profile-item/complete-profile.constants'
import VideoPresentation from '~/containers/tutor-profile/video-presentation/VideoPresentation'
import ComentsBlock from '~/containers/tutor-profile/coments-block/ComentsBlock'

import { responseMock } from '~/pages/tutor-profile/constants'


const TutorProfile = () => {
  const { user } = responseMock
  const { averageRating, reviews,totalReviews } = user.reviewStats || {}

  return (
    <Container style={ { flex: 1 } }>
      <ProfileInfo />
      <CompleteProfileBlock data={ {} } profileItems={ profileItems } />
      <VideoPresentation />
      { user.reviewStats && (
        <ComentsBlock
          averageRating={ averageRating } 
          reviewsCount={ reviews } 
          totalReviews={ totalReviews }
          userId={ user._id } 
          userRole={ user.lastLoginAs }
        />) }
    </Container>
  )
}

export default TutorProfile
