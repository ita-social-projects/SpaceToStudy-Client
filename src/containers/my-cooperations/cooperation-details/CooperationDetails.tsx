import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'

import { useModalContext } from '~/context/modal-context'
import TabNavigation from '~/components/tab-navigation/TabNavigation'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { tabsData } from '~/containers/my-cooperations/cooperation-details/CooperationDetails.constans'
import CooperationFromScratch from '~/containers/cooperation-details/cooperation-from-scratch/CooperationFromScratch'

import { styles } from '~/containers/my-cooperations/cooperation-details/CooperationDetails.styles'

const CooperationDetails = () => {
  const { t } = useTranslation()
  const { isScratch } = useModalContext()
  const [activeTab, setActiveTab] = useState<string>('activities')

  const handleClick = (tab: string) => {
    setActiveTab(tab)
  }

  const cooperationContent = activeTab && tabsData[activeTab]?.content

  const pageContent = isScratch ? (
    <CooperationFromScratch />
  ) : (
    cooperationContent
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
        <Box sx={styles.banner}>
          <KeyboardDoubleArrowLeftIcon />
          <Button sx={styles.notes}>
            {t('cooperationsPage.details.notes')}
          </Button>
        </Box>
      </Box>
      {pageContent}
    </PageWrapper>
  )
}

export default CooperationDetails
