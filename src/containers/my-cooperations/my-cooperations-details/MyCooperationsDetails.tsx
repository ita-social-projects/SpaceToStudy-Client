import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import DesignServicesIcon from '@mui/icons-material/DesignServices'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DoneIcon from '@mui/icons-material/Done'
import PersonIcon from '@mui/icons-material/Person'
import MessageIcon from '@mui/icons-material/Message'

import useAxios from '~/hooks/use-axios'
import { cooperationService } from '~/services/cooperation-service'
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

const MyCooperationsDetails = () => {
  const { t } = useTranslation()
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { setChatInfo } = useChatContext()

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

  const { offer, price } = detailsResponse

  const onHandleClick = () => {
    navigate(
      createUrlPath(authRoutes.userProfile.path, offer.author._id, {
        role: UserRoleEnum.Tutor
      })
    )
  }

  const onClickOpenChat = () =>
    setChatInfo({
      author: offer.author,
      authorRole: UserRoleEnum.Tutor,
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
          {t('cooperationDetailsPage.tutor')}
        </Typography>
        <Box>
          <Box sx={style.profileContainer}>
            <Avatar
              src={
                offer.author.photo &&
                createUrlPath(
                  import.meta.env.VITE_APP_IMG_USER_URL,
                  offer.author.photo
                )
              }
            />
            <Typography sx={style.profileName}>
              {offer.author.firstName} {offer.author.lastName}
            </Typography>
            <Typography sx={style.profileDescription}>
              {offer.author.professionalSummary}
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
          <DesignServicesIcon
            sx={style.iconColor(offer.category.appearance.color)}
          />
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
      <CooperationCompletion />
    </Box>
  )
}

export default MyCooperationsDetails
