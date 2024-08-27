import { useMatch, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'

import AppIconButton from '~/components/app-icon-button/AppIconButton'
import AppRatingMobile from '~/components/app-rating-mobile/AppRatingMobile'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'

import useBreakpoints from '~/hooks/use-breakpoints'

import ProfileContainerDesktop from '~/containers/user-profile/profile-info/ProfileContainerDesktop'
import ProfileContainerMobile from '~/containers/user-profile/profile-info/ProfileContainerMobile'
import { styles } from '~/containers/user-profile/profile-info/ProfileInfo.styles'

import { authRoutes } from '~/router/constants/authRoutes'
import { snackbarVariants } from '~/constants'

import {
  SizeEnum,
  UserRoleEnum,
  ButtonVariantEnum,
  UserResponse
} from '~/types'
import { createUrlPath, getDifferenceDates } from '~/utils/helper-functions'
import { useAppDispatch } from '~/hooks/use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'

interface ProfileInfoProps {
  userData: UserResponse
  myRole: UserRoleEnum
}

const ProfileInfo = ({ userData, myRole }: ProfileInfoProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const dispatch = useAppDispatch()
  const isMyProfile = useMatch(authRoutes.myProfile.path)
  const { number, format } = getDifferenceDates(
    new Date(userData.createdAt),
    new Date()
  )
  const { Student, Tutor } = UserRoleEnum

  const copyProfileLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: 'userProfilePage.profileInfo.copyProfileLink',
        duration: 2000
      })
    )
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
      to={isMyProfile?.pathname && authRoutes.editProfile.path}
    >
      {actionIcon}
    </AppIconButton>
  )
  const reviewsCount =
    userData.totalReviews[myRole as UserRoleEnum.Student | UserRoleEnum.Tutor]
  const value =
    userData.averageRating[myRole as UserRoleEnum.Student | UserRoleEnum.Tutor]

  const accountRating = (
    <AppRatingMobile
      link={'#'}
      reviewsCount={reviewsCount}
      sx={styles.appRating}
      value={value}
    />
  )

  const accountInfo = [
    {
      title: t(`userProfilePage.profileInfo.timeFor${format}`, {
        count: number
      }),
      description: t('userProfilePage.profileInfo.withS2S')
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
      title: t('userProfilePage.profileInfo.nativeLanguage'),
      description: userData.nativeLanguage
    },
    userData.address &&
      userData.address.country.length > 0 && {
        title: t('userProfilePage.profileInfo.location'),
        description: `${userData.address.city}, ${userData.address.country}`
      }
  ].filter(Boolean)

  const buttonGroup = !isMyProfile && (
    <Box sx={styles.buttonGroup}>
      <AppButton
        fullWidth
        onClick={navigateToUserOffers}
        size={isLaptopAndAbove ? SizeEnum.ExtraLarge : SizeEnum.Medium}
        variant={ButtonVariantEnum.ContainedLight}
      >
        {t(
          `userProfilePage.profileInfo.${
            myRole !== Student ? 'studentRequests' : 'tutorOffers'
          }`
        )}
      </AppButton>

      <AppButton
        disabled
        fullWidth
        size={isLaptopAndAbove ? SizeEnum.ExtraLarge : SizeEnum.Medium}
        variant='contained'
      >
        {t('userProfilePage.profileInfo.sendMessage')}
      </AppButton>
    </Box>
  )

  const subjectData =
    userData.mainSubjects.tutor?.flatMap((item) => {
      const subjectNames = item.subjects.map((subject) => subject.name)
      return subjectNames.length ? subjectNames : [item.category.name]
    }) || []

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
