import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Link from '@mui/material/Link'

import AppMenu from '~/components/app-menu/AppMenu'
import AppButton from '~/components/app-button/AppButton'
import { authRoutes } from '~/router/constants/authRoutes'
import { ButtonVariantEnum, Notification, SizeEnum } from '~/types'
import { styles } from '~/containers/layout/notifications-menu/NotificationsMenu.styles'

interface NotificationsMenuuProps {
  anchorEl: Element | null
  onClose: () => void
  items: Notification[]
  onDelete: (item: Notification) => void
  onClear: () => void
}

const NotificationsMenu: FC<NotificationsMenuuProps> = ({
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
          to={authRoutes.accountMenu.myCooperations.path}
        >
          {t(`header.notifications.messages.${item.type}`)}
        </Link>
        <IconButton onClick={() => onDelete(item)}>
          <CloseRoundedIcon color='primary' fontSize={SizeEnum.Small} />
        </IconButton>
      </Typography>
    )),
    <AppButton
      fullWidth
      key={null}
      onClick={onClear}
      variant={ButtonVariantEnum.Text}
    >
      {t('header.notifications.clearAll')}
    </AppButton>
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
