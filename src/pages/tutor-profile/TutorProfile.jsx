import { useCallback } from 'react'
import { useAppSelector } from '~/hooks/use-redux'
import { useParams, useSearchParams } from 'react-router-dom'

import ProfileInfo from '~/containers/tutor-profile/profile-info/ProfileInfo'
import CompleteProfileBlock from '~/components/complete-profile/CompleteProfileBlock'
import VideoPresentation from '~/containers/tutor-profile/video-presentation/VideoPresentation'
import CommentsWithRatingBlock from '~/containers/tutor-profile/comments-with-rating-block/CommentsWithRaitngBlock'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Loader from '~/components/loader/Loader'
import { userService } from '~/services/user-service'
import useAxios from '~/hooks/use-axios'

import { profileItems } from '~/components/profile-item/complete-profile.constants'
import { defaultResponses } from '~/constants'
import { responseMock } from '~/pages/tutor-profile/constants'
import AboutTutorBlock from '~/containers/tutor-profile/about-tutor-block/AboutTutorBlock'

import { UserRoleEnum } from '~/types'

const TutorProfile = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const paramsRole = searchParams.get('role')
  const { user } = responseMock
  const { reviews } = user.reviewStats || {}

  const { userId, userRole } = useAppSelector((state) => state.appMain)

  const preferredRole = paramsRole || userRole
  const preferredId = id || userId

  const getUserData = useCallback(
    () => userService.getUserById(preferredId, preferredRole),
    [preferredId, preferredRole]
  )

  const { loading, response } = useAxios({
    service: getUserData,
    fetchOnMount: true,
    defaultResponse: defaultResponses.array
  })

  if (loading) {
    return <Loader pageLoad size={70} />
  }

  const isTutor = preferredRole === UserRoleEnum.Tutor
  const shouldShowPresentation =
    isTutor || (!isTutor && response.videoLink?.student)

  return (
    <PageWrapper>
      <ProfileInfo myRole={userRole} userData={response} />
      <CompleteProfileBlock data={response} profileItems={profileItems} />
      <AboutTutorBlock />
      {shouldShowPresentation && <VideoPresentation />}
      <CommentsWithRatingBlock
        averageRating={response?.averageRating?.tutor}
        reviewsCount={reviews}
        totalReviews={response?.totalReviews?.tutor}
      />
    </PageWrapper>
  )
}

export default TutorProfile
