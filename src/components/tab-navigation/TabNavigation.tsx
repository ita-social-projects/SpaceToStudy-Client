import React from 'react'
import { useTranslation } from 'react-i18next'

import Tab from '~/components/tab/Tab'
import Box from '@mui/material/Box'

import { styles } from '~/components/tab-navigation/TabNavigation.style'
import { QuizTabsData } from '~/pages/new-quiz/NewQuiz.constants'

interface TabNavigationProps {
  activeTab: string
  tabsData: QuizTabsData
  handleClick: (tab: string) => void
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  tabsData,
  handleClick
}) => {
  const { t } = useTranslation()

  const tabs = Object.keys(tabsData).map((key) => {
    const { tabProps } = tabsData[key]
    return (
      <Tab
        activeTab={activeTab === key}
        key={key}
        onClick={() => handleClick(key)}
        {...tabProps}
      >
        <Box sx={styles.titleBox}>
          {tabsData[key].icon}
          {t(tabsData[key].title)}
        </Box>
      </Tab>
    )
  })

  return <Box sx={styles.tabs}>{tabs}</Box>
}

export default TabNavigation
