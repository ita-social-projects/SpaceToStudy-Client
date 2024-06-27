import Box from '@mui/material/Box'

import AppHeader from '~/containers/layout/app-header/AppHeader'
import AppMain from '~/containers/layout/app-main/AppMain'
import AppSnackbar from '~/containers/layout/app-snackbar/AppSnackbar'
import CookieConsentBanner from '~/containers/cookie-consent-banner/CookieConsentBanner'
import { styles } from '~/containers/app-content/AppContent.styles'

const AppContent = () => {
  return (
    <Box data-testid='AppContent' sx={styles.root}>
      <AppSnackbar />
      <AppHeader />
      <AppMain />
      <CookieConsentBanner />
    </Box>
  )
}

export default AppContent
