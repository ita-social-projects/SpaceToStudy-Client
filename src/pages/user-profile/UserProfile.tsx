import { useCallback, useEffect } from 'react'
import { useAppSelector } from '~/hooks/use-redux'
import {
  useParams,
  useLocation,
  useSearchParams,
  useMatch
} from 'react-router-dom'

import CompleteProfileBlock from '~/components/complete-profile/CompleteProfileBlock'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Loader from '~/components/loader/Loader'
import {
  profileItemsTutor,
  profileItemsStudent
} from '~/components/profile-item/complete-profile.constants'

import ProfileInfo from '~/containers/user-profile/profile-info/ProfileInfo'
import AboutTutorBlock from '~/containers/user-profile/about-user-block/AboutTutorBlock'
import AboutStudentBlock from '~/containers/user-profile/about-user-block/AboutStudentBlock'
import VideoPresentation from '~/containers/user-profile/video-presentation/VideoPresentation'
import CommentsWithRatingBlock from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock'

import { DataByRole, UserRoleEnum } from '~/types'

import { userService } from '~/services/user-service'
import videoImgProfile from '~/assets/img/user-profile-page/presentationVideoImg.png'

import { responseMock } from '~/pages/user-profile/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { scrollToHash } from '~/utils/hash-scroll'
import useQuery from '~/hooks/use-query'

const UserProfile: React.FC = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const { userId, userRole } = useAppSelector((state) => state.appMain)
  const paramsRole = searchParams.get('role') as UserRoleEnum
  const { user } = responseMock
  const { reviews } = user.reviewStats || {}

  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      scrollToHash(`${pathname}${hash}`)
    }
  }, [pathname, hash])

  const preferredRole = paramsRole || userRole
  const preferredId = id || userId
  const isMyProfile = useMatch(authRoutes.myProfile.path)

  const getUserData = useCallback(
    () => userService.getUserByIdWithBaseService(preferredId, preferredRole),
    [preferredId, preferredRole]
  )

  const { isLoading: loading, data: response } = useQuery({
    queryFn: getUserData,
    queryKey: ['user', preferredId, preferredRole],
    options: {
      staleTime: Infinity
    }
  })

  const isTutor = preferredRole === UserRoleEnum.Tutor

  const shouldShowPresentation =
    (isTutor && isMyProfile) ||
    (!isTutor && response?.videoLink?.student) ||
    (!isMyProfile && response?.videoLink?.tutor)
  if (loading || !response) {
    return <Loader size={70} />
  }
  return (
    <PageWrapper>
      {userRole && <ProfileInfo myRole={userRole} userData={response} />}
      {isMyProfile && (
        <CompleteProfileBlock
          data={response}
          openAccordion={!!hash}
          profileItems={
            preferredRole === UserRoleEnum.Student
              ? profileItemsStudent
              : profileItemsTutor
          }
        />
      )}
      {response?.professionalBlock && (
        <AboutTutorBlock data={response?.professionalBlock} />
      )}
      {response?.aboutStudent && (
        <AboutStudentBlock data={response?.aboutStudent} />
      )}
      {shouldShowPresentation && (
        <VideoPresentation
          video={
            response?.videoLink?.[preferredRole as keyof DataByRole<string>]
          }
          videoMock={videoImgProfile}
          videoPreview={
            !response?.videoLink?.[preferredRole as keyof DataByRole<string>]
          }
        />
      )}
      <CommentsWithRatingBlock
        averageRating={user.reviewStats.averageRating}
        reviewsCount={reviews}
        totalReviews={user.reviewStats.totalReviews}
        userRole={preferredRole}
      />
      )
    </PageWrapper>
  )
}

export default UserProfile
