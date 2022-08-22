import { useContext, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'

import Loader from '~/components/loader/Loader'
import GuestIcons from '~/containers/navigation-icons/guest-icons/GuestIcons'
import StudentIcons from '~/containers/navigation-icons/student-icons/StudentIcons'
import { ModalContext } from '~/context/modal-context'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'

const NavigationIcons = ({ setIsSidebarOpen }) => {
  const { loading, userRole } = useSelector((state) => state.appMain)
  const { setModal } = useContext(ModalContext)

  const openLoginDialog = useCallback(() => {
    setModal(<LoginDialog />)
  }, [setModal])

  if (loading)
    return (
      <Box sx={ { minWidth: '100px', display: 'flex', justifyContent: 'center' } }>
        <Loader size={ 20 } />
      </Box>
    )

  if (userRole === 'student') return <StudentIcons setIsSidebarOpen={ setIsSidebarOpen } />

  return <GuestIcons openLoginDialog={ openLoginDialog } setIsSidebarOpen={ setIsSidebarOpen } />
}

export default NavigationIcons
