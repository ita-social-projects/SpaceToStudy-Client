import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppRating from '~/components/app-rating/AppRating'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'

import { ReviewInterface } from '~/types'
import { styles } from '~/components/comment/Comment.styles'

interface CommentProps {
  review: ReviewInterface
}

const Comment: FC<CommentProps> = ({ review }) => {
  const { comment, author, rating, createdAt, offer } = review
  const { firstName, lastName, photo, _id } = author
  const { category, subject, proficiencyLevel, authorRole } = offer

  const coopDetails = `${category.name} - ${subject.name} - ${proficiencyLevel[0]}`

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
        <Typography sx={styles.coopDetails}>{coopDetails}</Typography>
        <AppRating readOnly showNumber sx={styles.rating} value={rating} />
        <Typography sx={styles.comment}>{comment}</Typography>
      </Box>
    </Box>
  )
}

export default Comment
