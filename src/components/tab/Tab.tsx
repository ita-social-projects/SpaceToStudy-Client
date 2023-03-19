import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import useFilter from '~/hooks/table/use-filter'

import { TabsInfoItem, ExternalFilter, Options } from '~/types/common/types/common.types'
import { styles } from '~/components/tab/Tab.styles'

interface TabProps<U> {
  tab: TabsInfoItem<Options<U>>
  setTab: Dispatch<SetStateAction<ExternalFilter>>
  activeTab: string
}

const Tab = <T, U>({ tab, setTab, activeTab }: TabProps<U>) => {
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
