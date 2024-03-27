import { ReactElement } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import GppGoodIcon from '@mui/icons-material/GppGood'
import Box from '@mui/material/Box'

import { TutorProfileTabsEnum } from '~/types'
import { NotificationContainer } from '~/containers/edit-tutor-profile/NotificationContainer'
import SecurityBlock from '~/containers/tutor-profile/security-block/SecurityBlock'

export type TutorProfileProps = {
  [key in TutorProfileTabsEnum]: {
    title: string
    content?: ReactElement
    icon?: ReactElement
  }
}

export const tabsData: TutorProfileProps = {
  [TutorProfileTabsEnum.Profile]: {
    icon: <AccountCircleIcon />,
    title: 'editTutor.main.profile',
    content: (
      <Box>
        <h4>Profile</h4>
      </Box>
    )
  },
  [TutorProfileTabsEnum.Notifications]: {
    icon: <NotificationsIcon />,
    title: 'editTutor.main.notifications',
    content: <NotificationContainer />
  },
  [TutorProfileTabsEnum.PasswordAndSecurity]: {
    icon: <GppGoodIcon />,
    title: 'editTutor.main.passwordSecurity',
    content: <SecurityBlock />
  }
}
