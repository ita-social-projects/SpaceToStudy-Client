import { FC, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppRating from '~/components/app-rating/AppRating'
import LanguagesListWithIcon from '~/components/languages-list-with-icon/LanguagesListWithIcon'

import {
  createUrlPath,
  getFormattedDate,
  spliceSx
} from '~/utils/helper-functions'

import { styles } from '~/components/user-profile-info/UserProfileInfo.styles'
import { authRoutes } from '~/router/constants/authRoutes'
import {
  ComponentEnum,
  LanguagesEnum,
  OverlapEnum,
  PositionEnum,
  UserProfileInfoSx,
  UserResponse,
  UserRole
} from '~/types'

interface UserProfileInfoProps
  extends Pick<UserResponse, 'photo' | 'firstName' | 'lastName' | '_id'> {
  languages?: LanguagesEnum | LanguagesEnum[]
  rating?: number
  reviewsCount?: number
  date?: string
  sx?: UserProfileInfoSx
  isOnline?: boolean
  role: UserRole
  renderAdditionalInfo?: boolean
}

const UserProfileInfo: FC<UserProfileInfoProps> = ({
  photo,
  rating,
  firstName,
  lastName,
  languages,
  date,
  reviewsCount,
  sx = {},
  _id,
  role,
  renderAdditionalInfo = true,
  isOnline = false
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
      {renderAdditionalInfo && (
        <Link onClick={handleLinkClick} to={userURL}>
          {isOnline ? (
            <Badge
              anchorOrigin={{
                vertical: PositionEnum.Bottom,
                horizontal: PositionEnum.Right
              }}
              badgeContent={
                <Typography component={ComponentEnum.Span} sx={styles.active} />
              }
              overlap={OverlapEnum.Circular}
            >
              <Avatar
                src={
                  photo && `${import.meta.env.VITE_APP_IMG_USER_URL}${photo}`
                }
                sx={spliceSx(styles.avatar, sx.avatar)}
              />
            </Badge>
          ) : (
            <Avatar
              src={photo && `${import.meta.env.VITE_APP_IMG_USER_URL}${photo}`}
              sx={spliceSx(styles.avatar, sx.avatar)}
            />
          )}
        </Link>
      )}
      <Box
        sx={spliceSx(
          styles.info,
          renderAdditionalInfo ? sx.interlocutorInfo : sx.myInfo
        )}
      >
        <Link onClick={handleLinkClick} style={styles.link} to={userURL}>
          <Typography sx={spliceSx(styles.name, sx.name)}>
            {renderAdditionalInfo ? name : t('chatPage.message.you')}
          </Typography>
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
            {getFormattedDate({ date })}
          </Typography>
        )}
        {languages && <LanguagesListWithIcon languages={languages} />}
      </Box>
    </Box>
  )
}

export default UserProfileInfo
