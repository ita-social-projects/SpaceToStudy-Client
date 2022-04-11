import { Link } from 'react-router-dom'
import { routes } from '~/constants/routes'
import { useTranslation } from 'react-i18next'

import { Box, Button, IconButton } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'

import Logo from '~/containers/logo/Logo'
import NavBar from '~/containers/navbar/NavBar'
import IconBar from '~/containers/iconbar/IconBar'

const style = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    padding: '8px',
    margin: '8px',
    '@media (min-width: 600px)': {
      margin: '16px'
    },
    '@media (min-width: 900px)': {
      margin: '20px 32px'
    }
  },
  loginIcon: {
    '@media (min-width: 900px)': {
      display: 'none'
    }
  },
  button: {
    display: 'none',
    margin: '18px 40px 18px 4px',
    padding: '10px 16px',
    backgroundColor: 'primary.900',
    opacity: '1',
    '@media (min-width: 900px)': {
      display: 'inherit'
    }
  }
}

const AppHeader = () => {
  const { t } = useTranslation()

  const navbarItems = Object.values(t('header.navbar', { returnObjects: true }))

  return (
    <Box sx={ style.header }>
      
      <Button component={ Link } sx={ style.logo } to={ routes.home }>
        <Logo />
      </Button>
      
      <NavBar navbarItems={ navbarItems } />

      <IconBar>

        <IconButton sx={ style.loginIcon }>
          <LoginIcon />
        </IconButton>

        <Button sx={ style.button } variant="contained">
          { t('header.loginButton') }
        </Button>

      </IconBar>
    </Box>
  )
}

export default AppHeader
