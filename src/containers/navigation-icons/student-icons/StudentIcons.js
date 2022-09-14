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

import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

const StudentIcons = ({ setIsSidebarOpen }) => {
  const { t } = useTranslation()

  return (
    <Box sx={ styles.iconBox }>
      <Tooltip arrow title={ t('iconsTooltip.language') }>
        <IconButton size='large' sx={ styles.langIcon }>
          <LanguageIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={ t('iconsTooltip.messages') }>
        <IconButton sx={ styles.studentIcons }>
          <MessageRoundedIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={ t('iconsTooltip.favorites') }>
        <IconButton sx={ styles.studentIcons }>
          <FavoriteRoundedIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={ t('iconsTooltip.notifications') }>
        <IconButton sx={ styles.studentIcons }>
          <NotificationsRoundedIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={ t('iconsTooltip.account') }>
        <IconButton>
          <AccountCircleOutlinedIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={ t('iconsTooltip.menu') }>
        <IconButton onClick={ () => setIsSidebarOpen(true) } sx={ styles.menuIcon }>
          <MenuIcon color='primary' />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default StudentIcons
