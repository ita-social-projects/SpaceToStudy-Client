import { useTranslation } from 'react-i18next'
import { useMatch } from 'react-router-dom'

import CopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import AppRatingMobile from '~/components/app-rating-mobile/AppRatingMobile'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import ProfileContainerDesktop from '~/containers/tutor-profile/profile-info/ProfileContainerDesktop'
import ProfileContainerMobile from '~/containers/tutor-profile/profile-info/ProfileContainerMobile'
import useBreakpoints from '~/hooks/use-breakpoints'

import { snackbarVariants } from '~/constants'
import { styles } from '~/containers/tutor-profile/profile-info/ProfileInfo.styles'
import { useSnackBarContext } from '~/context/snackbar-context'
import { authRoutes } from '~/router/constants/authRoutes'
import { getDifferenceDates } from '~/utils/helper-functions'

const ProfileInfo = ({ userData }) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const { setAlert } = useSnackBarContext()
  const isMyProfile = useMatch(authRoutes.accountMenu.myProfile.path)
  const { number, format } = getDifferenceDates(userData.createdAt, new Date())

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
      href={isMyProfile && authRoutes.editProfile.path}
      onClick={!isMyProfile ? copyProfileLink : undefined}
      size={isLaptopAndAbove ? 'large' : 'small'}
      sx={styles.iconBtn}
    >
      {actionIcon}
    </IconButton>
  )

  const accountRating = (
    <AppRatingMobile
      link={'#'}
      reviewsCount={userData.totalReviews[userData.role]}
      sx={styles.appRating}
      value={userData.averageRating[userData.role]}
    />
  )

  const accountInfo = [
    {
      title: t(`tutorProfilePage.profileInfo.timeFor${format}`, {
        count: number
      }),
      description: t('tutorProfilePage.profileInfo.withS2S')
    },
    {
      title: '',
      description: accountRating
    }
  ]

  const accInfo = accountInfo.map((item) => (
    <TitleWithDescription
      description={item.description}
      key={item.title}
      style={styles.profileTitleComp}
      title={item.title}
    />
  ))

  const doneItems = [
    userData.nativeLanguage && {
      title: t('tutorProfilePage.profileInfo.nativeLanguage'),
      description: userData.nativeLanguage
    },
    userData.address &&
      userData.address.country.length > 0 && {
        title: t('tutorProfilePage.profileInfo.location'),
        description: `${userData.address.city}, ${userData.address.country}`
      }
  ].filter(Boolean)

  const buttonGroup = !isMyProfile && (
    <Box sx={styles.buttonGroup}>
      <Button
        disabled
        fullWidth
        size={isLaptopAndAbove ? 'extraLarge' : 'medium'}
        variant={'containedLight'}
      >
        {t('tutorProfilePage.profileInfo.bookLesson')}
      </Button>

      <Button
        disabled
        fullWidth
        size={isLaptopAndAbove ? 'extraLarge' : 'medium'}
        variant={'contained'}
      >
        {t('tutorProfilePage.profileInfo.sendMessage')}
      </Button>
    </Box>
  )

  const subjectData = userData.mainSubjects.tutor.map((item) => item.name)

  return !isMobile ? (
    <ProfileContainerDesktop
      accInfo={accInfo}
      actionIcon={actionIconBtn}
      buttonGroup={buttonGroup}
      chipItems={subjectData}
      defaultQuantity={isLaptopAndAbove ? 4 : 2}
      doneItems={doneItems}
      userData={userData}
    />
  ) : (
    <ProfileContainerMobile
      accInfo={accInfo}
      actionIcon={actionIconBtn}
      buttonGroup={buttonGroup}
      chipItems={subjectData}
      defaultQuantity={4}
      doneItems={doneItems}
      userData={userData}
    />
  )
}

export default ProfileInfo
