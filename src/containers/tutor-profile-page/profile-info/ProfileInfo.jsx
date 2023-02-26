import { useContext } from 'react'
import { useMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'

import ProfileContainerDesktop from '~/containers/tutor-profile-page/profile-info/ProfileContainerDesktop'
import ProfileContainerMobile from '~/containers/tutor-profile-page/profile-info/ProfileContainerMobile'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import useBreakpoints from '~/hooks/use-breakpoints'

import { SnackBarContext } from '~/context/snackbar-context'
import {
  accountInfoMock,
  subjectChipsMock,
  doneItemsMock
} from '~/containers/tutor-profile-page/profile-info/ProfileInfo.constants'
import { styles } from '~/containers/tutor-profile-page/profile-info/ProfileInfo.styles'
import { snackbarVariants, myProfilePath } from '~/constants'

const ProfileInfo = () => {
  const { t } = useTranslation()
  const { isDesktop, isMobile } = useBreakpoints()
  const { setAlert } = useContext(SnackBarContext)
  const isMyProfile = useMatch(myProfilePath)

  const copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setAlert({
      severity: snackbarVariants.success,
      message: 'tutorProfilePage.profileInfo.copyProfileLink',
      duration: 2000
    })
  }

  const actionIcon = isMyProfile ? (
    <EditOutlinedIcon color='primary' fontSize='small' />
  ) : (
    <CopyRoundedIcon color='primary' fontSize='small' />
  )

  const actionIconBtn = (
    <IconButton
      data-testid='icon-btn'
      onClick={ copyProfileLink }
      size={ isDesktop ? 'large' : 'small' }
      sx={ styles.iconBtn }
    >
      { actionIcon }
    </IconButton>
  )

  const accInfo = accountInfoMock.map((item) => (
    <TitleWithDescription
      description={ item.description }
      descriptionStyles={ { typography: 'overline' } }
      key={ item.description }
      style={ { wrapper: { textAlign: 'center' } } }
      title={ item.title }
      titleStyles={ { typography: { md: 'h5' } } }
    />
  ))

  const buttonGroup = !isMyProfile && (
    <Box sx={ styles.buttonGroup }>
      <Button fullWidth size={ isDesktop ? 'extraLarge' : 'medium' } variant='containedLight'>
        { t('tutorProfilePage.profileInfo.bookLesson') }
      </Button>

      <Button fullWidth size={ isDesktop ? 'extraLarge' : 'medium' } variant='contained'>
        { t('tutorProfilePage.profileInfo.sendMessage') }
      </Button>
    </Box>
  )

  return !isMobile ? (
    <ProfileContainerDesktop
      accInfo={ accInfo }
      actionIcon={ actionIconBtn }
      buttonGroup={ buttonGroup }
      defaultQuantity={ isDesktop ? 4 : 2 }
      doneItems={ doneItemsMock }
      subjectChips={ subjectChipsMock }
    />
  ) : (
    <ProfileContainerMobile
      accInfo={ accInfo }
      actionIcon={ actionIconBtn }
      buttonGroup={ buttonGroup }
      defaultQuantity={ 4 }
      doneItems={ doneItemsMock }
      subjectChips={ subjectChipsMock }
    />
  )
}

export default ProfileInfo
