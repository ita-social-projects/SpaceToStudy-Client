import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import useFilter from '~/hooks/table/use-filter'

import { styles } from './Tab.styles'

const Tab = ({ tab, setTab, activeTab }) => {
  const { t } = useTranslation()

  const { clearFilters } = useFilter()

  const handleClick = () => {
    clearFilters()
    setTab((prev) => ({ ...prev, [tab.key]: tab.value }))
  }

  return (
    <Box
      key={ tab.value }
      onClick={ handleClick }
      sx={ [styles.defaultTab, tab.value === activeTab && styles.activeTab] }
      typography='subtitle2'
    >
      { t(tab.label) }
    </Box>
  )
}

export default Tab
