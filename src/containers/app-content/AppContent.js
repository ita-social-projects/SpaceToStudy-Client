import { Box } from '@mui/material'
import AppHeader from '~/containers/layout/app-header/AppHeader'
import AppMain from '~/containers/layout/app-main/AppMain'
import ScrollToTop from '~/components/scroll-to-top/ScrollToTop'
import Footer from '~/containers/layout/footer/Footer'

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    '.MuiToolbar-root + div': {
      flexGrow: 1,
      mt: {
        md: '16px',
        sm: '8px',
        xs: '0px'
      }
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
