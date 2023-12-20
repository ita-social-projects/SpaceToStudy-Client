import React from 'react'
import { useTranslation } from 'react-i18next'
import { SxProps } from '@mui/material'
import Box from '@mui/material/Box'

import Tab from '~/components/tab/Tab'

import { QuizTabsData } from '~/pages/new-quiz/NewQuiz.constants'
import { MyResoursesTabsData } from '~/pages/my-resources/MyResources.constants'
import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/tab-navigation/TabNavigation.styles'

interface TabNavigationProps {
  activeTab: string
  tabsData: QuizTabsData | MyResoursesTabsData
  handleClick: (tab: string) => void
  sx?: { root?: SxProps; tab?: SxProps }
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  tabsData,
  handleClick,
  sx
}) => {
  const { t } = useTranslation()

  const tabs = Object.keys(tabsData).map((key) => {
    const { tabProps } = tabsData[key]
    return (
      <Tab
        activeTab={activeTab === key}
        key={key}
        onClick={() => handleClick(key)}
        sx={sx?.tab}
        {...tabProps}
      >
        <Box sx={styles.titleBox}>
          {tabsData[key].icon}
          {t(tabsData[key].title)}
        </Box>
      </Tab>
    )
  })

  return <Box sx={spliceSx(sx?.root, styles.tabs)}>{tabs}</Box>
}

export default TabNavigation
