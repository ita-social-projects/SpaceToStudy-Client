import Container from '@mui/material/Container'

import ProfileInfo from '~/containers/tutor-profile/profile-info/ProfileInfo'
import CompleteProfileBlock from '~/components/complete-profile/CompleteProfileBlock'
import { profileItems } from '~/components/profile-item/complete-profile.constants'
import VideoPresentation from '~/containers/tutor-profile/video-presentation/VideoPresentation'
import CommentsWithRatingBlock from '~/containers/tutor-profile/comments-with-rating-block/CommentsWithRaitngBlock'

import { responseMock } from '~/pages/tutor-profile/constants'

const TutorProfile = () => {
  const { user } = responseMock
  const { averageRating, reviews, totalReviews } = user.reviewStats || {}

  console.log(userData)

  return (
    <Container sx={{ flex: 1, pb: '100px' }}>
      <ProfileInfo />
      <CompleteProfileBlock data={{}} profileItems={profileItems} />
      <VideoPresentation />
      {user.reviewStats && (
        <CommentsWithRatingBlock
          averageRating={averageRating}
          reviewsCount={reviews}
          totalReviews={totalReviews}
        />
      )}
    </Container>
  )
}

export default TutorProfile
