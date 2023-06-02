import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import AppRating from '~/components/app-rating/AppRating'

import { UserResponse } from '~/types'
import { styles } from '~/components/user-profile-info/UserProfileInfo.styles'

interface UserProfileInfoProps
  extends Pick<UserResponse, 'photo' | 'firstName' | 'lastName'> {
  rating?: number
  reviewsCount?: number
}

const UserProfileInfo: FC<UserProfileInfoProps> = ({
  photo,
  rating,
  firstName,
  lastName,
  reviewsCount
}) => {
  const { t } = useTranslation()

  const name = `${firstName} ${lastName}`

  return (
    <Box sx={styles.root}>
      <Avatar src={photo} sx={styles.avatar} />
      <Typography sx={styles.name}>{name}</Typography>
      {Number.isInteger(rating) && (
        <AppRating readOnly showNumber sx={styles.rating} value={rating} />
      )}
      {(reviewsCount || reviewsCount === 0) && (
        <Typography sx={styles.reviews} variant={'caption'}>
          {t('tutorProfilePage.reviews.reviewsCount', {
            count: reviewsCount
          })}
        </Typography>
      )}
    </Box>
  )
}

export default UserProfileInfo
