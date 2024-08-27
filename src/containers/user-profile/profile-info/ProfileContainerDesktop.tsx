import { ReactNode } from 'react'

import Box from '@mui/material/Box'
import SchoolIcon from '@mui/icons-material/School'
import DoneIcon from '@mui/icons-material/Done'

import AvatarIcon from '~/components/avatar-icon/AvatarIcon'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppChipList from '~/components/app-chips-list/AppChipList'
import ProfileDoneItemsList from '~/components/icon-with-text-list/ProfileDoneItemsList'

import { styles } from '~/containers/user-profile/profile-info/ProfileInfo.styles'
import { UserResponse } from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

interface ProfileContainerDesktopProps {
  actionIcon: ReactNode
  accInfo: ReactNode
  buttonGroup: ReactNode
  defaultQuantity: number
  doneItems: { title: string; description: string }[]
  userData: UserResponse
  chipItems: string[]
}

const ProfileContainerDesktop = ({
  userData,
  actionIcon,
  accInfo,
  buttonGroup,
  defaultQuantity,
  doneItems,
  chipItems
}: ProfileContainerDesktopProps) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.avatarContainer}>
        <AvatarIcon
          firstName={userData.firstName}
          lastName={userData.lastName}
          photo={
            userData.photo &&
            createUrlPath(import.meta.env.VITE_APP_IMG_USER_URL, userData.photo)
          }
          sx={styles.img}
        />
      </Box>
      {actionIcon}

      <Box sx={styles.infoWrapper}>
        <TitleWithDescription
          description={userData.professionalSummary}
          style={styles.titleWithDescription}
          title={`${userData.firstName} ${userData.lastName}`}
        />

        <AppChipList
          defaultQuantity={2}
          icon={<SchoolIcon fontSize='small' sx={styles.schoolIcon} />}
          items={chipItems}
          wrapperStyle={styles.chipsWrapper}
        />

        <Box sx={styles.accInfoWrapper}>{accInfo}</Box>

        <ProfileDoneItemsList
          defaultQuantity={defaultQuantity}
          icon={<DoneIcon sx={styles.doneIcon} />}
          items={doneItems}
        />

        {buttonGroup}
      </Box>
    </Box>
  )
}

export default ProfileContainerDesktop
