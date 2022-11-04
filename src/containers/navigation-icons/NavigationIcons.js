import { useContext, useCallback } from 'react'
import { useSelector } from 'react-redux'

import GuestIcons from '~/containers/navigation-icons/guest-icons/GuestIcons'
import AdminIcons from './admin-icons/AdminIcons'
import StudentIcons from '~/containers/navigation-icons/student-icons/StudentIcons'
import { ModalContext } from '~/context/modal-context'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import { admin, student } from '~/constants'

const NavigationIcons = ({ setIsSidebarOpen }) => {
  const { userRole } = useSelector((state) => state.appMain)
  const { openModal } = useContext(ModalContext)

  const openLoginDialog = useCallback(() => {
    openModal({ component: <LoginDialog /> })
  }, [openModal])

  if (userRole === student) return <StudentIcons setIsSidebarOpen={ setIsSidebarOpen } />
  if (userRole === admin) return <AdminIcons />

  return <GuestIcons openLoginDialog={ openLoginDialog } setIsSidebarOpen={ setIsSidebarOpen } />
}

export default NavigationIcons
