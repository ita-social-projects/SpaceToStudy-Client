import { useState } from 'react'
import Box from '@mui/material/Box'

import Tab from '~/components/tab/Tab'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

import { listDataMock } from '~/pages/my-resources/MyResources.constants'

import { styles } from '~/pages/my-resources/MyResources.styles'

const MyResources = () => {
  const [activeTab, setActiveTab] = useState<string>('')

  const handleClick = (tab: string) => {
    setActiveTab(tab === activeTab ? '' : tab)
  }

  const tabs = Object.keys(listDataMock).map((key) => (
    <Tab
      activeTab={activeTab === key}
      key={key}
      onClick={() => handleClick(key)}
    >
      <Box sx={styles.titleBox}>
        {listDataMock[key].icon}
        {listDataMock[key].title}
      </Box>
    </Tab>
  ))

  const content = activeTab && listDataMock[activeTab].title

  return (
    <PageWrapper>
      <Box sx={styles.tabs}>{tabs}</Box>
      {content}
    </PageWrapper>
  )
}

export default MyResources
