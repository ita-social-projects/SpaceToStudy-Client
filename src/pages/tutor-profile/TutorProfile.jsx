import Container from '@mui/material/Container'

import ProfileInfo from '~/containers/tutor-profile/profile-info/ProfileInfo'
import CompleteProfileBlock from '~/components/complete-profile/CompleteProfileBlock'
import { profileItems } from '~/components/profile-item/complete-profile.constants'
import VideoPresentation from '~/containers/tutor-profile/video-presentation/VideoPresentation'
import CommentsWithRatingBlock from '~/containers/tutor-profile/comments-with-rating-block/CommentsWithRaitngBlock'

import { useAppSelector } from '~/hooks/use-redux'
import useUserInfo from '~/hooks/use-user-info'
import Loader from '~/components/loader/Loader'
import { responseMock } from '~/pages/tutor-profile/constants'
import { styles } from '~/pages/tutor-profile/TutorProfile.styles'

const TutorProfile = () => {
  const { user } = responseMock
  const { reviews } = user.reviewStats || {}

  const { userId, userRole } = useAppSelector((state) => state.appMain)

  const { loading: userDataLoading, response: userData } = useUserInfo({
    id: userId,
    role: userRole
  })

  if (userDataLoading) {
    return <Loader pageLoad size={70} />
  }

  console.log(userData)

  return (
    <Container sx={styles.containerStyles}>
      <ProfileInfo userData={userData} />
      <CompleteProfileBlock data={userData} profileItems={profileItems} />
      <VideoPresentation />
      <CommentsWithRatingBlock
        averageRating={userData.averageRating.tutor}
        reviewsCount={reviews}
        totalReviews={userData.totalReviews.tutor}
      />
    </Container>
  )
}

export default TutorProfile
