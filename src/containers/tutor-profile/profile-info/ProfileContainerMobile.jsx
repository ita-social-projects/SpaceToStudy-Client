import Box from '@mui/material/Box'
import SchoolIcon from '@mui/icons-material/School'
import DoneIcon from '@mui/icons-material/Done'
import Avatar from '@mui/material/Avatar'

import _ from 'lodash'

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
  userData
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
        {profilePhoto}

        <TitleWithDescription
          description={userData.professionalSummary}
          style={{ ...styles.titleWithDescription, wrapper: { pr: '20px' } }}
          title={`${userData.firstName} ${userData.lastName}`}
        />
      </Box>

      {actionIcon}

      <Box sx={styles.infoWrapper}>
        <AppChipList
          defaultQuantity={2}
          icon={<SchoolIcon fontSize='small' sx={styles.schoolIcon} />}
          items={subjectData}
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
