import { useCallback, useMemo, FC } from 'react'
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
  openMenu: () => void
}

const AccountIcon: FC<AccountIconProps> = ({ openMenu }) => {
  const { t } = useTranslation()

  const { userId, userRole } = useAppSelector((state) => state.appMain)

  const getUserData: () => Promise<AxiosResponse<UserResponse>> = useCallback(
    () => userService.getUserById(userId, userRole as UserRole),
    [userId, userRole]
  )

  const { response } = useAxios<UserResponse>({
    service: getUserData,
    fetchOnMount: true,
    defaultResponse: defaultResponses.object as UserResponse
  })

  const userNameForAvatar = useMemo(() => {
    if (response.firstName && response.lastName) {
      return response.firstName.charAt(0) + '' + response.lastName.charAt(0)
    }
    return ''
  }, [response.firstName, response.lastName])

  return (
    <Tooltip title={t('iconsTooltip.account')}>
      <Avatar
        alt='User'
        onClick={openMenu}
        src={
          response.photo &&
          `${import.meta.env.VITE_APP_IMG_USER_URL}${response.photo}`
        }
        sx={styles.studentIcons}
      >
        {userNameForAvatar}
      </Avatar>
    </Tooltip>
  )
}

export default AccountIcon
