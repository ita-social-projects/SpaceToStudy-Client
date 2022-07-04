import { useContext, useCallback } from 'react'
import { useSelector } from 'react-redux'

import Loader from '~/components/loader/Loader'
import GuestIcons from '~/components/header-icons/GuestIcons'
import StudentIcons from '~/components/header-icons/StudentIcons'
import { ModalContext } from '~/context/modal-context'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'


const HeaderIcons = ({ setIsSidebarOpen }) => {
  const { loading, userRole } = useSelector((state) => state.appMain)
  const { setModal } = useContext(ModalContext)
  
  const openLoginDialog = useCallback(() => {
    setModal(<LoginDialog />)
  }, [setModal]) 
    

  if (loading) return(<Loader size={ 20 } />)
  
  if (userRole === 'student') return(<StudentIcons setIsSidebarOpen={ setIsSidebarOpen } />)
  
  return (<GuestIcons openLoginDialog={ openLoginDialog }  setIsSidebarOpen={ setIsSidebarOpen } />)
  
}

export default HeaderIcons
