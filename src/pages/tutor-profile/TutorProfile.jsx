import Container from '@mui/material/Container'

import ProfileInfo from '~/containers/tutor-profile/profile-info/ProfileInfo'
import CompleteProfileBlock from '~/components/complete-profile/CompleteProfileBlock'
import { profileItems } from '~/components/profile-item/complete-profile.constants'
import VideoPresentation from '~/containers/tutor-profile/video-presentation/VideoPresentation'
import CommentsWithRatingBlock from '~/containers/tutor-profile/comments-with-rating-block/CommentsWithRaitngBlock'

import { responseMock } from '~/pages/tutor-profile/constants'
import { useAppSelector } from '~/hooks/use-redux'
import useUserInfo from '~/hooks/use-user-info'
import Loader from '~/components/loader/Loader'

const TutorProfile = () => {
  const { user } = responseMock
  const { averageRating, reviews, totalReviews } = user.reviewStats || {}

  const { userId, userRole } = useAppSelector((state) => state.appMain)

  const { loading: userDataLoading, response: userData } = useUserInfo({
    id: userId,
    role: userRole
  })

  if (userDataLoading) {
    return <Loader pageLoad size={70} />
  }

  return (
    <Container sx={{ flex: 1, pb: '100px' }}>
      <ProfileInfo userData={userData} />
      <CompleteProfileBlock data={userData} profileItems={profileItems} />
      <VideoPresentation />
      <CommentsWithRatingBlock
        averageRating={averageRating}
        reviewsCount={reviews}
        totalReviews={totalReviews}
      />
    </Container>
  )
}

export default TutorProfile
