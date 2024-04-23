import { Link } from 'react-router-dom'

import LanguageIcon from '@mui/icons-material/Language'
import MenuIcon from '@mui/icons-material/Menu'
import LoginIcon from '@mui/icons-material/Login'
import MessageRoundedIcon from '@mui/icons-material/MessageRounded'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'

import { IconButtonProps } from '@mui/material/IconButton'

import { authRoutes } from '~/router/constants/authRoutes'
import { NotificationTypeEnums } from '~/types'
import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

type ButtonProps = (props: {
  openLoginDialog?: () => void
  openAccountMenu?: (event: React.MouseEvent<HTMLButtonElement>) => void
  setSidebarOpen?: () => void
  openNotifications?: (event: React.MouseEvent<HTMLButtonElement>) => void
  openLanguageMenu?: (event: React.MouseEvent<HTMLButtonElement>) => void
}) => IconButtonProps

type BadgeContent = (props: { notifications: number }) => number

interface NavigationIconButton {
  disabled?: boolean
  tooltip: string
  icon: React.ReactElement
  buttonProps: ButtonProps
  badgeContent?: BadgeContent
}

const languageIcon: NavigationIconButton = {
  tooltip: 'iconsTooltip.language',
  icon: <LanguageIcon />,
  buttonProps: ({ openLanguageMenu }) => ({
    onClick: openLanguageMenu,
    sx: styles.studentIcons
  })
}

const menuIcon: NavigationIconButton = {
  tooltip: 'iconsTooltip.menu',
  icon: <MenuIcon />,
  buttonProps: ({ setSidebarOpen }) => ({
    onClick: setSidebarOpen,
    sx: styles.showOnlyOnMobile
  })
}

export const guestIcons: NavigationIconButton[] = [
  languageIcon,
  {
    tooltip: 'iconsTooltip.login',
    icon: <LoginIcon />,
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
    icon: <MessageRoundedIcon />,
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
    icon: <NotificationsRoundedIcon />,
    buttonProps: ({ openNotifications }) => ({
      onClick: openNotifications,
      sx: styles.studentIcons
    })
  },
  menuIcon
]

export const mockNotifications = [
  {
    _id: '1',
    type: NotificationTypeEnums.AcceptCooperation,
    createdAt: '',
    updatedAt: ''
  },
  {
    _id: '2',
    type: NotificationTypeEnums.CancelCooperation,
    createdAt: '',
    updatedAt: ''
  },
  {
    _id: '3',
    type: NotificationTypeEnums.NewComment,
    createdAt: '',
    updatedAt: ''
  },
  {
    _id: '4',
    type: NotificationTypeEnums.NewCooperation,
    createdAt: '',
    updatedAt: ''
  },
  {
    _id: '5',
    type: NotificationTypeEnums.UpdateCooperation,
    createdAt: '',
    updatedAt: ''
  }
]
