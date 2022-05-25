import { routes } from '~/constants/routes'
import { useTranslation } from 'react-i18next'

import { AppBar, Toolbar, Button, IconButton } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'

import NavBar from '~/containers/navbar/NavBar'

const style = {
  loginButton: {
    display: { xs: 'none', md: 'inherit' },
    margin: '18px 40px 18px 4px',
  }
}

const AppHeader = () => {
  const { t } = useTranslation()

  return (
    <>
      <AppBar color='common'>

        <NavBar navigationItems={ Object.values(routes.guestNavBar) }>
          
          <IconButton sx={ { display: { md: 'none' } } }>
            <LoginIcon />
          </IconButton>

          <Button size='medium' sx={ style.loginButton } variant="contained">
            { t('header.loginButton') }
          </Button>

        </NavBar>

      </AppBar>
      <Toolbar sx={ { height: { xs: '56px', sm: '72px', md: '80px' } } } />
    </>
  )
}

export default AppHeader
