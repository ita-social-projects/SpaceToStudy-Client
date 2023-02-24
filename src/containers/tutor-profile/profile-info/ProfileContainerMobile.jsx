import Box from '@mui/material/Box'
import SchoolIcon from '@mui/icons-material/School'
import DoneIcon from '@mui/icons-material/Done'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppChipList from '~/components/app-chips-list/AppChipList'
import ProfileDoneItemsList from '~/components/icon-with-text-list/ProfileDoneItemsList'

import img from '~/assets/img/tutor-profile-page/avatar.png'
import { styles } from '~/containers/tutor-profile/profile-info/ProfileInfo.styles'

const ProfileContainerMobile = ({ actionIcon, accInfo, buttonGroup, defaultQuantity, subjectChips, doneItems }) => {
  return (
    <Box sx={ styles.container }>
      <Box sx={ { display: 'flex', gap: '10px' } }>
        <Box sx={ { flex: 1 } }>
          <Box component='img' src={ img } sx={ styles.img } />
        </Box>

        <TitleWithDescription
          description={ 'Senior lecturer at the Department of German Philology and Translation' }
          descriptionStyles={ styles.status }
          style={ { wrapper: { textAlign: 'left', pr: '20px' } } }
          title={ 'Esther Howard' }
          titleStyles={ styles.name }
        />
      </Box>

      { actionIcon }

      <Box sx={ styles.infoWrapper }>
        <AppChipList
          defaultQuantity={ 2 }
          icon={ <SchoolIcon fontSize='small' sx={ styles.schoolIcon } /> }
          items={ subjectChips }
          wrapperStyle={ styles.chipsWrapper }
        />

        <Box sx={ styles.accInfoWrapper }>
          { accInfo }
        </Box>

        <ProfileDoneItemsList
          defaultQuantity={ defaultQuantity }
          icon={ <DoneIcon color='success' fontSize={ 'small' } /> }
          items={ doneItems }
        />

        { buttonGroup }
      </Box>
    </Box>
  )
}

export default ProfileContainerMobile
