import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import useFilter from '~/hooks/table/use-filter'

import { styles } from '~/components/tab/Tab.styles'
import { ExternalFilter, Options, TabsInfoItem } from '~/types'

interface TabProps<Filters> {
  tab: TabsInfoItem<Options<Filters>>
  setTab: Dispatch<SetStateAction<ExternalFilter>>
  activeTab: string
}

const Tab = <Entity, Filters>({
  tab,
  setTab,
  activeTab
}: TabProps<Filters>) => {
  const { t } = useTranslation()

  const { clearFilters } = useFilter<Entity, Filters>()

  const handleClick = () => {
    clearFilters()
    setTab((prev) => ({ ...prev, [tab.key]: tab.value }))
  }

  return (
    <Box
      key={tab.value}
      onClick={handleClick}
      sx={[styles.defaultTab, tab.value === activeTab && styles.activeTab]}
      typography='subtitle2'
    >
      {t(tab.label)}
    </Box>
  )
}

export default Tab
