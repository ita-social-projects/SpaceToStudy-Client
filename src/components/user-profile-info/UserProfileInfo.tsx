import { FC, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import AppRating from '~/components/app-rating/AppRating'
import LanguagesListWithIcon from '~/components/languages-list-with-icon/LanguagesListWithIcon'

import {
  createUrlPath,
  getFormatedDate,
  spliceSx
} from '~/utils/helper-functions'

import {
  LanguagesEnum,
  UserProfileInfoSx,
  UserResponse,
  UserRole
} from '~/types'
import { styles } from '~/components/user-profile-info/UserProfileInfo.styles'
import { authRoutes } from '~/router/constants/authRoutes'

interface UserProfileInfoProps
  extends Pick<UserResponse, 'photo' | 'firstName' | 'lastName' | '_id'> {
  languages: LanguagesEnum | LanguagesEnum[]
  rating?: number
  reviewsCount?: number
  showLanguage?: boolean
  date?: string
  sx?: UserProfileInfoSx
  role: UserRole
}

const UserProfileInfo: FC<UserProfileInfoProps> = ({
  photo,
  rating,
  firstName,
  lastName,
  languages,
  date,
  reviewsCount,
  showLanguage = false,
  sx = {},
  _id,
  role
}) => {
  const { t } = useTranslation()

  const name = `${firstName} ${lastName}`

  const userURL = createUrlPath(authRoutes.userProfile.path, _id, {
    role
  })

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation()
  }

  return (
    <Box sx={spliceSx(styles.root, sx.root)}>
      <Link onClick={handleLinkClick} to={userURL}>
        <Avatar
          src={photo && `${import.meta.env.VITE_APP_IMG_USER_URL}${photo}`}
          sx={spliceSx(styles.avatar, sx.avatar)}
        />
      </Link>
      <Box sx={spliceSx(styles.info, sx.info)}>
        <Link onClick={handleLinkClick} style={styles.link} to={userURL}>
          <Typography sx={spliceSx(styles.name, sx.name)}>{name}</Typography>
        </Link>
        {!isNaN(Number(rating)) && (
          <AppRating
            readOnly
            showNumber
            sx={spliceSx(styles.rating, sx.rating)}
            value={rating}
          />
        )}
        {!isNaN(Number(rating)) && (
          <Typography sx={spliceSx(styles.reviews, sx.reviews)}>
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
        {showLanguage && <LanguagesListWithIcon languages={languages} />}
      </Box>
    </Box>
  )
}

export default UserProfileInfo
