import Container from '@mui/material/Container'
import ProfileInfo from '~/containers/tutor-profile/profile-info/ProfileInfo'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import CompleteProfileBlock from '~/components/complete-profile/CompleteProfileBlock'
import { profileItems } from '~/components/profile-item/complete-profile.constants'
import VideoPresentation from '~/containers/tutor-profile/video-presentation/VideoPresentation'
import ComentsBlock from '~/containers/tutor-profile/coments-block/ComentsBlock'
import useAxios from '~/hooks/use-axios'
import { userService } from '~/services/user-service'

const response = {
  'reviewStats': {
    'reviews': [
      {
        'count': 1,
        'rating': 1
      },
      {
        'count': 1,
        'rating': 3
      },
      {
        'count': 3,
        'rating': 5
      },
      {
        'count': 2,
        'rating': 4
      }
    ],
    totalReviews: 10,
    averageRating: 4.5,
  },
  'user': {
    '_id': '6406eec81826f1e46fb6e05c',
    'role': [
      'student',
      'tutor'
    ],
    'firstName': 'ffffff',
    'lastName': 'fffff',
    'email': 'nataha-backend-queen@gmail.com',
    'categories': [],
    'totalReviews': 0,
    'averageRating': 3,
    'isEmailConfirmed': true,
    'isFirstLogin': true,
    'lastLogin': null,
    'lastLoginAs': 'student',
    'bookmarkedOffers': [],
    'createdAt': '2023-03-07T07:59:04.615Z',
    'updatedAt': '2023-03-07T07:59:04.615Z',
    'id': '6406eec81826f1e46fb6e05c'
  }
}

const TutorProfile = () => {

  // const { userId } = useSelector((state) => state.appMain)
  // const getUser = useCallback(()=>userService.getUserById('63f21d357a3b08831a22b257'),[])
  // const {
  //   loading,
  //   fetchData,
  //   response
  // } = useAxios({ service:  getUser })

  const { reviewStats:{ averageRating, reviews, totalReviews }, user } = response

  return (
    <Container style={ { flex: 1 } }>
      <ProfileInfo />
      <CompleteProfileBlock data={ {} } profileItems={ profileItems } />
      <VideoPresentation />
      { response && (
        <ComentsBlock
          averageRating={ averageRating } reviewsCount={ reviews } totalReviews={ totalReviews }
          userId={ user._id } userRole={ user.lastLoginAs }
        />) }
    </Container>
  )
}

export default TutorProfile
