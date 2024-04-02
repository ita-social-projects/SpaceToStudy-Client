import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import { cooperationService } from '~/services/cooperation-service'
import { ResourcesAvailabilityProvider } from '~/context/resources-availability-context'
import { useCooperationContext } from '~/context/cooperation-context'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import TabNavigation from '~/components/tab-navigation/TabNavigation'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CooperationActivities from '~/containers/cooperation-details/cooperation-activities/CooperationActivities'
import Loader from '~/components/loader/Loader'
import StatusChip from '~/components/status-chip/StatusChip'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import CooperationNotes from '~/containers/my-cooperations/cooperation-notes/CooperationNotes'

import { errorRoutes } from '~/router/constants/errorRoutes'
import {
  tabsData,
  defaultResponse,
  MyCooperationsTabsData
} from '~/containers/my-cooperations/cooperation-details/CooperationDetails.constans'
import { styles } from '~/containers/my-cooperations/cooperation-details/CooperationDetails.styles'
import { CooperationTabsEnum, PositionEnum, Cooperation } from '~/types'

const CooperationDetails = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { isActivityCreated } = useCooperationContext()
  const navigate = useNavigate()
  const { isDesktop } = useBreakpoints()
  const [activeTab, setActiveTab] = useState<CooperationTabsEnum>(
    CooperationTabsEnum.Activities
  )
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false)

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

  const pageContent =
    isActivityCreated && activeTab === CooperationTabsEnum.Activities ? (
      <CooperationActivities />
    ) : (
      cooperationContent
    )

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
          <Button disableRipple sx={styles.notes(isNotesOpen)}>
            {t('cooperationsPage.details.notes')}
          </Button>
        </Box>
      </Box>
      <Box sx={styles.notesBlock}>
        <Box sx={styles.pageContent}>
          <ResourcesAvailabilityProvider>
            {pageContent}
          </ResourcesAvailabilityProvider>
        </Box>
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
