import { ReactElement } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import GppGoodIcon from '@mui/icons-material/GppGood'

import { TutorProfileTabsEnum, UserResponse } from '~/types'
import NotificationContainer from '~/containers/edit-profile/notification-tab/NotificationContainer'
import SecurityBlock from '~/containers/tutor-profile/security-block/SecurityBlock'
import ProfileTab from '~/containers/edit-profile/profile-tab/ProfileTab'

export type TutorProfileProps = {
  [key in TutorProfileTabsEnum]: {
    title: string
    content: (response: UserResponse) => ReactElement
    icon?: ReactElement
  }
}

export const tabsData: TutorProfileProps = {
  [TutorProfileTabsEnum.Profile]: {
    icon: <AccountCircleIcon />,
    title: 'editTutor.main.profile',
    content: (response) => <ProfileTab user={response} />
  },
  [TutorProfileTabsEnum.Notifications]: {
    icon: <NotificationsIcon />,
    title: 'editTutor.main.notifications',
    content: (response) => <NotificationContainer {...response} />
  },
  [TutorProfileTabsEnum.PasswordAndSecurity]: {
    icon: <GppGoodIcon />,
    title: 'editTutor.main.passwordSecurity',
    content: (response) => <SecurityBlock {...response} />
  }
}
