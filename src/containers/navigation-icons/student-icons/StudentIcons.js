import { useState } from 'react'
import { Link } from 'react-router-dom'
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
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { guestRoutes } from '~/router/constants/guestRoutes'
import { studentRoutes } from '~/router/constants/studentRoutes'

import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

const StudentIcons = ({ setIsSidebarOpen }) => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = (e) => setAnchorEl(e.currentTarget)
  const closeMenu = (e) => setAnchorEl(null)

  const menuList = Object.values(studentRoutes.accountMenu).map((item) => {
    return (
      <MenuItem
        component={ Link } key={ Math.random() } onClick={ closeMenu }
        sx={ styles.menuItem } to={ item.route }
      >
        { t(`header.${item.label}`) }
      </MenuItem>
    )
  })

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
        <IconButton onClick={ openMenu }>
          <AccountCircleOutlinedIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={ t('iconsTooltip.menu') }>
        <IconButton onClick={ () => setIsSidebarOpen(true) } sx={ styles.menuIcon }>
          <MenuIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={ anchorEl }
        anchorOrigin={ {
          vertical: 'bottom',
          horizontal: 'right'
        } }
        onClose={ closeMenu }
        open={ !!anchorEl }
        sx={ styles.accountMenu }
        transformOrigin={ {
          vertical: 'top',
          horizontal: 'right'
        } }
      >
        { menuList }
      </Menu>
    </Box>
  )
}

export default StudentIcons
