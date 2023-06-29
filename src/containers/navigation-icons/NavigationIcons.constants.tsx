import { Link } from 'react-router-dom'
import LanguageIcon from '@mui/icons-material/Language'
import MenuIcon from '@mui/icons-material/Menu'
import LoginIcon from '@mui/icons-material/Login'
import MessageRoundedIcon from '@mui/icons-material/MessageRounded'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { IconButtonProps } from '@mui/material/IconButton'

import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

type ButtonProps = (props: {
  openLoginDialog?: () => void
  openMenu?: () => void
  setSidebarOpen?: () => void
  openNotifications?: () => void
}) => IconButtonProps

type BadgeContent = (props: { notifications: number }) => number

interface NavigationIconButton {
  disabled?: boolean
  tooltip: string
  icon: React.ReactElement
  buttonProps: ButtonProps
  badgeContent?: BadgeContent
}

const languageIcon = {
  disabled: true,
  tooltip: 'iconsTooltip.language',
  icon: <LanguageIcon color='disabled' />,
  buttonProps: () => ({ sx: styles.studentIcons })
}

const menuIcon: NavigationIconButton = {
  tooltip: 'iconsTooltip.menu',
  icon: <MenuIcon color='primary' />,
  buttonProps: ({ setSidebarOpen }) => ({
    onClick: setSidebarOpen,
    sx: styles.showOnlyOnMobile
  })
}

export const guestIcons: NavigationIconButton[] = [
  languageIcon,
  {
    tooltip: 'iconsTooltip.login',
    icon: <LoginIcon color='primary' />,
    buttonProps: ({ openLoginDialog }) => ({
      onClick: openLoginDialog,
      sx: styles.showOnlyOnMobile
    })
  },
  menuIcon
]

export const userIcons: NavigationIconButton[] = [
  languageIcon,
  {
    tooltip: 'iconsTooltip.messages',
    icon: <MessageRoundedIcon color='primary' />,
    buttonProps: () => ({
      component: Link,
      sx: styles.studentIcons,
      to: authRoutes.chat.path
    })
  },
  {
    disabled: true,
    tooltip: 'iconsTooltip.bookmarks',
    icon: <BookmarkIcon color='disabled' />,
    buttonProps: () => ({ sx: styles.studentIcons })
  },
  {
    tooltip: 'iconsTooltip.notifications',
    badgeContent: ({ notifications }) => notifications,
    icon: <NotificationsRoundedIcon color='primary' />,
    buttonProps: ({ openNotifications }) => ({
      onClick: openNotifications,
      sx: styles.studentIcons
    })
  },
  {
    tooltip: 'iconsTooltip.account',
    icon: <AccountCircleOutlinedIcon color='primary' />,
    buttonProps: ({ openMenu }) => ({
      onClick: openMenu,
      sx: styles.studentIcons
    })
  },
  menuIcon
]

export const mockNotifications = [
  { _id: '1', type: 'NEW_COOPERATION', createdAt: '', updatedAt: '' },
  { _id: '2', type: 'NEW_COMMENT', createdAt: '', updatedAt: '' },
  { _id: '3', type: 'UPDATE_COOPERATION', createdAt: '', updatedAt: '' },
  { _id: '4', type: 'ACCEPT_COOPERATION', createdAt: '', updatedAt: '' },
  { _id: '5', type: 'CANCEL_COOPERATION', createdAt: '', updatedAt: '' }
]
