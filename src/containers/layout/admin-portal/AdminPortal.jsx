import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Loader from '~/components/loader/Loader'
import AdminNavBar from '~/containers/layout/admin-portal/admin-nav-bar/AdminNavBar'

const AdminPortal = () => {
  const styles = {
    container: {
      display: 'flex',
      height: '100vh'
    },
    page: {
      flexGrow: 1
    },
    disableMargin: {
      margin: 0
    }
  }

  return (
    <Box style={styles.disableMargin} sx={styles.container}>
      <AdminNavBar />
      <Box sx={styles.page}>
        <Suspense fallback={<Loader pageLoad />}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  )
}

export default AdminPortal
