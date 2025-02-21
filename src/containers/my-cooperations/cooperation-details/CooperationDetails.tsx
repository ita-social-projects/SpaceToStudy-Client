import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

import AppDrawer from '~/components/app-drawer/AppDrawer'
import TabNavigation from '~/components/tab-navigation/TabNavigation'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import Loader from '~/components/loader/Loader'
import StatusChip from '~/components/status-chip/StatusChip'
import Button from '~scss-components/button/Button'

import useMutation from '~/hooks/use-mutation'
import useQuery from '~/hooks/use-query'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'

import CooperationActivities from '~/containers/cooperation-details/cooperation-activities/CooperationActivities'
import CooperationNotes from '~/containers/my-cooperations/cooperation-notes/CooperationNotes'
import CooperationActivitiesView from '~/containers/cooperation-details/cooperation-activities-view/CooperationActivitiesView'
import {
  tabsData,
  MyCooperationsTabsData
} from '~/containers/my-cooperations/cooperation-details/CooperationDetails.constants'
import { styles } from '~/containers/my-cooperations/cooperation-details/CooperationDetails.styles'

import { errorRoutes } from '~/router/constants/errorRoutes'
import { cooperationService } from '~/services/cooperation-service'

import {
  CooperationTabsEnum,
  NeedActionTypeEnum,
  PositionEnum,
  StatusEnum
} from '~/types'
import {
  cooperationsSelector,
  setCooperationSections,
  setIsActivityCreated
} from '~/redux/features/cooperationsSlice'
import AcceptCooperationClosing from '~/containers/my-cooperations/accept-cooperation-close/AcceptCooperationClosing'
import CooperationClosureDeclinedBanner from '~/containers/my-cooperations/cooperation-closure-declined-banner/CooperationClosureDeclinedBanner'

