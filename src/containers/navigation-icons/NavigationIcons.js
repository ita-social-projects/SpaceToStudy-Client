import { useContext, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Button, IconButton } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import MessageRoundedIcon from '@mui/icons-material/MessageRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

import Loader from '~/components/loader/Loader'
import IconsBox from '~/components/icons-box/IconsBox'
import { ModalContext } from '~/context/modal-context'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'

export const style = {
  loginButton: {
    display: { xs: 'none', md: 'inherit' },
    margin: '18px 10px',
  },
  loginIcon: { display: { md: 'none' } },
  sudentIcons: { display: { xs: 'none', md: 'inherit' } }
}

const HeaderIcons = ({ setIsSidebarOpen }) => {
  const { t } = useTranslation()
  const { loading, userRole } = useSelector((state) => state.appMain)
  const { setModal } = useContext(ModalContext)
  
  const openLoginDialog = useCallback(() => {
    setModal(<LoginDialog />)
  }, [setModal]) 

  const guestIcons = (
    <>
      <IconButton onClick={ openLoginDialog } sx={ style.loginIcon }>
        <LoginIcon color='primary' />
      </IconButton>
      <Button
        onClick={ openLoginDialog } size='medium' sx={ style.loginButton }
        variant="contained"
      >
        { t('header.loginButton') }
      </Button>
    </>
  )
  const studentIcons = (
    <>
      <IconButton sx={ style.sudentIcons } >
        <MessageRoundedIcon color='primary' />
      </IconButton>
      <IconButton sx={ style.sudentIcons }  >
        <FavoriteRoundedIcon color='primary' />
      </IconButton>
      <IconButton sx={ style.sudentIcons }  >
        <NotificationsRoundedIcon color='primary' />
      </IconButton>
      <IconButton >
        <AccountCircleOutlinedIcon color='primary' />
      </IconButton>
    </>
  )
    

  if (loading) {
    return (<Loader size={ 20 } />)
  }
  if (userRole === 'student') {
    return (<IconsBox child={ studentIcons } setIsSidebarOpen={ setIsSidebarOpen } />)
  } else {
    return (<IconsBox child={ guestIcons } setIsSidebarOpen={ setIsSidebarOpen } />)
  }
  
}

export default HeaderIcons
