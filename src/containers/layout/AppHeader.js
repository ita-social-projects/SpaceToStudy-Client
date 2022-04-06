import { routes } from '~/constants/routes'
import { useTranslation } from 'react-i18next'

import { AppBar, Button, IconButton } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'

import NavBar from '~/containers/navbar/NavBar'

const style = {
  loginButton: {
    display: { xs: 'none', md: 'inherit' },
    margin: '18px 40px 18px 4px',
    padding: '10px 16px',
    backgroundColor: 'primary.900',
    opacity: '1',
  }
}

const AppHeader = () => {
  const { t } = useTranslation()

  const guestNavBarTransations = Object.values(t('header.navbar', { returnObjects: true }))
  const guestNavBarRoutes = Object.values(routes.guestNavBar)

  const navigationItems = []
  for ( let i = 0; i < guestNavBarTransations.length; i++ ) {
    navigationItems.push([guestNavBarTransations[i], guestNavBarRoutes[i]])
  }
  
  return (
    <AppBar color='common' >
      <NavBar navigationItems={ navigationItems }>
          
        <IconButton sx={ { display: { md: 'none' } } }>
          <LoginIcon />
        </IconButton>

        <Button sx={ style.loginButton } variant="contained">
          { t('header.loginButton') }
        </Button>

      </NavBar>
    </AppBar>
  )
}

export default AppHeader
