import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { routes } from '~/constants/routes'

const AppHeader = () => {
  const { t } = useTranslation()
  
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          aria-label="menu"
          color="inherit"
          edge="start"
          size="large"
          sx={ { mr: 2 } }
        >
          <MenuIcon />
        </IconButton>
        <Button
          component={ Link } to={ routes.home }
          variant="h6"
        >
          { t('common.title') }
        </Button>
        <Box flexGrow={ 1 } />
        <Button color="inherit" component={ Link } to={ routes.about }>
          { t('common.about') }
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader