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
  const activeTab =
    (searchParams.get('tab') as ResourcesTabsEnum) || ResourcesTabsEnum.Lessons

  const { t } = useTranslation()

  const handleClick = (tab: ResourcesTabsEnum) => {
    setSearchParams({ tab })
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
