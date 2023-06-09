import Box from '@mui/material/Box'
import SchoolIcon from '@mui/icons-material/School'
import DoneIcon from '@mui/icons-material/Done'
import Avatar from '@mui/material/Avatar'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppChipList from '~/components/app-chips-list/AppChipList'
import ProfileDoneItemsList from '~/components/icon-with-text-list/ProfileDoneItemsList'

import { styles } from '~/containers/tutor-profile/profile-info/ProfileInfo.styles'

const ProfileContainerMobile = ({
  actionIcon,
  accInfo,
  buttonGroup,
  defaultQuantity,
  doneItems,
  userData,
  chipItems
}) => {
  const subjectData = userData.mainSubjects.tutor.map((item) => item.name)

  const profilePhoto = _.isEmpty(userData.photo) ? (
    <Box sx={styles.avatarContainerStyles}>
      <Avatar
        sx={styles.avatarStyles}
      >{`${userData.firstName[0]}${userData.lastName[0]}`}</Avatar>
    </Box>
  ) : (
    <Box sx={styles.wrapperForPhoto}>
      <Box component='img' src={userData.photo} sx={styles.img} />
    </Box>
  )

  return (
    <Box sx={styles.container}>
      <Box sx={styles.wrapperForPhoto}>
        <Box sx={styles.avatarContainerMobile}>
          <Avatar
            src={
              userData.photo &&
              `${import.meta.env.VITE_APP_IMG_USER_URL}${userData.photo}`
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
