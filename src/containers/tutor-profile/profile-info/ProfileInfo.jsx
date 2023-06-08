import { useMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import StarIcon from '@mui/icons-material/Star'
import Typography from '@mui/material/Typography'

import ProfileContainerDesktop from '~/containers/tutor-profile/profile-info/ProfileContainerDesktop'
import ProfileContainerMobile from '~/containers/tutor-profile/profile-info/ProfileContainerMobile'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { useAppSelector } from '~/hooks/use-redux'
import useBreakpoints from '~/hooks/use-breakpoints'
import HashLink from '~/components/hash-link/HashLink'

import { tutorRoutes } from '~/router/constants/tutorRoutes'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { useSnackBarContext } from '~/context/snackbar-context'
import { styles } from '~/containers/tutor-profile/profile-info/ProfileInfo.styles'
import { snackbarVariants, myProfilePath, student } from '~/constants'
import { SizeEnum } from '~/types'
import { getNumberOfYears } from '~/utils/helper-functions'

const ProfileInfo = ({ userData }) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const { setAlert } = useSnackBarContext()
  const { userRole } = useAppSelector((state) => state.appMain)
  const isMyProfile = useMatch(myProfilePath)
  const { number, format } = getNumberOfYears(userData.createdAt, new Date())

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
      size={isLaptopAndAbove ? SizeEnum.Large : SizeEnum.Small}
      sx={styles.iconBtn}
    >
      {actionIcon}
    </IconButton>
  )

  const accountRating = (
    <>
      <StarIcon sx={styles.ratingIcon} />
      {userData.averageRating.tutor}
    </>
  )

  const linkToReviews = (
    <Typography
      component={HashLink}
      sx={{ color: 'text.primary' }}
      to={'#'}
      variant='overline'
    >
      {`${userData.totalReviews.tutor} ${t(
        'tutorProfilePage.profileInfo.reviews'
      )}`}
    </Typography>
  )

  const accountInfo = [
    {
      title: `${number} ${t(`tutorProfilePage.profileInfo.timeFor${format}`)}`,
      description: t('tutorProfilePage.profileInfo.withS2S')
    },
    {
      title: accountRating,
      description: linkToReviews
    }
  ]

  const accInfo = accountInfo.map((item) => (
    <TitleWithDescription
      description={item.description}
      key={item.description}
      style={styles.profileTitleComp}
      title={item.title}
    />
  ))

  const doneItems = [
    {
      title: t('tutorProfilePage.profileInfo.nativeLanguage'),
      description: userData.nativeLanguage
    },
    {
      title: t('tutorProfilePage.profileInfo.location'),
      description: `${userData.address.city}, ${userData.address.country}`
    }
  ]

  const buttonGroup = !isMyProfile && (
    <Box sx={styles.buttonGroup}>
      <Button
        disabled
        fullWidth
        size={isLaptopAndAbove ? SizeEnum.ExtraLarge : SizeEnum.Medium}
        variant='containedLight'
      >
        {t('tutorProfilePage.profileInfo.bookLesson')}
      </Button>

      <Button
        disabled
        fullWidth
        size={isLaptopAndAbove ? SizeEnum.ExtraLarge : SizeEnum.Medium}
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
      defaultQuantity={isLaptopAndAbove ? 4 : 2}
      doneItems={doneItems}
      userData={userData}
    />
  ) : (
    <ProfileContainerMobile
      accInfo={accInfo}
      actionIcon={actionIconBtn}
      buttonGroup={buttonGroup}
      defaultQuantity={4}
      doneItems={doneItems}
      userData={userData}
    />
  )
}

export default ProfileInfo
