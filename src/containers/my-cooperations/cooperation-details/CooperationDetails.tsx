import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import { AxiosResponse } from 'axios'

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

import useAxios from '~/hooks/use-axios'
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
  Cooperation,
  SizeEnum,
  ButtonVariantEnum
} from '~/types'
import {
  cooperationsSelector,
  setCooperationSections,
  setIsActivityCreated
} from '~/redux/features/cooperationsSlice'

const CooperationDetails = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { id } = useParams()
  const { isDesktop } = useBreakpoints()
  const { isActivityCreated } = useAppSelector(cooperationsSelector) // Why is this needed?
  const [activeTab, setActiveTab] = useState<CooperationTabsEnum>(
    CooperationTabsEnum.Activities
  )
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)

  const responseError = useCallback(
    () => navigate(errorRoutes.notFound.path),
    [navigate]
  )

  const getCooperation = useCallback((): Promise<AxiosResponse> => {
    return cooperationService.getCooperationById(id)
  }, [id])

  const { loading, response } = useAxios<Cooperation, string>({
    service: getCooperation,
    defaultResponse,
    onResponseError: responseError
  })

  useEffect(() => {
    dispatch(setCooperationSections(response.sections))
    setEditMode(Boolean(response?.sections?.length))
  }, [response.sections, dispatch])

  const handleEditMode = useCallback(() => {
    setEditMode((prev) => !prev)
    dispatch(setIsActivityCreated(true))
  }, [dispatch])

  if (loading) {
    return <Loader pageLoad />
  }

  const handleClick = (tab: CooperationTabsEnum) => {
    setActiveTab(tab)
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

  const iconConditionals = isNotesOpen ? (
    <KeyboardDoubleArrowRightIcon />
  ) : (
    <KeyboardDoubleArrowLeftIcon />
  )

  return (
    <PageWrapper>
      <Box>
        <StatusChip status={response.status} />
        <TitleWithDescription
          key={crypto.randomUUID()}
          style={styles.cooperationTitle}
          title={response.title}
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
