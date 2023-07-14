import Box from '@mui/material/Box'

import { styles } from '~/containers/app-content/AppContent.styles'
import AppHeader from '~/containers/layout/app-header/AppHeader'
import AppMain from '~/containers/layout/app-main/AppMain'

const AppContent = () => {
  return (
    <Box data-testid='AppContent' sx={styles.root}>
      <AppHeader />
      <AppMain />
    </Box>
  )
}

export default AppContent
