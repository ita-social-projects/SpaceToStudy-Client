import { useCallback, FC, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '~/hooks/use-redux'
import { AxiosResponse } from 'axios'

import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'

import { userService } from '~/services/user-service'
import useAxios from '~/hooks/use-axios'
import { defaultResponses } from '~/constants'

import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

import { UserResponse, UserRole } from '~/types'

interface AccountIconProps {
  openMenu: (event: MouseEvent) => void
}

const AccountIcon: FC<AccountIconProps> = ({ openMenu }) => {
  const { t } = useTranslation()
  const { userId, userRole } = useAppSelector((state) => state.appMain)

  const getUserData: () => Promise<AxiosResponse<UserResponse>> = useCallback(
    () => userService.getUserById(userId, userRole as UserRole),
    [userId, userRole]
  )

  const {
    loading,
    response: { photo, firstName, lastName }
  } = useAxios<UserResponse>({
    service: getUserData,
    fetchOnMount: true,
    defaultResponse: defaultResponses.object as UserResponse
  })

  if (loading) {
    return <Avatar sx={styles.accountIcon} />
  }

  let userPhoto = ''
  if (!loading && photo) {
    userPhoto = `${import.meta.env.VITE_APP_IMG_USER_URL}${photo}`
  }

  let userNameInitials = ''
  if (!loading && firstName && lastName) {
    userNameInitials = `${firstName[0]}${lastName[0]}`
  }

  return (
    <Tooltip arrow title={t('iconsTooltip.account')}>
      <Avatar
        alt='User Avatar'
        onClick={openMenu}
        src={userPhoto}
        sx={styles.accountIcon}
      >
        {userNameInitials}
      </Avatar>
    </Tooltip>
  )
}

export default AccountIcon
