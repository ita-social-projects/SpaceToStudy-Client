import { useMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'

import ProfileContainerDesktop from '~/containers/tutor-profile/profile-info/ProfileContainerDesktop'
import ProfileContainerMobile from '~/containers/tutor-profile/profile-info/ProfileContainerMobile'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { useAppSelector } from '~/hooks/use-redux'
import useBreakpoints from '~/hooks/use-breakpoints'

import { tutorRoutes } from '~/router/constants/tutorRoutes'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { useSnackBarContext } from '~/context/snackbar-context'
import {
  accountInfoMock,
  subjectChipsMock,
  doneItemsMock
} from '~/containers/tutor-profile/profile-info/ProfileInfo.constants'
import { styles } from '~/containers/tutor-profile/profile-info/ProfileInfo.styles'
import { snackbarVariants, myProfilePath, student } from '~/constants'
import { SizeEnum } from '~/types'

const ProfileInfo = () => {
  const { t } = useTranslation()
  const { isDesktop, isMobile } = useBreakpoints()
  const { setAlert } = useSnackBarContext()
  const { userRole } = useAppSelector((state) => state.appMain)
  const isMyProfile = useMatch(myProfilePath)

  const copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setAlert({
      severity: snackbarVariants.success,
      message: 'tutorProfilePage.profileInfo.copyProfileLink',
      duration: 2000
    })
  }

  const navigateToEditPtofile =
    userRole === student
      ? studentRoutes.editProfile.path
      : tutorRoutes.editProfile.path

  const actionIcon = isMyProfile ? (
    <EditOutlinedIcon color='primary' fontSize='small' />
  ) : (
    <CopyRoundedIcon color='primary' fontSize='small' />
  )

  const actionIconBtn = (
    <IconButton
      data-testid='icon-btn'
      href={isMyProfile && navigateToEditPtofile}
      onClick={!isMyProfile ? copyProfileLink : undefined}
      size={isDesktop ? SizeEnum.Large : SizeEnum.Small}
      sx={styles.iconBtn}
    >
      {actionIcon}
    </IconButton>
  )

  const accInfo = accountInfoMock.map((item) => (
    <TitleWithDescription
      description={item.description}
      key={item.description}
      style={styles.profileTitleComp}
      title={item.title}
    />
  ))

  const buttonGroup = !isMyProfile && (
    <Box sx={styles.buttonGroup}>
      <Button
        disabled
        fullWidth
        size={isDesktop ? SizeEnum.ExtraLarge : SizeEnum.Medium}
        variant='containedLight'
      >
        {t('tutorProfilePage.profileInfo.bookLesson')}
      </Button>

      <Button
        disabled
        fullWidth
        size={isDesktop ? SizeEnum.ExtraLarge : SizeEnum.Medium}
        variant='contained'
      >
        {t('tutorProfilePage.profileInfo.sendMessage')}
      </Button>
    </Box>
  )

  return !isMobile ? (
    <ProfileContainerDesktop
      accInfo={accInfo}
      actionIcon={actionIconBtn}
      buttonGroup={buttonGroup}
      defaultQuantity={isDesktop ? 4 : 2}
      doneItems={doneItemsMock}
      subjectChips={subjectChipsMock}
    />
  ) : (
    <ProfileContainerMobile
      accInfo={accInfo}
      actionIcon={actionIconBtn}
      buttonGroup={buttonGroup}
      defaultQuantity={4}
      doneItems={doneItemsMock}
      subjectChips={subjectChipsMock}
    />
  )
}

export default ProfileInfo
