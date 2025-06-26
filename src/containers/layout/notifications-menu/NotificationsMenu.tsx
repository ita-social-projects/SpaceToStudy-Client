import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Link from '@mui/material/Link'
import { MenuProps } from '~/design-system/components/menu/Menu'

import { IconButton } from '~/design-system/components/icon-button/IconButton'
import AppMenu from '~/components/app-menu/AppMenu'
import Button from '~scss-components/button/Button'
import { Notification, SizeEnum } from '~/types'
import { styles } from '~/containers/layout/notifications-menu/NotificationsMenu.styles'
import { liksByType } from '~/containers/layout/notifications-menu/NotificationsMenu.constants'

interface NotificationsMenuProps {
  anchorEl: MenuProps['anchorEl']
  onClose: () => void
  items: Notification[]
  onDelete: (item: Notification) => void
  onClear: () => void
}

const NotificationsMenu: FC<NotificationsMenuProps> = ({
  anchorEl,
  items,
  onClear,
  onDelete,
  onClose
}) => {
  const { t } = useTranslation()

  const handleLinkClick = (item: Notification) => {
    onClose()
    onDelete(item)
  }

  const menuItems = items.map((item) => ({
    title: (
      <div data-title='notification-item'>
        <Typography sx={styles.menuWrapper}>
          <Link
            component={RouterLink}
            onClick={() => handleLinkClick(item)}
            sx={styles.link}
            to={liksByType[item.type]}
          >
            {t(`header.notifications.messages.${item.type}`)}
          </Link>
          <IconButton onClick={() => onDelete(item)}>
            <CloseRoundedIcon fontSize={SizeEnum.Small} sx={styles.closeIcon} />
          </IconButton>
        </Typography>
      </div>
    ) as unknown as string,
    onClick: () => {},
    sx: styles.menuItem
  }))

  const menuList = [
    ...menuItems,
    {
      title: (
        <div data-title='clear-button'>
          <Button fullWidth onClick={onClear} variant='text-secondary'>
            {t('header.notifications.clearAll')}
          </Button>
        </div>
      ) as unknown as string,
      onClick: () => {},
      sx: styles.clearButton
    }
  ]

  const emptyNotifications = {
    title: t('header.notifications.emptyNotifications'),
    onClick: () => {},
    sx: styles.empty
  }

  return (
    <AppMenu
      anchorEl={anchorEl}
      maxHeight={264}
      menuList={items.length ? menuList : [emptyNotifications]}
      onClose={onClose}
      // open={Boolean(anchorEl)}
    />
  )
}

export default NotificationsMenu
