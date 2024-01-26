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
import { defaultOffer } from '~/containers/my-cooperations/my-cooperations-details/MyCooperationsDetails.constants'

import { ButtonVariantEnum, SizeEnum, UserRoleEnum } from '~/types'
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

  const getDetails = useCallback(
    () => cooperationService.getCooperationById(id),
    [id]
  )

  const { response, loading } = useAxios({
    service: getDetails,
    defaultResponse: defaultOffer
  })

  const { offer, price } = response

  const onHandleClick = () => {
    navigate(
      createUrlPath(authRoutes.userProfile.path, offer.author._id, {
        role: 'tutor'
      })
    )
  }
  console.log(offer.author)

  const onClickOpenChat = () =>
    setChatInfo({
      author: offer.author,
      authorRole: UserRoleEnum.Tutor,
      chatId: offer.chatId
    })

  const languages = offer.languages.map((item: string) => (
    <Box key={item} sx={style.languageItem}>
      <DoneIcon color='success' />
      <Typography>{item}</Typography>
    </Box>
  ))
  return loading ? (
    <Loader size={50} />
  ) : (
    <Box>
      <Typography sx={style.header}>
        {t('cooperationDetailsPage.details')}
      </Typography>

      <Box sx={style.container}>
        <Typography sx={style.titles}>Cooperations title:</Typography>
        <Typography sx={style.title}>{offer.title}</Typography>
        <Typography sx={style.titles}>Tutor:</Typography>
        <Box>
          <Box sx={style.profileContainer}>
            <Avatar
              src={
                offer.author.photo &&
                `${import.meta.env.VITE_APP_IMG_USER_URL}${offer.author.photo}`
              }
            />
            <Typography sx={style.profileName}>
              {offer.author.firstName} {offer.author.lastName}
            </Typography>
            <Typography sx={style.profileDescription}>
              {offer.author.professionalSummary}
            </Typography>
          </Box>
          <Box>
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
        <Typography sx={style.titles}>Tutoring subject & level:</Typography>
        <Box sx={style.subjectContainer}>
          <DesignServicesIcon sx={{ color: offer.category.appearance.color }} />
          <Typography>{offer.category.name}</Typography>
          <SubjectLevelChips
            color={offer.category.appearance.color}
            proficiencyLevel={offer.proficiencyLevel}
            subject={offer.subject.name}
          />
        </Box>
        <Typography sx={style.titles}>About cooperation:</Typography>
        <ShowMoreCollapse
          collapsedSize={30}
          collapsedTextLength={100}
          description={offer.description}
          sx={style.aboutCooperation}
          title={''}
          withoutTitle
        />
        <Typography sx={style.titles}>Tutoring languages:</Typography>
        <Box sx={style.languageContainer}>{languages}</Box>
        <Typography sx={style.titles}>Pricing:</Typography>
        <Typography>{`${price} UAH/hour`}</Typography>
      </Box>
      <CooperationCompletion />
    </Box>
  )
}

export default MyCooperationsDetails
