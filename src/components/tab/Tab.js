import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import { styles } from './Tab.styles'

const Tab = ({ tab, setTab, activeTab }) => {
  const { t } = useTranslation()

  return (
    <Box
      key={ tab.value }
      onClick={ () => setTab({ [tab.key]: tab.value }) }
      sx={ [styles.defaultTab, tab.value === activeTab && styles.activeTab] }
      typography='subtitle2'
    >
      { t(tab.label) }
    </Box>
  )
}

export default Tab
