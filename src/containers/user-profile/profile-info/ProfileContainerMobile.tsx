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

interface ProfileContainerMobileProps {
  actionIcon: ReactNode
  accInfo: ReactNode
  buttonGroup: ReactNode
  defaultQuantity: number
  doneItems: { title: string; description: string }[]
  userData: UserResponse
  chipItems: string[]
}

const ProfileContainerMobile = ({
  actionIcon,
  accInfo,
  buttonGroup,
  defaultQuantity,
  doneItems,
  userData,
  chipItems
}: ProfileContainerMobileProps) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.wrapperForPhoto}>
        <Box sx={styles.avatarContainerMobile}>
          <AvatarIcon
            firstName={userData.firstName}
            lastName={userData.lastName}
            photo={
              userData.photo &&
              createUrlPath(
                import.meta.env.VITE_APP_IMG_USER_URL,
                userData.photo
              )
            }
            sx={styles.img}
          />
        </Box>

        <TitleWithDescription
          description={userData.professionalSummary}
          style={styles.titleWithDescription}
          title={`${userData.firstName} ${userData.lastName}`}
        />
      </Box>

      {actionIcon}

      <Box sx={styles.infoWrapper}>
        <AppChipList
          defaultQuantity={2}
          icon={<SchoolIcon fontSize='small' sx={styles.schoolIcon} />}
          items={chipItems}
          wrapperStyle={styles.chipsWrapper}
        />

        <Box sx={styles.accInfoWrapper}>{accInfo}</Box>

        <ProfileDoneItemsList
          defaultQuantity={defaultQuantity}
          icon={<DoneIcon color='success' fontSize={'small'} />}
          items={doneItems}
        />

        {buttonGroup}
      </Box>
    </Box>
  )
}

export default ProfileContainerMobile
