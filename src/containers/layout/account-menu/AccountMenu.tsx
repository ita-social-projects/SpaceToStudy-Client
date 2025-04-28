import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'

import AppMenu from '~/components/app-menu/AppMenu'
import { styles } from '~/containers/layout/account-menu/AccountMenu.styles'
import { useAppSelector } from '~/hooks/use-redux'

import { authRoutes } from '~/router/constants/authRoutes'
import { RouteItem } from '~/types'

interface AccountMenuProps {
  anchorEl: HTMLElement | null
  onClose: () => void
}

const AccountMenu: FC<AccountMenuProps> = ({ anchorEl, onClose }) => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { userRole } = useAppSelector((state) => state.appMain)

  const [menuKey, setMenuKey] = useState(0)

  const menuList = (() => {
    const routes = Object.values(
      authRoutes.accountMenu[userRole as keyof typeof authRoutes.accountMenu]
    ) as RouteItem[]

    const filteredRoutes = routes.filter(
      (item) => item.route !== authRoutes.accountMenu.logout.route
    )

    return [
      ...filteredRoutes.map((item) => ({
        title: t(`header.${item.route}`),
        onClick: () => {
          navigate(item.path)
          onClose()
        },
        sx: styles.menuItem
      })),
      {
        title: t(`header.${authRoutes.accountMenu.logout.route}`),
        onClick: () => {
          navigate(authRoutes.accountMenu.logout.path)
          onClose()
        },
        graphics: <LogoutIcon sx={styles.logoutIcon} />,
        sx: {
          ...styles.menuItem,
          ...styles.logoutItem
        }
      }
    ]
  })()

  useEffect(() => {
    const handleLanguageChange = () => {
      setMenuKey((prevKey) => prevKey + 1)
    }

    i18n.on('languageChanged', handleLanguageChange)
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])

  return (
    <AppMenu
      anchorEl={anchorEl}
      key={menuKey}
      menuList={menuList}
      onClose={onClose}
      open={Boolean(anchorEl)}
    />
  )
}

export default AccountMenu
