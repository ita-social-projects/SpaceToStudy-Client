import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppRating from '~/components/app-rating/AppRating'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'

import { ReviewResponse, UserRoleEnum } from '~/types'
import { styles } from '~/components/comment/Comment.styles'
import { Link } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'

interface CommentProps {
  review: ReviewResponse
}

const Comment: FC<CommentProps> = ({ review }) => {
  const {
    comment,
    author,
    rating,
    createdAt,
    offer,
    proficiencyLevel,
    targetUserRole
  } = review
  const { firstName, lastName, photo, _id } = author
  const { category, subject } = offer

  const authorRole =
    targetUserRole === UserRoleEnum.Tutor
      ? UserRoleEnum.Student
      : UserRoleEnum.Tutor

  const cooperationDetailsText = `${category.name} - ${subject.name} - ${proficiencyLevel}`

  return (
    <Box sx={styles.root}>
      <UserProfileInfo
        _id={_id}
        date={createdAt}
        firstName={firstName}
        lastName={`${lastName[0]}.`}
        photo={photo}
        role={authorRole}
        sx={styles.userInfo}
      />
      <Box sx={styles.description}>
        <Link
          style={{ textDecoration: 'none' }}
          to={`${authRoutes.offerDetails.path}/${offer._id}`}
        >
          <Typography sx={styles.coopDetails}>
            {cooperationDetailsText}
          </Typography>
        </Link>
        <AppRating readOnly showNumber sx={styles.rating} value={rating} />
        <Typography sx={styles.comment}>{comment}</Typography>
      </Box>
    </Box>
  )
}

export default Comment
