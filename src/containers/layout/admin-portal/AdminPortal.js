import { Box } from '@mui/material'
import AdminRoutes from '~/router/routes/AdminRoutes'
import AdminNavBar from './admin-nav-bar/AdminNavBar'

const AdminPortal = () => {
  const styles = {
    container: {
      display: 'flex'
    },
    page: {
      flexGrow: 1
    },
    disableMargin: {
      margin: 0
    }
  }

  return (
    <Box style={ styles.disableMargin } sx={ styles.container }>
      <AdminNavBar />
      <Box sx={ styles.page }>
        <AdminRoutes />
      </Box>
    </Box>
  )
}

export default AdminPortal
