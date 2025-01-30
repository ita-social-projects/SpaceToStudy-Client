import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DoneIcon from '@mui/icons-material/Done'
import PersonIcon from '@mui/icons-material/Person'
import MessageIcon from '@mui/icons-material/Message'
import useMutation from '~/hooks/use-mutation'
import useQuery from '~/hooks/use-query'
import { cooperationService } from '~/services/cooperation-service'
import AvatarIcon from '~/components/avatar-icon/AvatarIcon'
import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'
import Button from '~scss-components/button/Button'
import ShowMoreCollapse from '~/components/show-more-collapse/ShowMoreCollapse'
import Loader from '~/components/loader/Loader'
import useConfirm from '~/hooks/use-confirm'
import { ButtonVariantEnum, StatusEnum, UserRoleEnum } from '~/types'
import { style } from '~/containers/my-cooperations/my-cooperations-details/MyCooperationsDetails.styles'
import { getFullUrl } from '~/utils/get-full-url'
import { authRoutes } from '~/router/constants/authRoutes'
import { useChatContext } from '~/context/chat-context'
import CooperationCompletion from '../cooperation-completion/CooperationCompletion'
import { getCategoryIcon } from '~/services/category-icon-service'
import { getValidatedHexColor } from '~/utils/get-validated-hex-color'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import { setCooperationStatus } from '~/redux/features/cooperationsSlice'

const MyCooperationsDetails = () => {
  const { t } = useTranslation()
  const { id = '' } = useParams()
  const { setChatInfo } = useChatContext()
  const userId = useAppSelector((state) => state.appMain.userId)
  const userRole = useAppSelector((state) => state.appMain.userRole)
  const cooperationStatus = useAppSelector((state) => state.cooperations.status)
  const { checkConfirmation } = useConfirm()
  const dispatch = useAppDispatch()

  const getCooperationDetails = useCallback(() => {
    return cooperationService.getCooperationById(id)
  }, [id])

  const { data: cooperationDetails, isLoading: detailsLoading } = useQuery({
    queryFn: getCooperationDetails,
    queryKey: ['cooperation-details', id],
    options: {
      staleTime: Infinity
    }
  })

  const { mutate: updateCooperationDetails } = useMutation({
    mutationFn: cooperationService.updateCooperation,
    queryKeys: [['cooperations'], ['cooperation-details', id]]
  })

  const handleCooperationStatusUpdate = useCallback(async () => {
    const isConfirmed = await checkConfirmation({
      title: t('titles.confirmCooperationClosing'),
      message: t('cooperationsPage.closeCooperationModal.message'),
      check: true
    })

    if (isConfirmed) {
      updateCooperationDetails({ _id: id, status: StatusEnum.RequestToClose })
      dispatch(setCooperationStatus(StatusEnum.RequestToClose))
    }
  }, [checkConfirmation, dispatch, id, t, updateCooperationDetails])

  const handleCloseCooperation = useCallback(() => {
    void handleCooperationStatusUpdate()
  }, [handleCooperationStatusUpdate])

  if (detailsLoading || !cooperationDetails) {
    return <Loader pageLoad />
  }

  const displayedUser =
    cooperationDetails.initiator._id === userId
      ? cooperationDetails.receiver
      : cooperationDetails.initiator

  const [displayedUserRole] = displayedUser.role

  const { offer, price } = cooperationDetails

  const CategoryIcon = getCategoryIcon(offer.category.appearance.icon)
  const categoryColor = getValidatedHexColor(offer.category.appearance.color)

  const onClickOpenChat = () =>
    setChatInfo({
      author: displayedUser,
      authorRole: displayedUserRole as
        | UserRoleEnum.Student
        | UserRoleEnum.Tutor,
      chatId: offer.chatId,
      updateInfo: () => {}
    })

  const languages = offer.languages?.map((item: string) => (
    <Box key={item} sx={style.languageItem}>
      <DoneIcon color='success' />
      <Typography>{item}</Typography>
    </Box>
  ))

  const avatarSrc =
    displayedUser.photo &&
    getFullUrl({
      pathname: import.meta.env.VITE_APP_IMG_USER_URL as `${string}/:fileName`,
      parameters: {
        fileName: displayedUser.photo
      }
    })

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
            displayedUserRole === UserRoleEnum.Tutor
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
            <Button
              onClick={onClickOpenChat}
              size='md'
              startIcon={<MessageIcon />}
              sx={style.buttons}
              variant='tonal'
            >
              {t('common.labels.sendMessage')}
            </Button>
            <Button
              component={Link}
              size='md'
              startIcon={<PersonIcon />}
              sx={style.buttons}
              to={getFullUrl({
                pathname: authRoutes.userProfile.route,
                parameters: {
                  id: displayedUser._id
                },
                searchParameters: {
                  role: displayedUserRole
                }
              })}
              variant={ButtonVariantEnum.Tonal}
            >
              {t('cooperationDetailsPage.profile')}
            </Button>
          </Box>
        </Box>
        <Typography sx={style.titles}>
          {t('cooperationDetailsPage.tutoringSubject')}
        </Typography>
        <Box sx={style.subjectContainer}>
          <Box sx={style.categoryContainer}>
            <CategoryIcon sx={style.iconColor(categoryColor)} />
            <Typography>{offer.category.name}</Typography>
          </Box>
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
          collapsedSize={28}
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
      <CooperationCompletion
        cooperationStatus={cooperationStatus}
        onCloseCooperation={handleCloseCooperation}
        userRole={userRole}
      />
    </Box>
  )
}

export default MyCooperationsDetails
