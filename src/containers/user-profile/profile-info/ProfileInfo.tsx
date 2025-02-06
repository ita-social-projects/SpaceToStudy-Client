import { useMatch, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'

import AppIconButton from '~/components/app-icon-button/AppIconButton'
import AppRatingMobile from '~/components/app-rating-mobile/AppRatingMobile'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import Button from '~scss-components/button/Button'

import useBreakpoints from '~/hooks/use-breakpoints'

import ProfileContainerDesktop from '~/containers/user-profile/profile-info/ProfileContainerDesktop'
import ProfileContainerMobile from '~/containers/user-profile/profile-info/ProfileContainerMobile'
import { styles } from '~/containers/user-profile/profile-info/ProfileInfo.styles'

import { authRoutes } from '~/router/constants/authRoutes'
import { defaultResponses, snackbarVariants } from '~/constants'

import { UserRoleEnum, UserResponse, ChatResponse } from '~/types'
import { createUrlPath, getDifferenceDates } from '~/utils/helper-functions'
import { useAppDispatch } from '~/hooks/use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'
import { useChatContext } from '~/context/chat-context'
import useAxios from '~/hooks/use-axios'
import { chatService } from '~/services/chat-service'
import { DoneItem } from './ProfileInfo.constants'

interface ProfileInfoProps {
  userData: UserResponse
  myRole: UserRoleEnum
}

const ProfileInfo = ({ userData, myRole }: ProfileInfoProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setChatInfo } = useChatContext()
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
      onClick={() => (!isMyProfile ? void copyProfileLink() : null)}
      size={isLaptopAndAbove ? 'lg' : 'sm'}
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

  const doneItems: DoneItem[] = [
    userData.nativeLanguage && {
      title: t('userProfilePage.profileInfo.nativeLanguage'),
      description: userData.nativeLanguage
    },
    userData.address &&
      userData.address.country.length > 0 && {
        title: t('userProfilePage.profileInfo.location'),
        description: `${userData.address.city}, ${userData.address.country}`
      }
  ].filter((item): item is DoneItem => !!item)
  const {
    response: listOfChats,
    loading: isChatsLoading,
    fetchData
  } = useAxios<ChatResponse[]>({
    service: chatService.getChats,
    defaultResponse: defaultResponses.array
  })

  const onSendMessageClick = () => {
    const existedChat = listOfChats.find((chat) => {
      return chat.members.some((member) => member.user._id == userData._id)
    })

    setChatInfo({
      author: userData,
      authorRole: userData.role[0] as UserRoleEnum.Student | UserRoleEnum.Tutor,
      chatId: existedChat?._id ?? '',
      updateInfo: () => {}
    })

    if (!existedChat?._id) {
      void fetchData()
    }
  }
  const buttonGroup = !isMyProfile && (
    <Box sx={styles.buttonGroup}>
      <Button
        fullWidth
        onClick={navigateToUserOffers}
        size={isLaptopAndAbove ? 'lg' : 'md'}
      >
        {t(
          `userProfilePage.profileInfo.${
            myRole !== Student ? 'studentRequests' : 'tutorOffers'
          }`
        )}
      </Button>

      <Button
        disabled={isChatsLoading}
        fullWidth
        onClick={onSendMessageClick}
        size={isLaptopAndAbove ? 'lg' : 'md'}
      >
        {t('userProfilePage.profileInfo.sendMessage')}
      </Button>
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
