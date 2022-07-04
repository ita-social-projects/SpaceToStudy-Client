import { useTranslation } from 'react-i18next'

import { Box, Button, IconButton } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import MenuIcon from '@mui/icons-material/Menu'
import LoginIcon from '@mui/icons-material/Login'

import { style } from '~/components/header-icons/header-icons.style'

const GuestIcons = ({ openLoginDialog, setIsSidebarOpen }) => {
  const { t } = useTranslation()
    
  return(
    <Box sx={ style.iconBox }>
      <IconButton sx={ style.langIcon }>
        <LanguageIcon color='primary' />
      </IconButton>
      <IconButton onClick={ openLoginDialog } sx={ { display: { md: 'none' } } }>
        <LoginIcon color='primary' />
      </IconButton>
      <Button
        onClick={ openLoginDialog } size='medium' sx={ style.loginButton }
        variant="contained"
      >
        { t('header.loginButton') }
      </Button>
      <IconButton onClick={ () => setIsSidebarOpen(true) } sx={ style.menuIcon }>
        <MenuIcon color='primary' />
      </IconButton>
    </Box>
  )
}

export default GuestIcons
