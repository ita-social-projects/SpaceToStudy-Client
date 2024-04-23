import { useMatch, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AppIconButton from '~/components/app-icon-button/AppIconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'

import useBreakpoints from '~/hooks/use-breakpoints'
import AppRatingMobile from '~/components/app-rating-mobile/AppRatingMobile'
import ProfileContainerDesktop from '~/containers/tutor-profile/profile-info/ProfileContainerDesktop'
import ProfileContainerMobile from '~/containers/tutor-profile/profile-info/ProfileContainerMobile'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { authRoutes } from '~/router/constants/authRoutes'
import { useSnackBarContext } from '~/context/snackbar-context'
import { styles } from '~/containers/tutor-profile/profile-info/ProfileInfo.styles'
import { snackbarVariants } from '~/constants'
import { SizeEnum, UserRoleEnum, ButtonVariantEnum } from '~/types'
import { createUrlPath, getDifferenceDates } from '~/utils/helper-functions'

const ProfileInfo = ({ userData, myRole }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const { setAlert } = useSnackBarContext()
  const isMyProfile = useMatch(authRoutes.accountMenu.myProfile.path)
  const { number, format } = getDifferenceDates(userData.createdAt, new Date())
  const { Student, Tutor } = UserRoleEnum

  const copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setAlert({
      severity: snackbarVariants.success,
      message: 'tutorProfilePage.profileInfo.copyProfileLink',
      duration: 2000
    })
  }

  const navigateToUserOffers = () => {
    navigate(
      createUrlPath(authRoutes.findOffers.path, undefined, {
        search: `${userData.firstName} ${userData.lastName}`,
        page: 1,
        authorRole: myRole !== Student ? Student : Tutor
      })
    )
  }

  const actionIcon = isMyProfile ? (
    <EditOutlinedIcon color='primary' fontSize='small' />
  ) : (
    <CopyRoundedIcon color='primary' fontSize='small' />
  )

  const actionIconBtn = (
    <AppIconButton
      data-testid='icon-btn'
      onClick={!isMyProfile ? copyProfileLink : undefined}
      size={isLaptopAndAbove ? SizeEnum.Large : SizeEnum.Small}
      sx={styles.iconBtn}
      to={isMyProfile && authRoutes.editProfile.path}
    >
      {actionIcon}
    </AppIconButton>
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
        fullWidth
        onClick={navigateToUserOffers}
        size={isLaptopAndAbove ? SizeEnum.ExtraLarge : SizeEnum.Medium}
        variant={ButtonVariantEnum.ContainedLight}
      >
        {t(
          `tutorProfilePage.profileInfo.${
            myRole !== Student ? 'studentRequests' : 'tutorOffers'
          }`
        )}
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
