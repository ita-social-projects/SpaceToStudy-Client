import { routes } from '~/constants/routes'
import { useTranslation } from 'react-i18next'

import { AppBar, Box, Button, IconButton } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'

import NavBar from '~/containers/navbar/NavBar'

const style = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: { xl: '100%' },
    maxWidth: '1536px',
    margin: { xs: '0', xl: 'auto' }, 
    padding: '0px'
  },
  loginIcon: {
    display: { md: 'none' }
  },
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

  return (
    <AppBar color='common' >
      <Box sx={ style.header }>
        <NavBar guestNavBarRoutes={ guestNavBarRoutes } guestNavBarTransations={ guestNavBarTransations } >
          
          <IconButton sx={ style.loginIcon }>
            <LoginIcon />
          </IconButton>

          <Button sx={ style.loginButton } variant="contained">
            { t('header.loginButton') }
          </Button>

        </NavBar>
      </Box>
    </AppBar>
  )
}

export default AppHeader
