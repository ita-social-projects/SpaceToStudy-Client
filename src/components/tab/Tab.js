import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import { TableContext } from '~/context/table-context'

import { styles } from './Tab.styles'

const Tab = ({ tab, setTab, activeTab }) => {
  const { t } = useTranslation()

  const { clearFilters } = useContext(TableContext)

  const handleClick = () => {
    clearFilters()
    setTab({ [tab.key]: tab.value })
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
