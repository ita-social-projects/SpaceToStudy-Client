import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LanguageIcon from '@mui/icons-material/Language'
import MenuIcon from '@mui/icons-material/Menu'
import MessageRoundedIcon from '@mui/icons-material/MessageRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

import { style } from '~/containers/navigation-icons/NavigationIcons.styles'

const StudentIcons = ({ setIsSidebarOpen }) => {
  const { t } = useTranslation()

  return (
    <Box sx={ style.iconBox }>
      <Tooltip arrow title={ t('iconsTooltip.language') }>
        <IconButton size='large' sx={ style.langIcon }>
          <LanguageIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={ t('iconsTooltip.messages') }>
        <IconButton sx={ style.studentIcons }>
          <MessageRoundedIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={ t('iconsTooltip.favorites') }>
        <IconButton sx={ style.studentIcons }>
          <FavoriteRoundedIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={ t('iconsTooltip.notifications') }>
        <IconButton sx={ style.studentIcons }>
          <NotificationsRoundedIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={ t('iconsTooltip.account') }>
        <IconButton>
          <AccountCircleOutlinedIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={ t('iconsTooltip.menu') }>
        <IconButton onClick={ () => setIsSidebarOpen(true) } sx={ style.menuIcon }>
          <MenuIcon color='primary' />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default StudentIcons
