import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Tab from '~/components/tab/Tab'

import { tabsData } from '~/pages/new-quiz/NewQuiz.constants'
import { styles } from './NewQuiz.styles'

const NewQuiz = () => {
  const [activeTab, setActiveTab] = useState<string>('edit')
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

  const tabContent = activeTab && tabsData[activeTab].content

  return (
    <PageWrapper sx={styles.container}>
      <Box sx={styles.tabs}>{tabs}</Box>
      {tabContent}
    </PageWrapper>
  )
}

export default NewQuiz
