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
import { useAppSelector } from '~/hooks/use-redux'

const MyCooperationsDetails = () => {
  const { t } = useTranslation()
  const { id = '' } = useParams()
  const { setChatInfo } = useChatContext()
  const userId = useAppSelector((state) => state.appMain.userId)
  const userRole = useAppSelector((state) => state.appMain.userRole)
  const { checkConfirmation } = useConfirm()

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
    queryKeys: [
      ['cooperations'],
      ['cooperation', id],
      ['cooperation-details', id]
    ]
  })

  const handleCooperationStatusUpdate = useCallback(async () => {
    const isConfirmed = await checkConfirmation({
      title: t('titles.confirmCooperationClosing'),
      message: t('cooperationsPage.closeCooperationModal.message'),
      check: true
    })

    if (isConfirmed) {
      updateCooperationDetails({ _id: id, status: StatusEnum.RequestToClose })
    }
  }, [checkConfirmation, id, t, updateCooperationDetails])

  const handleCloseCooperation = useCallback(() => {
    void handleCooperationStatusUpdate()
  }, [handleCooperationStatusUpdate])

  if (detailsLoading || !cooperationDetails) {
    return <Loader pageLoad />
  }

  const displayedUser =
    cooperationDetails.user._id === userId
      ? cooperationDetails.receiver
      : cooperationDetails.initiator
  const isTutor = displayedUser.role[0] === UserRoleEnum.Tutor

  const CategoryIcon = getCategoryIcon(
    cooperationDetails.category.appearance.icon
  )
  const categoryColor = getValidatedHexColor(
    cooperationDetails.category.appearance.color
  )

  const onClickOpenChat = () =>
    setChatInfo({
      author: displayedUser,
      authorRole: displayedUser.role[0] as
        | UserRoleEnum.Student
        | UserRoleEnum.Tutor,
      chatId: cooperationDetails.chatId,
      updateInfo: () => {}
    })

  const languages = cooperationDetails.languages?.map((item: string) => (
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

  const cooperationCompletion = userRole === UserRoleEnum.Tutor && (
    <CooperationCompletion
      cooperationStatus={cooperationDetails.status}
      onCloseCooperation={handleCloseCooperation}
      userRole={userRole}
    />
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
        <Typography sx={style.title}>{cooperationDetails.title}</Typography>
        <Typography sx={style.titles}>
          {t(
            isTutor
              ? 'cooperationDetailsPage.tutor'
              : 'cooperationDetailsPage.student'
          )}
        </Typography>
        <Box>
          <Typography sx={style.header}>
            {t('cooperationDetailsPage.details')}
          </Typography>
          <Box sx={style.container}>
            <Typography sx={style.titles}>
              {t('cooperationDetailsPage.title')}
            </Typography>
            <Typography sx={style.title}>{cooperationDetails.title}</Typography>
            <Typography sx={style.titles}>
              {t(
                displayedUser.role[0] === UserRoleEnum.Tutor
                  ? 'cooperationDetailsPage.tutor'
                  : 'cooperationDetailsPage.student'
              )}
            </Typography>
            <Box>
              <Box sx={style.profileContainer}>
                <AvatarIcon
                  firstName={displayedUser.firstName}
                  lastName={displayedUser.lastName}
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
                      role: displayedUser.role[0]
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
                <Typography>{cooperationDetails.category.name}</Typography>
              </Box>
              <SubjectLevelChips
                color={cooperationDetails.category.appearance.color}
                proficiencyLevel={cooperationDetails.proficiencyLevel[0]}
                subject={cooperationDetails.subject.name}
              />
            </Box>
            <Typography sx={style.titles}>
              {t('cooperationDetailsPage.aboutCooperation')}
            </Typography>
            <ShowMoreCollapse
              collapsedSize={28}
              collapsedTextLength={100}
              description={cooperationDetails.description}
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
            <Typography>{`${cooperationDetails.price} UAH/hour`}</Typography>
          </Box>
          <CooperationCompletion
            cooperationStatus={cooperationDetails.status}
            onCloseCooperation={handleCloseCooperation}
            userRole={userRole}
          />
        </Box>
        <Typography sx={style.titles}>
          {t('cooperationDetailsPage.tutoringSubject')}
        </Typography>
        <Box sx={style.subjectContainer}>
          <Box sx={style.categoryContainer}>
            <CategoryIcon sx={style.iconColor(categoryColor)} />
            <Typography>{cooperationDetails.category.name}</Typography>
          </Box>
          <SubjectLevelChips
            color={cooperationDetails.category.appearance.color}
            proficiencyLevel={cooperationDetails.proficiencyLevel}
            subject={cooperationDetails.subject.name}
          />
        </Box>
        <Typography sx={style.titles}>
          {t('cooperationDetailsPage.aboutCooperation')}
        </Typography>
        <ShowMoreCollapse
          collapsedSize={28}
          collapsedTextLength={100}
          description={cooperationDetails.description}
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
        <Typography>{`${cooperationDetails.price} UAH/hour`}</Typography>
      </Box>
      {cooperationCompletion}
    </Box>
  )
}

export default MyCooperationsDetails
