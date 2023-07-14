import Box from '@mui/material/Box'

import AppHeader from '~/containers/layout/app-header/AppHeader'
import AppMain from '~/containers/layout/app-main/AppMain'
import { styles } from '~/containers/app-content/AppContent.styles'

const AppContent = () => {
  return (
    <Box data-testid='AppContent' sx={styles.root}>
      <AppHeader />
      <AppMain />
    </Box>
  )
}

export default AppContent
