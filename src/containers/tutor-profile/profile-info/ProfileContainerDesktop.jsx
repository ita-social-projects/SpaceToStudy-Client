import Box from '@mui/material/Box'
import SchoolIcon from '@mui/icons-material/School'
import DoneIcon from '@mui/icons-material/Done'
import Avatar from '@mui/material/Avatar'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppChipList from '~/components/app-chips-list/AppChipList'
import ProfileDoneItemsList from '~/components/icon-with-text-list/ProfileDoneItemsList'

import { styles } from '~/containers/tutor-profile/profile-info/ProfileInfo.styles'

const ProfileContainerDesktop = ({
  userData,
  actionIcon,
  accInfo,
  buttonGroup,
  defaultQuantity,
  doneItems
}) => {
  const { isDesktop } = useBreakpoints()

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
      <Box sx={{ width: '45%' }}>
        <Avatar
          src={
            userData.photo &&
            `${import.meta.env.VITE_APP_IMG_USER_URL}${userData.photo}`
          }
          sx={styles.img}
        ></Avatar>
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
          items={subjectData}
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
