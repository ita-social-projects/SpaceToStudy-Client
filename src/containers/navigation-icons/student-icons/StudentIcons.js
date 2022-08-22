import { Box, IconButton } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import MenuIcon from '@mui/icons-material/Menu'
import MessageRoundedIcon from '@mui/icons-material/MessageRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

import { style } from '~/containers/navigation-icons/navigation-icons.style'

const StudentIcons = ({ setIsSidebarOpen }) => {
  return (
    <Box sx={ style.iconBox }>
      <IconButton size='large' sx={ style.langIcon }>
        <LanguageIcon color='primary' />
      </IconButton>
      <IconButton sx={ style.sudentIcons }>
        <MessageRoundedIcon color='primary' />
      </IconButton>
      <IconButton sx={ style.sudentIcons }>
        <FavoriteRoundedIcon color='primary' />
      </IconButton>
      <IconButton sx={ style.sudentIcons }>
        <NotificationsRoundedIcon color='primary' />
      </IconButton>
      <IconButton>
        <AccountCircleOutlinedIcon color='primary' />
      </IconButton>
      <IconButton onClick={ () => setIsSidebarOpen(true) } sx={ style.menuIcon }>
        <MenuIcon color='primary' />
      </IconButton>
    </Box>
  )
}

export default StudentIcons
