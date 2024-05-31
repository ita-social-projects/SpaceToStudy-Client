import { ReactElement } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SchoolIcon from '@mui/icons-material/School'
import NotificationsIcon from '@mui/icons-material/Notifications'
import GppGoodIcon from '@mui/icons-material/GppGood'

import { TutorProfileTabsEnum, UserResponse } from '~/types'
import ProfileTab from '~/containers/edit-profile/profile-tab/ProfileTab'
import ProfessionalInfoTab from '~/containers/edit-profile/professional-info-tab/ProfessionalInfoTab'
import NotificationTab from '~/containers/edit-profile/notification-tab/NotificationTab'
import SecurityTab from '~/containers/edit-profile/password-security-tab/PasswordSecurityTab'

export type TutorProfileProps = Record<
  TutorProfileTabsEnum,
  {
    title: string
    content: (response: UserResponse) => ReactElement
    icon?: ReactElement
  }
>

export const tabsData: TutorProfileProps = {
  [TutorProfileTabsEnum.Profile]: {
    icon: <AccountCircleIcon />,
    title: 'editTutor.main.profile',
    content: (response) => <ProfileTab user={response} />
  },
  [TutorProfileTabsEnum.ProfessionalInfo]: {
    icon: <SchoolIcon />,
    title: 'editTutor.main.professionalInfo',
    content: (response) => (
      <ProfessionalInfoTab
        categories={response.mainSubjects.tutor}
        professionalBlock={response.professionalBlock}
        userId={response._id}
      />
    )
  },
  [TutorProfileTabsEnum.Notifications]: {
    icon: <NotificationsIcon />,
    title: 'editTutor.main.notifications',
    content: () => <NotificationTab />
  },
  [TutorProfileTabsEnum.PasswordAndSecurity]: {
    icon: <GppGoodIcon />,
    title: 'editTutor.main.passwordAndSecurity',
    content: () => <SecurityTab />
  }
}
