import { Box } from '@mui/material'
import AppHeader from '~/containers/layout/AppHeader'
import AppMain from '~/containers/layout/AppMain'
import ScrollToTop from '~/components/scroll-to-top/ScrollToTop'
import Footer from '~/containers/footer/Footer'

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    '.MuiToolbar-root + div': {
      flexGrow: 1
    }
  }
}

const AppContent = () => {
  return (
    <Box data-testid='AppContent' sx={ styles.content }>
      <AppHeader />
      <AppMain />
      <ScrollToTop />
      <Footer />
    </Box>
  )
}

export default AppContent
