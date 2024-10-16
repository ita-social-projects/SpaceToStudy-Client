import { FC, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppRating from '~/components/app-rating/AppRating'
import LanguagesListWithIcon from '~/components/languages-list-with-icon/LanguagesListWithIcon'
import AvatarIcon from '~/components/avatar-icon/AvatarIcon'
import { useAppSelector } from '~/hooks/use-redux'
import { selectIsUserOnline } from '~/redux/selectors/socket-selectors'

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
  renderAdditionalInfo = true
}) => {
  const { t } = useTranslation()
  const isOnline = useAppSelector(selectIsUserOnline(_id))

  const name = `${firstName} ${lastName}`

  const userURL = createUrlPath(authRoutes.userProfile.path, _id, {
    role
  })

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation()
  }

  const avatar = (
    <AvatarIcon
      firstName={firstName}
      lastName={lastName}
      photo={
        photo && createUrlPath(import.meta.env.VITE_APP_IMG_USER_URL, photo)
      }
      sx={spliceSx(styles.avatar, sx.avatar)}
    />
  )

  return (
    <Box sx={spliceSx(styles.root, sx.root)}>
      {renderAdditionalInfo && (
        <Link onClick={handleLinkClick} style={styles.link} to={userURL}>
          <Badge
            anchorOrigin={{
              vertical: PositionEnum.Bottom,
              horizontal: PositionEnum.Right
            }}
            badgeContent={
              <Typography component={ComponentEnum.Span} sx={styles.active} />
            }
            invisible={!isOnline}
            overlap={OverlapEnum.Circular}
          >
            {avatar}
          </Badge>
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
            {t('userProfilePage.reviews.reviewsCount', {
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
