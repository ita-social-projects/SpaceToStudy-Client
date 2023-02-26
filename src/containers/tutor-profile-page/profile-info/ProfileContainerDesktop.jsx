import Box from '@mui/material/Box'
import SchoolIcon from '@mui/icons-material/School'
import DoneIcon from '@mui/icons-material/Done'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppChipList from '~/components/app-chips-list/AppChipList'
import ProfileDoneItemsList from '~/components/icon-with-text-list/ProfileDoneItemsList'
import useBreakpoints from '~/hooks/use-breakpoints'

import img from '~/assets/img/tutor-profile-page/avatar.png'
import { styles } from '~/containers/tutor-profile-page/profile-info/ProfileInfo.styles'

const ProfileContainerDesktop = ({ actionIcon, accInfo, buttonGroup, defaultQuantity, subjectChips, doneItems }) => {
  const { isDesktop } = useBreakpoints()

  return (
    <Box sx={ styles.container }>
      <Box>
        <Box component='img' src={ img } sx={ styles.img } />
      </Box>

      { actionIcon }

      <Box sx={ styles.infoWrapper }>
        <TitleWithDescription
          description={ 'Senior lecturer at the Department of German Philology and Translation' }
          descriptionStyles={ styles.status }
          style={ { wrapper: { textAlign: 'left' } } }
          title={ 'Esther Howard' }
          titleStyles={ styles.name }
        />

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
          icon={ <DoneIcon color='success' fontSize={ isDesktop ? 'medium' : 'small' } /> }
          items={ doneItems }
        />

        { buttonGroup }
      </Box>
    </Box>
  )
}

export default ProfileContainerDesktop
