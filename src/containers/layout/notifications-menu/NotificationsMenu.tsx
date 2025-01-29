import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Link from '@mui/material/Link'
import { MenuProps } from '@mui/material'

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

  const menuItems = [
    ...items.map((item) => (
      <Typography key={item._id} sx={styles.menuItem}>
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
    )),
    <Button fullWidth key={null} onClick={onClear} variant='text-secondary'>
      {t('header.notifications.clearAll')}
    </Button>
  ]

  const emptyNotifications = (
    <Typography sx={styles.empty}>
      {t('header.notifications.emptyNotifications')}
    </Typography>
  )

  return (
    <AppMenu
      anchorEl={anchorEl}
      maxHeight={264}
      menuList={items.length ? menuItems : emptyNotifications}
      onClose={onClose}
      open={Boolean(anchorEl)}
    />
  )
}

export default NotificationsMenu
