import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem'
import { MenuProps } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

import AppMenu from '~/components/app-menu/AppMenu'
import { styles } from '~/containers/layout/account-menu/AccountMenu.styles'
import { useAppSelector } from '~/hooks/use-redux'

import { authRoutes } from '~/router/constants/authRoutes'
import { spliceSx } from '~/utils/helper-functions'
import { RouteItem } from '~/types'

interface AccountMenuProps {
  anchorEl: MenuProps['anchorEl']
  onClose: () => void
}

const AccountMenu: FC<AccountMenuProps> = ({ anchorEl, onClose }) => {
  const { t } = useTranslation()

  const { userRole } = useAppSelector((state) => state.appMain)

  const logOutButton = (
    <MenuItem
      component={Link}
      key={authRoutes.accountMenu.logout.path}
      onClick={onClose}
      sx={spliceSx(styles.menuItem, styles.logoutItem)}
      to={authRoutes.accountMenu.logout.path}
    >
      <LogoutIcon sx={styles.logoutIcon} />
      {t(`header.${authRoutes.accountMenu.logout.route}`)}
    </MenuItem>
  )

  const menuItems = Object.values(
    authRoutes.accountMenu[userRole as keyof typeof authRoutes.accountMenu]
  ).map((item: RouteItem) => (
    <MenuItem
      component={Link}
      key={item.path}
      onClick={onClose}
      sx={styles.menuItem}
      to={item.path}
    >
      {t(`header.${item.route}`)}
    </MenuItem>
  ))

  const menuList = [...menuItems, logOutButton]

  return (
    <AppMenu
      anchorEl={anchorEl}
      menuList={menuList}
      onClose={onClose}
      open={Boolean(anchorEl)}
    />
  )
}

export default AccountMenu
