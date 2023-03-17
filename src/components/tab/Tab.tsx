import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import useFilter from '~/hooks/table/use-filter'

import { TabsInfoItem } from '~/types/common/types/common.types'
import { styles } from '~/components/tab/Tab.styles'

interface TabProps<V, W> {
  tab: TabsInfoItem<V, W>
  setTab: Dispatch<SetStateAction<V>>
  activeTab: string
}

const Tab = <T, U, V, W>({ tab, setTab, activeTab }: TabProps<V, W>) => {
  const { t } = useTranslation()

  const { clearFilters } = useFilter<T, U>()

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
