import { ReactElement } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SchoolIcon from '@mui/icons-material/School'
import NotificationsIcon from '@mui/icons-material/Notifications'
import GppGoodIcon from '@mui/icons-material/GppGood'

import { UserProfileTabsEnum, UserResponse } from '~/types'
import ProfileTab from '~/containers/edit-profile/profile-tab/ProfileTab'
import ProfessionalInfoTab from '~/containers/edit-profile/professional-info-tab/ProfessionalInfoTab'
import NotificationTab from '~/containers/edit-profile/notification-tab/NotificationTab'
import SecurityTab from '~/containers/edit-profile/password-security-tab/PasswordSecurityTab'

export type UserProfileProps = Record<
  UserProfileTabsEnum,
  {
    title: string
    content: (response: UserResponse) => ReactElement
    icon?: ReactElement
  }
>

export const tabsData: UserProfileProps = {
  [UserProfileTabsEnum.Profile]: {
    icon: <AccountCircleIcon />,
    title: 'editProfilePage.profile.generalTab.tabTitle',
    content: (response) => <ProfileTab user={response} />
  },
  [UserProfileTabsEnum.ProfessionalInfo]: {
    icon: <SchoolIcon />,
    title: 'editProfilePage.profile.professionalTab.tabTitle',
    content: (response) => (
      <ProfessionalInfoTab
        categories={response.mainSubjects.tutor}
        professionalBlock={response.professionalBlock}
        userId={response._id}
      />
    )
  },
  [UserProfileTabsEnum.Notifications]: {
    icon: <NotificationsIcon />,
    title: 'editProfilePage.profile.notificationsTab.tabTitle',
    content: () => <NotificationTab />
  },
  [UserProfileTabsEnum.PasswordAndSecurity]: {
    icon: <GppGoodIcon />,
    title: 'editProfilePage.profile.passwordSecurityTab.tabTitle',
    content: () => <SecurityTab />
  }
}
