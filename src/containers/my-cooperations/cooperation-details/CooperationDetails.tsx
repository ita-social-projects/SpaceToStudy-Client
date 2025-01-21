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
import AppButton from '~/components/app-button/AppButton'

import useQuery from '~/hooks/use-query'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'

import CooperationActivities from '~/containers/cooperation-details/cooperation-activities/CooperationActivities'
import CooperationNotes from '~/containers/my-cooperations/cooperation-notes/CooperationNotes'
import CooperationActivitiesView from '~/containers/cooperation-details/cooperation-activities-view/CooperationActivitiesView'
import {
  tabsData,
  defaultResponse,
  MyCooperationsTabsData
} from '~/containers/my-cooperations/cooperation-details/CooperationDetails.constants'
import { styles } from '~/containers/my-cooperations/cooperation-details/CooperationDetails.styles'

import { errorRoutes } from '~/router/constants/errorRoutes'
import { cooperationService } from '~/services/cooperation-service'

import {
  CooperationTabsEnum,
  PositionEnum,
  SizeEnum,
  ButtonVariantEnum,
  StatusEnum
} from '~/types'
import {
  cooperationsSelector,
  setCooperationSections,
  setCooperationStatus,
  setIsActivityCreated
} from '~/redux/features/cooperationsSlice'
import AcceptCooperationClosing from '~/containers/my-cooperations/accept-cooperation-close/AcceptCooperationClosing'

const CooperationDetails = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { id = '' } = useParams()
  const { isDesktop } = useBreakpoints()
  const { isActivityCreated } = useAppSelector(cooperationsSelector)
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [isClosed, setIsClosed] = useState<boolean>(false)
  const { userRole } = useAppSelector((state) => state.appMain)
  const cooperationStatus = useAppSelector((state) => state.cooperations.status)

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

  const getCooperation = useCallback(
    () => cooperationService.getCooperationById(id),
    [id]
  )

  const { data, isLoading, isError } = useQuery({
    queryFn: getCooperation,
    queryKey: ['cooperation', id],
    options: {
      initialData: defaultResponse
    }
  })

  useEffect(() => {
    if (isError) {
      navigate(errorRoutes.notFound.path)
    }
  }, [isError, navigate])

  useEffect(() => {
    dispatch(setCooperationSections(data.sections))
    dispatch(setCooperationStatus(data.status))
    setEditMode(Boolean(data?.sections?.length))
  }, [data.sections, data.status, dispatch])

  const handleEditMode = useCallback(() => {
    setEditMode((prev) => !prev)
    dispatch(setIsActivityCreated(true))
  }, [dispatch])

  const handleCooperationStatusUpdate = useCallback(async () => {
    await cooperationService.updateCooperation({
      _id: id,
      status: StatusEnum.Closed
    })
    setIsClosed(true)
    dispatch(setCooperationStatus(StatusEnum.Closed))
  }, [id, dispatch])

  const handleCooperationCloseAccept = useCallback(() => {
    void handleCooperationStatusUpdate()
  }, [handleCooperationStatusUpdate])

  if (isLoading) {
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
    data.needAction === data.receiverRole ? data.initiator : data.receiver

  const acceptClosingProcess = !isClosed && (
    <AcceptCooperationClosing
      isReasonSubmitted={false}
      onAccept={handleCooperationCloseAccept}
      onReasonSubmit={() => {}}
      user={closeCooperationInitiator.firstName}
    />
  )

  const isCooperationClosingRequestSend =
    data.needAction === userRole && data.status === StatusEnum.RequestToClose

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
          title={data.title}
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
          {iconConditionals}
          <AppButton
            disableRipple
            size={SizeEnum.Small}
            sx={styles.notes(isNotesOpen)}
            variant={ButtonVariantEnum.Base}
          >
            {t('cooperationsPage.details.notes')}
          </AppButton>
        </Box>
      </Box>
      {activeTab === CooperationTabsEnum.Activities &&
        isCooperationClosingRequestSend &&
        acceptClosingProcess}
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
