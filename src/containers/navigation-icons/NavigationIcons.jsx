import { useContext, useCallback } from 'react'
import { useSelector } from 'react-redux'

import GuestIcons from '~/containers/navigation-icons/guest-icons/GuestIcons'
import AdminIcons from './admin-icons/AdminIcons'
import UserIcons from '~/containers/navigation-icons/user-icons/UserIcons'
import { ModalContext } from '~/context/modal-context'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import { admin, student, tutor } from '~/constants'

const NavigationIcons = ({ setSidebarOpen }) => {
  const { userRole } = useSelector((state) => state.appMain)
  const { openModal } = useContext(ModalContext)

  const openLoginDialog = useCallback(() => {
    openModal({ component: <LoginDialog /> })
  }, [openModal])

  if (userRole === student || userRole === tutor)
    return <UserIcons setSidebarOpen={setSidebarOpen} />
  if (userRole === admin) return <AdminIcons />

  return (
    <GuestIcons
      openLoginDialog={openLoginDialog}
      setSidebarOpen={setSidebarOpen}
    />
  )
}

export default NavigationIcons
