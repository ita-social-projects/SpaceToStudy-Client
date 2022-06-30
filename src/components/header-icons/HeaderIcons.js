import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Box, Button, IconButton } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import MenuIcon from '@mui/icons-material/Menu'
import LoginIcon from '@mui/icons-material/Login'
import MessageRoundedIcon from '@mui/icons-material/MessageRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

import Loader from '~/components/loader/Loader'
import { style } from '~/components/header-icons/header-icons.style'


const HeaderIcons = ({ openLoginDialog, setIsSidebarOpen }) => {
  const { t } = useTranslation()
  const { loading, userRole } = useSelector((state) => state.appMain)
    

  if (loading) {
    return(<Loader size={ 20 } />)
  }
  
  if (userRole === 'student') {
    return (
      <Box sx={ style.iconBox }>
        <IconButton size='large' sx={ style.langIcon }>
          <LanguageIcon color='primary' />
        </IconButton>
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
        <IconButton onClick={ () => setIsSidebarOpen(true) } sx={ style.menuIcon }>
          <MenuIcon color='primary' />
        </IconButton>
      </Box>
    )
  }
  
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

export default HeaderIcons
