import Container from '@mui/material/Container'

import ProfileInfo from '~/containers/tutor-profile/profile-info/ProfileInfo'
import CompleteProfileBlock from '~/components/complete-profile/CompleteProfileBlock'
import { profileItems } from '~/components/profile-item/complete-profile.constants'
import VideoPresentation from '~/containers/tutor-profile/video-presentation/VideoPresentation'
import CommentsWithRatingBlock from '~/containers/tutor-profile/comments-with-rating-block/CommentsWithRaitngBlock'

import { responseMock } from '~/pages/tutor-profile/constants'
import { parseJwt } from '~/utils/helper-functions'
import useUserInfo from '~/hooks/use-user-info'
import Loader from '~/components/loader/Loader'

const TutorProfile = () => {
  const { user } = responseMock
  const { averageRating, reviews, totalReviews } = user.reviewStats || {}

  const { id, role } = parseJwt(localStorage.getItem('s2s'))

  const { loading, response: userData } = useUserInfo({ id, role })

  if (loading) {
    return <Loader pageLoad size={70} />
  }

  return (
    <Container sx={{ flex: 1, pb: '100px' }}>
      <ProfileInfo userData={userData} />
      <CompleteProfileBlock data={{}} profileItems={profileItems} />
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