const CooperationDetails = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { id = '' } = useParams()
  const { isDesktop } = useBreakpoints()
  const { isActivityCreated } = useAppSelector(cooperationsSelector)
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const { userRole } = useAppSelector((state) => state.appMain)

  const [searchParams, setSearchParams] = useSearchParams()

  const tab = searchParams.get('tab') as CooperationTabsEnum

  const isTabInSearchParams = Object.values(CooperationTabsEnum).includes(tab)

  const defaultTab = CooperationTabsEnum.Activities

  const activeTab = isTabInSearchParams ? tab : defaultTab

  useEffect(() => {
    if (!isTabInSearchParams) {
      setSearchParams({ tab: defaultTab })
    }
  }, [defaultTab, isTabInSearchParams, setSearchParams])

  const getCooperation = useCallback(() => {
    return cooperationService.getCooperationById(id)
  }, [id])

  const {
    data: cooperation,
    isLoading,
    isError
  } = useQuery({
    queryFn: getCooperation,
    queryKey: ['cooperation', id]
  })

  useEffect(() => {
    if (isError) {
      navigate(errorRoutes.notFound.path)
    }
  }, [isError, navigate])

  useEffect(() => {
    if (cooperation) {
      dispatch(setCooperationSections(cooperation.sections))
      setEditMode(Boolean(cooperation.sections?.length))
    }
  }, [cooperation, dispatch])

  const handleEditMode = useCallback(() => {
    setEditMode((prev) => !prev)
    dispatch(setIsActivityCreated(true))
  }, [dispatch])

  const handleCooperationStatusUpdate = useCallback(async () => {
    await cooperationService.updateCooperation({
      _id: id,
      status: StatusEnum.Closed
    })
  }, [id])

  const { mutate: handleCooperationClosingAccept } = useMutation({
    mutationFn: handleCooperationStatusUpdate,
    queryKeys: [['cooperations'], ['cooperation', id]]
  })

  const handleCooperationClosingDecline = async (declineReason: string) => {
    await cooperationService.updateCooperation({
      _id: id,
      newMessage: declineReason
    })
  }

  const { mutate: handleReasonSubmit } = useMutation({
    mutationFn: handleCooperationClosingDecline,
    queryKeys: [['cooperations'], ['cooperation', id]]
  })

  const handleAnswerForDecliningSend = async (answer: string) => {
    await cooperationService.updateCooperation({
      _id: id,
      newMessage: answer
    })
  }

  const { mutate: handleAnswerSubmit } = useMutation({
    mutationFn: handleAnswerForDecliningSend,
    queryKeys: [['cooperations'], ['cooperation', id]]
  })

  if (isLoading || !cooperation) {
    return <Loader pageLoad />
  }

  const handleClick = (tab: CooperationTabsEnum) => {
    setSearchParams({ tab })
  }

  const handleNotesClick = () => {
    setIsNotesOpen((prevState) => !prevState)
  }

  const handleCloseDrawer = () => {
    setIsNotesOpen(false)
  }

  const cooperationContent = activeTab && tabsData[activeTab]?.content

  const pageContent = () => {
    if (editMode && CooperationTabsEnum.Details === activeTab) {
      return cooperationContent
    }

    if (editMode && activeTab === CooperationTabsEnum.Activities) {
      return <CooperationActivitiesView setEditMode={handleEditMode} />
    }

    if (isActivityCreated) {
      return (
        <CooperationActivities cooperationId={id} setEditMode={setEditMode} />
      )
    }

    return cooperationContent
  }

  const closeCooperationInitiator =
    cooperation.needAction.role === cooperation.receiverRole
      ? cooperation.initiator
      : cooperation.receiver

  const closeCooperationReceiver =
    cooperation.needAction.role === cooperation.initiatorRole
      ? cooperation.initiator
      : cooperation.receiver

  const roleBasedStatus =
    cooperation.needAction.role === userRole
      ? StatusEnum.NeedAction
      : StatusEnum.RequestToClose

  const cooperationStatus =
    cooperation.status === StatusEnum.RequestToClose
      ? roleBasedStatus
      : cooperation.status

  const getCooperationClosingModal = () => {
    if (cooperation.status !== StatusEnum.RequestToClose) {
      return null
    }

    const lastMessage = cooperation.needAction.messages.at(-1)
    const secondLastMessage = cooperation.needAction.messages.at(-2)

    if (cooperation.needAction.type === NeedActionTypeEnum.WaitingForApproval) {
      return cooperation.needAction.role === userRole ? (
        <AcceptCooperationClosing
          isReasonSubmitted={false}
          message={lastMessage}
          onAccept={handleCooperationClosingAccept}
          onReasonSubmit={handleReasonSubmit}
          user={closeCooperationInitiator.firstName}
        />
      ) : (
        cooperation.needAction.messages.length !== 0 && (
          <CooperationClosureDeclinedBanner
            isAnswerSubmitted
            message={secondLastMessage}
            onSend={handleAnswerSubmit}
            submittedReason={lastMessage}
            user={closeCooperationReceiver.firstName}
          />
        )
      )
    }

    if (cooperation.needAction.type === NeedActionTypeEnum.WaitingForAnswer) {
      return cooperation.needAction.role === userRole ? (
        <CooperationClosureDeclinedBanner
          isAnswerSubmitted={false}
          message={lastMessage}
          onSend={handleAnswerSubmit}
          user={closeCooperationInitiator.firstName}
        />
      ) : (
        <AcceptCooperationClosing
          isReasonSubmitted
          message={secondLastMessage}
          onAccept={handleCooperationClosingAccept}
          onReasonSubmit={handleReasonSubmit}
          submittedReason={lastMessage}
          user={closeCooperationReceiver.firstName}
        />
      )
    }
  }

  const cooperationClosingModal = getCooperationClosingModal()

  const iconConditionals = isNotesOpen ? (
    <KeyboardDoubleArrowRightIcon />
  ) : (
    <KeyboardDoubleArrowLeftIcon />
  )

  return (
    <PageWrapper>
      <Box sx={styles.header}>
        <StatusChip status={cooperationStatus} />
        <TitleWithDescription
          key={crypto.randomUUID()}
          style={styles.cooperationTitle}
          title={cooperation.title}
        />
      </Box>
      <Box sx={styles.tabsWrapper}>
        <TabNavigation<CooperationTabsEnum, MyCooperationsTabsData>
          activeTab={activeTab}
          handleClick={handleClick}
          sx={styles.tabs}
          tabsData={tabsData}
        />
        <Box onClick={handleNotesClick} sx={styles.banner(isNotesOpen)}>
          <Button
            disableRipple
            size='sm'
            startIcon={iconConditionals}
            sx={styles.notes(isNotesOpen)}
            variant='text-secondary'
          >
            {t('cooperationsPage.details.notes')}
          </Button>
        </Box>
      </Box>
      {activeTab === CooperationTabsEnum.Activities && cooperationClosingModal}
      <Box sx={styles.notesBlock}>
        <Box sx={styles.pageContent}>{pageContent()}</Box>
        {!isDesktop && isNotesOpen && (
          <AppDrawer
            anchor={PositionEnum.Right}
            onClose={handleCloseDrawer}
            open={isNotesOpen}
            sx={styles.notesSidebar}
          >
            <CooperationNotes />
          </AppDrawer>
        )}
        {isDesktop && isNotesOpen && <CooperationNotes />}
      </Box>
    </PageWrapper>
  )
}

export default CooperationDetails
