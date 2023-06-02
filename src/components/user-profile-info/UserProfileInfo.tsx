import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import AppRating from '~/components/app-rating/AppRating'
import { getFormatedDate, spliceSx } from '~/utils/helper-functions'

import { UserProfileInfoSx, UserResponse } from '~/types'
import { styles } from '~/components/user-profile-info/UserProfileInfo.styles'

interface UserProfileInfoProps
  extends Pick<UserResponse, 'photo' | 'firstName' | 'lastName'> {
  rating?: number
  reviewsCount?: number
  date?: string
  sx?: UserProfileInfoSx
}

const UserProfileInfo: FC<UserProfileInfoProps> = ({
  photo,
  rating,
  firstName,
  lastName,
  date,
  reviewsCount,
  sx = {}
}) => {
  const { t } = useTranslation()

  const name = `${firstName} ${lastName}`

  return (
    <Box sx={spliceSx(styles.root, sx.root)}>
      <Avatar
        src={photo && `${import.meta.env.VITE_APP_IMG_USER_URL}${photo}`}
        sx={spliceSx(styles.avatar, sx.avatar)}
      />
      <Box sx={spliceSx(styles.info, sx.info)}>
        <Typography sx={spliceSx(styles.name, sx.name)}>{name}</Typography>
        {Number.isInteger(rating) && (
          <AppRating
            readOnly
            showNumber
            sx={spliceSx(styles.rating, sx.rating)}
            value={rating}
          />
        )}
        {Number.isInteger(rating) && (
          <Typography
            sx={spliceSx(styles.reviews, sx.reviews)}
            variant={'caption'}
          >
            {t('tutorProfilePage.reviews.reviewsCount', {
              count: reviewsCount
            })}
          </Typography>
        )}
        {date && (
          <Typography sx={spliceSx(styles.date, sx.date)}>
            {getFormatedDate(date)}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default UserProfileInfo
