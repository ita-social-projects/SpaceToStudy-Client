import { useMemo, useCallback, FC, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '~/hooks/use-redux'

import Tooltip from '@mui/material/Tooltip'
import UserAvatar from '~/design-system/components/user-avatar/UserAvatar'

import { userService } from '~/services/user-service'
import useQuery from '~/hooks/use-query'
import { defaultResponses } from '~/constants'

import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

import { UpdatedPhoto, UserResponse, UserRole } from '~/types'
import { createUrlPath } from '~/utils/helper-functions'
import { isUpdatedPhoto } from '~/utils/is-updated-photo'

interface AccountIconProps {
  openMenu: (event: MouseEvent) => void
}

const AccountIcon: FC<AccountIconProps> = ({ openMenu }) => {
  const { t } = useTranslation()
  const { userId, userRole } = useAppSelector((state) => state.appMain)

  const getUserData = useCallback(
    () => userService.getUserByIdWithBaseService(userId, userRole as UserRole),
    [userId, userRole]
  )

  const { isLoading, data = defaultResponses.object as UserResponse } =
    useQuery({
      queryKey: ['account-icon', userId, userRole],
      queryFn: getUserData,
      options: {
        staleTime: Infinity
      }
    })

  const { photo, firstName, lastName } = data
  const { photo: statePhoto } = useAppSelector((state) => state.editProfile)

  const avatarSrc = useMemo(() => {
    if (isUpdatedPhoto(statePhoto)) {
      return (statePhoto as UpdatedPhoto).src
    }

    if (typeof statePhoto === 'string') {
      return createUrlPath(
        import.meta.env.VITE_APP_IMG_USER_URL || '',
        statePhoto
      )
    }

    if (photo) {
      return createUrlPath(import.meta.env.VITE_APP_IMG_USER_URL || '', photo)
    }
  }, [photo, statePhoto])

  if (isLoading) {
    return (
      <UserAvatar firstName='' lastName='' src='' sx={styles.accountIcon} />
    )
  }

  return (
    <Tooltip arrow title={t('iconsTooltip.account')}>
      <UserAvatar
        firstName={firstName}
        lastName={lastName}
        onClick={openMenu}
        src={avatarSrc}
        sx={styles.accountIcon}
        variant='photo'
      >
        {!isLoading && firstName && lastName && `${firstName[0]}${lastName[0]}`}
      </UserAvatar>
    </Tooltip>
  )
}

export default AccountIcon
