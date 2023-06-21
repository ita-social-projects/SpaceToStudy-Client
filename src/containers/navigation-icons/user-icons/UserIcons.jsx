import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LanguageIcon from '@mui/icons-material/Language'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MessageRoundedIcon from '@mui/icons-material/MessageRounded'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

import useBreakpoints from '~/hooks/use-breakpoints'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { tutorRoutes } from '~/router/constants/tutorRoutes'
import { authRoutes } from '~/router/constants/authRoutes'
import { student } from '~/constants'

import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

const UserIcons = ({ setSidebarOpen }) => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)
  const anchorRef = useRef(null)
  const { userRole } = useSelector((state) => state.appMain)
  const { isMobile } = useBreakpoints()

  const openMenu = () => setAnchorEl(anchorRef.current)
  const closeMenu = () => setAnchorEl(null)

  const menuList =
    userRole === student
      ? Object.values(studentRoutes.accountMenu).map((item) => {
          return (
            <MenuItem
              component={Link}
              key={item.path}
              onClick={closeMenu}
              sx={styles.menuItem}
              to={item.path}
            >
              {t(`header.${item.route}`)}
            </MenuItem>
          )
        })
      : Object.values(tutorRoutes.accountMenu).map((item) => {
          return (
            <MenuItem
              component={Link}
              key={item.path}
              onClick={closeMenu}
              sx={styles.menuItem}
              to={item.path}
            >
              {t(`header.${item.route}`)}
            </MenuItem>
          )
        })

  return (
    <Box ref={anchorRef} sx={styles.iconBox}>
      <Tooltip arrow title={t('iconsTooltip.language')}>
        <Box>
          <IconButton disabled size='large' sx={styles.langIcon}>
            <LanguageIcon color='disabled' />
          </IconButton>
        </Box>
      </Tooltip>

      <Tooltip arrow title={t('iconsTooltip.messages')}>
        <IconButton
          component={Link}
          sx={styles.studentIcons}
          to={authRoutes.chat.path}
        >
          <MessageRoundedIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={t('iconsTooltip.bookmarks')}>
        <Box>
          <IconButton disabled sx={styles.studentIcons}>
            <BookmarkIcon color='disabled' />
          </IconButton>
        </Box>
      </Tooltip>

      <Tooltip arrow title={t('iconsTooltip.notifications')}>
        <Box>
          <IconButton disabled sx={styles.studentIcons}>
            <NotificationsRoundedIcon color='disabled' />
          </IconButton>
        </Box>
      </Tooltip>

      {!isMobile && (
        <Tooltip arrow title={t('iconsTooltip.account')}>
          <IconButton onClick={openMenu}>
            <AccountCircleOutlinedIcon color='primary' />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip arrow title={t('iconsTooltip.menu')}>
        <IconButton onClick={setSidebarOpen} sx={styles.menuIcon}>
          <MenuIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        onClose={closeMenu}
        open={!!anchorEl}
        sx={styles.accountMenu}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {menuList}
      </Menu>
    </Box>
  )
}

export default UserIcons
