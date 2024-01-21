import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

import { useModalContext } from '~/context/modal-context'
import useBreakpoints from '~/hooks/use-breakpoints'

import AppDrawer from '~/components/app-drawer/AppDrawer'
import TabNavigation from '~/components/tab-navigation/TabNavigation'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { tabsData } from '~/containers/my-cooperations/cooperation-details/CooperationDetails.constans'
import CooperationFromScratch from '~/containers/cooperation-details/cooperation-from-scratch/CooperationFromScratch'
import CooperationNotes from '~/containers/my-cooperations/cooperation-notes/CooperationNotes'
import { PositionEnum } from '~/types'

import { styles } from '~/containers/my-cooperations/cooperation-details/CooperationDetails.styles'

const CooperationDetails = () => {
  const { t } = useTranslation()
  const { isScratch } = useModalContext()
  const { isDesktop } = useBreakpoints()
  const [activeTab, setActiveTab] = useState<string>('activities')
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const handleClick = (tab: string) => {
    setActiveTab(tab)
  }

  const handleNotesClick = () => {
    setIsNotesOpen((prevState) => !prevState)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsNotesOpen(false)
    setIsDrawerOpen(false)
  }

  const cooperationContent = activeTab && tabsData[activeTab]?.content

  const pageContent = isScratch ? (
    <CooperationFromScratch />
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
      <Box sx={styles.tabsWrapper}>
        <TabNavigation
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
        <Box sx={styles.pageContent}>{pageContent}</Box>
        {!isDesktop && isNotesOpen && (
          <AppDrawer
            anchor={PositionEnum.Right}
            onClose={handleCloseDrawer}
            open={isDrawerOpen}
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
