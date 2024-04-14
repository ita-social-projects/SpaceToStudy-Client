import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Typography from '@mui/material/Typography'

import {
  MyResourcesTabsData,
  tabsData
} from '~/pages/my-resources/MyResources.constants'
import { styles } from '~/pages/my-resources/MyResources.styles'
import TabNavigation from '~/components/tab-navigation/TabNavigation'

import { ResourcesTabsEnum } from '~/types'

const MyResources = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') as ResourcesTabsEnum
  const [activeTab, setActiveTab] = useState<ResourcesTabsEnum>(
    initialTab || ResourcesTabsEnum.Lessons
  )

  const { t } = useTranslation()

  useEffect(() => {
    setSearchParams({ tab: activeTab })
  }, [activeTab, setSearchParams])

  const handleClick = (tab: ResourcesTabsEnum) => {
    setActiveTab(tab)
  }

  const tabContent = activeTab && tabsData[activeTab].content

  return (
    <PageWrapper>
      <Typography sx={styles.title}>{t(tabsData[activeTab].title)}</Typography>
      <TabNavigation<ResourcesTabsEnum, MyResourcesTabsData>
        activeTab={activeTab}
        handleClick={handleClick}
        sx={styles.tabs}
        tabsData={tabsData}
      />
      {tabContent}
    </PageWrapper>
  )
}

export default MyResources
