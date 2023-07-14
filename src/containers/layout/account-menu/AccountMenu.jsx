import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import MenuItem from '@mui/material/MenuItem'

import AppMenu from '~/components/app-menu/AppMenu'
import { authRoutes } from '~/router/constants/authRoutes'

import { styles } from '~/containers/layout/account-menu/AccountMenu.styles'

const AccountMenu = ({ anchorEl, onClose }) => {
  const { t } = useTranslation()

  const menuList = Object.values(authRoutes.accountMenu).map((item) => (
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
