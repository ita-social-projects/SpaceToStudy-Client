import { ReactElement } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import GppGoodIcon from '@mui/icons-material/GppGood'
import Box from '@mui/material/Box'

import { TutorProfileTabsEnum } from '~/types'

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
    content: (
      <Box>
        <h4>Notifications</h4>
      </Box>
    )
  },
  [TutorProfileTabsEnum.PasswordAndSecurity]: {
    icon: <GppGoodIcon />,
    title: 'editTutor.main.passwordSecurity',
    content: (
      <Box>
        <h4>Password & Security</h4>
      </Box>
    )
  }
}
