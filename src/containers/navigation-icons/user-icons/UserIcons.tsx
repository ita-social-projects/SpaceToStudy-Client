import { useState, useRef, FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import NavigationIcon from '~/components/navigation-icon/NavigationIcon'
import {
  mockNotifications,
  userIcons
} from '~/containers/navigation-icons/NavigationIcons.constants'

import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'
import AccountMenu from '~/containers/layout/account-menu/AccountMenu'
import NotificationsMenu from '~/containers/layout/notifications-menu/NotificationsMenu'
import { Notification } from '~/types'

interface UserIconsProps {
  setSidebarOpen: () => void
}

const UserIcons: FC<UserIconsProps> = ({ setSidebarOpen }) => {
  const [notificationItems, setNotificationItems] =
    useState<Notification[]>(mockNotifications)
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const [notificationsAnchor, setNotificationsAnchor] =
    useState<HTMLElement | null>(null)
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()

  const openMenu = () => setMenuAnchorEl(anchorRef.current)
  const closeMenu = () => setMenuAnchorEl(null)
  const openNotifications = () => setNotificationsAnchor(anchorRef.current)
  const closeNotifications = () => setNotificationsAnchor(null)

  const icons = userIcons.map(
    (item) =>
      !item.disabled && (
        <NavigationIcon
          badgeContent={
            item.badgeContent &&
            item.badgeContent({ notifications: notificationItems.length })
          }
          buttonProps={item.buttonProps({
            openMenu,
            openNotifications,
            setSidebarOpen
          })}
          icon={item.icon}
          key={item.tooltip}
          tooltip={t(item.tooltip)}
        />
      )
  )

  const handleNotificationDelete = (notification: Notification) => {
    setNotificationItems((prev) =>
      prev.filter((el) => el._id !== notification._id)
    )
  }

  const handleClearNotifications = () => {
    closeNotifications()
    setNotificationItems([])
  }

  return (
    <Box ref={anchorRef} sx={styles.iconBox}>
      {icons}
      <AccountMenu anchorEl={menuAnchorEl} onClose={closeMenu} />
      <NotificationsMenu
        anchorEl={notificationsAnchor}
        items={notificationItems}
        onClear={handleClearNotifications}
        onClose={closeNotifications}
        onDelete={handleNotificationDelete}
      />
    </Box>
  )
}

export default UserIcons
