import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import AppRating from '~/components/app-rating/AppRating'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'

import { ReviewResponse, UserRoleEnum } from '~/types'
import { styles } from '~/components/comment/Comment.styles'
import { Link } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'

import { titleToCamel } from '~/utils/title-to-camel-case'
import { getFullUrl } from '~/utils/get-full-url'

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
  const { t } = useTranslation()

  const authorRole =
    targetUserRole === UserRoleEnum.Tutor
      ? UserRoleEnum.Student
      : UserRoleEnum.Tutor

  const translatedCategory = t(`categories.${titleToCamel(category.name)}`, {
    defaultValue: category.name
  })

  const translatedSubject = t(`subjects.${titleToCamel(subject.name)}`, {
    defaultValue: subject.name
  })

  const translatedProficiencyLevel = t(
    `common.levels.${titleToCamel(proficiencyLevel)}`,
    {
      defaultValue: proficiencyLevel
    }
  )

  const cooperationDetailsText = `${translatedCategory} - ${translatedSubject} - ${translatedProficiencyLevel}`

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
          to={getFullUrl({
            pathname: `/${authRoutes.offerDetails.route}`,
            parameters: { id: offer._id }
          })}
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
