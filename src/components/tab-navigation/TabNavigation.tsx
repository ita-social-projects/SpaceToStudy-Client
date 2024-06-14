import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonProps, SxProps } from '@mui/material'
import Box from '@mui/material/Box'

import Tab from '~/components/tab/Tab'

import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/tab-navigation/TabNavigation.styles'

interface TabNavigationProps<T, U> {
  activeTab: T
  tabsData: U
  handleClick: (tab: T) => void
  sx?: { root?: SxProps; tab?: SxProps }
}

interface BaseTabsData {
  tabProps?: Omit<ButtonProps, 'onClick'>
  title?: string
  icon?: ReactElement
}

const TabNavigation = <T extends string, U extends Record<T, BaseTabsData>>({
  activeTab,
  tabsData,
  handleClick,
  sx
}: TabNavigationProps<T, U>) => {
  const { t } = useTranslation()

  const tabs = Object.keys(tabsData).map((key: string) => {
    const tabKey = key as T
    const { tabProps } = tabsData[tabKey]
    return (
      <Tab
        activeTab={activeTab === tabKey}
        key={tabKey}
        onClick={() => handleClick(tabKey)}
        sx={sx?.tab}
        {...tabProps}
      >
        <Box sx={styles.titleBox}>
          {tabsData[tabKey].icon}
          {t(tabsData[tabKey].title!)}
        </Box>
      </Tab>
    )
  })

  return <Box sx={spliceSx(styles.tabs, sx?.root)}>{tabs}</Box>
}

export default TabNavigation
