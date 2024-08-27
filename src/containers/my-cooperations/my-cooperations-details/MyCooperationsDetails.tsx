import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DoneIcon from '@mui/icons-material/Done'
import PersonIcon from '@mui/icons-material/Person'
import MessageIcon from '@mui/icons-material/Message'

import useAxios from '~/hooks/use-axios'
import { cooperationService } from '~/services/cooperation-service'
import AvatarIcon from '~/components/avatar-icon/AvatarIcon'
import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'
import AppButton from '~/components/app-button/AppButton'
import ShowMoreCollapse from '~/components/show-more-collapse/ShowMoreCollapse'
import Loader from '~/components/loader/Loader'

import {
  ButtonVariantEnum,
  MyCooperationDetails,
  Offer,
  ServiceFunction,
  SizeEnum,
  UserRoleEnum
} from '~/types'
import { style } from '~/containers/my-cooperations/my-cooperations-details/MyCooperationsDetails.styles'
import { createUrlPath } from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'
import { useChatContext } from '~/context/chat-context'
import CooperationCompletion from '../cooperation-completion/CooperationCompletion'
import { getCategoryIcon } from '~/services/category-icon-service'
import { getValidatedHexColor } from '~/utils/get-validated-hex-color'
import { useAppSelector } from '~/hooks/use-redux'

const MyCooperationsDetails = () => {
  const { t } = useTranslation()
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { setChatInfo } = useChatContext()
  const userId = useAppSelector((state) => state.appMain.userId)
  const userRole = useAppSelector((state) => state.appMain.userRole)

  const getDetails: ServiceFunction<
    MyCooperationDetails<Offer> | null,
    undefined
  > = useCallback(() => cooperationService.getCooperationById(id), [id])

  const {
    response: detailsResponse,
    loading: detailsLoading,
    fetchData
  } = useAxios<MyCooperationDetails<Offer> | null>({
    service: getDetails,
    defaultResponse: null
  })

  const updateInfo = useCallback(() => {
    void fetchData
  }, [fetchData])

  if (detailsLoading || !detailsResponse) {
    return <Loader pageLoad />
  }

  const displayedUser =
    detailsResponse.initiator._id === userId
      ? detailsResponse.receiver
      : detailsResponse.initiator
  const isTutor = displayedUser.role[0] === UserRoleEnum.Tutor

  const { offer, price } = detailsResponse

  const CategoryIcon = getCategoryIcon(offer.category.appearance.icon)
  const categoryColor = getValidatedHexColor(offer.category.appearance.color)

  const onHandleClick = () => {
    navigate(
      createUrlPath(authRoutes.userProfile.path, displayedUser._id, {
        role: displayedUser.role
      })
    )
  }

  const onClickOpenChat = () =>
    setChatInfo({
      author: displayedUser,
      authorRole: displayedUser.role[0] as
        | UserRoleEnum.Student
        | UserRoleEnum.Tutor,
      chatId: offer.chatId,
      updateInfo: updateInfo
    })

  const languages =
    offer.languages &&
    offer.languages.map((item: string) => (
      <Box key={item} sx={style.languageItem}>
        <DoneIcon color='success' />
        <Typography>{item}</Typography>
      </Box>
    ))

  const avatarSrc =
    displayedUser.photo &&
    createUrlPath(import.meta.env.VITE_APP_IMG_USER_URL, displayedUser.photo)

  const cooperationCompletion = userRole === UserRoleEnum.Tutor && (
    <CooperationCompletion />
  )

  return (
    <Box>
      <Typography sx={style.header}>
        {t('cooperationDetailsPage.details')}
      </Typography>
      <Box sx={style.container}>
        <Typography sx={style.titles}>
          {t('cooperationDetailsPage.title')}
        </Typography>
        <Typography sx={style.title}>{offer.title}</Typography>
        <Typography sx={style.titles}>
          {t(
            isTutor
              ? 'cooperationDetailsPage.tutor'
              : 'cooperationDetailsPage.student'
          )}
        </Typography>
        <Box>
          <Box sx={style.profileContainer}>
            <AvatarIcon
              firstName={offer.author.firstName}
              lastName={offer.author.lastName}
              photo={avatarSrc}
            />
            <Typography sx={style.profileName}>
              {displayedUser.firstName} {displayedUser.lastName}
            </Typography>
            <Typography sx={style.profileDescription}>
              {displayedUser.professionalSummary}
            </Typography>
          </Box>
          <Box sx={style.userButtons}>
            <AppButton
              onClick={onClickOpenChat}
              size={SizeEnum.Medium}
              sx={style.buttons}
              variant={ButtonVariantEnum.Tonal}
            >
              <MessageIcon />
              {t('common.labels.sendMessage')}
            </AppButton>
            <AppButton
              onClick={onHandleClick}
              size={SizeEnum.Medium}
              sx={style.buttons}
              variant={ButtonVariantEnum.Tonal}
            >
              <PersonIcon />
              {t('cooperationDetailsPage.profile')}
            </AppButton>
          </Box>
        </Box>
        <Typography sx={style.titles}>
          {t('cooperationDetailsPage.tutoringSubject')}
        </Typography>
        <Box sx={style.subjectContainer}>
          <CategoryIcon sx={style.iconColor(categoryColor)} />
          <Typography>{offer.category.name}</Typography>
          <SubjectLevelChips
            color={offer.category.appearance.color}
            proficiencyLevel={offer.proficiencyLevel}
            subject={offer.subject.name}
          />
        </Box>
        <Typography sx={style.titles}>
          {t('cooperationDetailsPage.aboutCooperation')}
        </Typography>
        <ShowMoreCollapse
          collapsedSize={30}
          collapsedTextLength={100}
          description={offer.description}
          sx={style.aboutCooperation}
          withoutTitle
        />
        <Typography sx={style.titles}>
          {t('cooperationDetailsPage.tutoringLanguages')}
        </Typography>
        <Box sx={style.languageContainer}>{languages}</Box>
        <Typography sx={style.titles}>
          {t('cooperationDetailsPage.pricing')}
        </Typography>
        <Typography>{`${price} UAH/hour`}</Typography>
      </Box>
      {cooperationCompletion}
    </Box>
  )
}

export default MyCooperationsDetails
