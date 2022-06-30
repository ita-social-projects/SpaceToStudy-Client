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

const style = {
  iconBox: {
    mr: { xs: '14px', sm: '20px', md:'32px' },
    display: 'flex',
    alignItems: 'center',
    '&>.MuiIconButton-root': {
      p: { sm: '12px', md: '7px', lg: '12px' },
    },
  },
  loginButton: {
    display: { xs: 'none', md: 'inherit' },
    margin: '18px 10px',
  },
  langIcon: { display: { xs: 'none', sm: 'inherit' } },
  menuIcon: { display: { md: 'none' } },
  sudentIcons: { display: { xs: 'none', md: 'inherit' } }
}


const HeaderIcons = ({ openLoginDialog, setIsSidebarOpen }) => {
  const { t } = useTranslation()
  const { loading, userRole } = useSelector((state) => state.appMain)
    

  if (loading) {
    return(<Loader />)
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
