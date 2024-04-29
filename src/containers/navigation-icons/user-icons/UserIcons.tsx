import { useState, useRef, FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import useMenu from '~/hooks/use-menu'
import NavigationIcon from '~/components/navigation-icon/NavigationIcon'
import AccountIcon from '~/containers/navigation-icons/AccountIcon'
import {
  mockNotifications,
  userIcons
} from '~/containers/navigation-icons/NavigationIcons.constants'

import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'
import AccountMenu from '~/containers/layout/account-menu/AccountMenu'
import NotificationsMenu from '~/containers/layout/notifications-menu/NotificationsMenu'
import LanguageMenu from '~/containers/layout/language-menu/LanguageMenu'
import { Notification } from '~/types'

interface UserIconsProps {
  setSidebarOpen: () => void
}

const UserIcons: FC<UserIconsProps> = ({ setSidebarOpen }) => {
  const [notificationItems, setNotificationItems] =
    useState<Notification[]>(mockNotifications)
  const {
    anchorEl: accountMenuAnchorEl,
    openMenu: openAccountMenu,
    closeMenu: closeAccountMenu
  } = useMenu()
  const {
    anchorEl: notificationsAnchor,
    openMenu: openNotifications,
    closeMenu: closeNotifications
  } = useMenu()
  const {
    anchorEl: languageMenuAnchorEl,
    openMenu: openLanguageMenu,
    closeMenu: closeLanguageMenu
  } = useMenu()

  const { t } = useTranslation()

  const anchorRef = useRef<HTMLDivElement | null>(null)

  const icons = userIcons.map(
    (item) =>
      !item.disabled && (
        <NavigationIcon
          badgeContent={item.badgeContent?.({
            notifications: notificationItems.length
          })}
          buttonProps={item.buttonProps({
            openAccountMenu,
            openNotifications,
            setSidebarOpen,
            openLanguageMenu
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
      <LanguageMenu
        anchorEl={languageMenuAnchorEl}
        onClose={closeLanguageMenu}
      />
      <AccountIcon openMenu={openAccountMenu} />
      <AccountMenu anchorEl={accountMenuAnchorEl} onClose={closeAccountMenu} />
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
