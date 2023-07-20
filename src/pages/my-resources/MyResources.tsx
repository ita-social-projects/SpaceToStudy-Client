import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import Tab from '~/components/tab/Tab'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

import { tabsData } from '~/pages/my-resources/MyResources.constants'
import { styles } from '~/pages/my-resources/MyResources.styles'

const MyResources = () => {
  const [activeTab, setActiveTab] = useState<string>('')
  const { t } = useTranslation()

  const handleClick = (tab: string) => {
    setActiveTab(tab)
  }

  const tabs = Object.keys(tabsData).map((key) => (
    <Tab
      activeTab={activeTab === key}
      key={key}
      onClick={() => handleClick(key)}
    >
      <Box sx={styles.titleBox}>
        {tabsData[key].icon}
        {t(tabsData[key].title)}
      </Box>
    </Tab>
  ))

  const tabContent = activeTab && tabsData[activeTab].title

  return (
    <PageWrapper>
      <Box sx={styles.tabs}>{tabs}</Box>
      {t(tabContent)}
    </PageWrapper>
  )
}

export default MyResources
