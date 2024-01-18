import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

import { useModalContext } from '~/context/modal-context'
import TabNavigation from '~/components/tab-navigation/TabNavigation'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { tabsData } from '~/containers/my-cooperations/cooperation-details/CooperationDetails.constans'
import CooperationFromScratch from '~/containers/cooperation-details/cooperation-from-scratch/CooperationFromScratch'
import CooperationNotes from '~/containers/my-cooperations/cooperation-notes/CooperationNotes'

import { styles } from '~/containers/my-cooperations/cooperation-details/CooperationDetails.styles'

const CooperationDetails = () => {
  const { t } = useTranslation()
  const { isScratch } = useModalContext()
  const [activeTab, setActiveTab] = useState<string>('activities')
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false)

  const handleClick = (tab: string) => {
    setActiveTab(tab)
    setIsNotesOpen(false)
  }

  const handleNotesClick = () => {
    setIsNotesOpen((prevState) => !prevState)
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

  const notesBlock = isNotesOpen && (
    <CooperationNotes isNotesOpen={isNotesOpen} />
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
        {notesBlock}
      </Box>
    </PageWrapper>
  )
}

export default CooperationDetails
