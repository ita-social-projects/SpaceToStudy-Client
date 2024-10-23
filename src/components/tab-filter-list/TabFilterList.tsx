import { Box, SxProps } from '@mui/material'
import Tab from '~/components/tab/Tab'

import { useTranslation } from 'react-i18next'

import { TabType } from '~/types'

type TabFilterListProps = {
  tabsData: Record<string, TabType<string>>
  activeTab: string
  onClick: (tabName: string, tabValue: string) => void
  sx?: SxProps
}

const TabFilterList = ({
  tabsData,
  activeTab,
  onClick,
  sx
}: TabFilterListProps) => {
  const { t } = useTranslation()

  return (
    <Box sx={sx}>
      {Object.entries(tabsData).map(([tabName, tab]) => (
        <Tab
          activeTab={activeTab === tabName}
          key={tab.label}
          onClick={() => onClick(tabName, tab.value)}
        >
          {t(tab.label)}
        </Tab>
      ))}
    </Box>
  )
}
export default TabFilterList
