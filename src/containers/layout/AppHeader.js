import { useContext } from 'react'
import { routes } from '~/constants/routes'
import { useTranslation } from 'react-i18next'

import { AppBar, Toolbar, Button, IconButton } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'

import { ModalContext } from '~/context/modal-context'
import NavBar from '~/containers/navbar/NavBar'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'

const style = {
  loginButton: {
    display: { xs: 'none', md: 'inherit' },
    margin: '18px 40px 18px 4px',
  }
}

const AppHeader = () => {
  const { t } = useTranslation()
  const { setModal } = useContext(ModalContext)

  const handleModal = () => {
    setModal(<LoginDialog />)
  }

  return (
    <>
      <AppBar color='common' sx={ { boxShadow: 'primary' } }>
      
        <NavBar navigationItems={ Object.values(routes.guestNavBar) }>
          
          <IconButton onClick={ handleModal } size='large' sx={ { display: { md: 'none' } } }>
            <LoginIcon color='primary' />
          </IconButton>

          <Button
            onClick={ handleModal } size='medium' sx={ style.loginButton }
            variant="contained"
          >
            { t('header.loginButton') }
          </Button>

        </NavBar>

      </AppBar>
      <Toolbar sx={ { height: { xs: '56px', sm: '72px', md: '80px' } } } />
    </>
  )
}

export default AppHeader
