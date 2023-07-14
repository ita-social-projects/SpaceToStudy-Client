import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import NavigationIcon from '~/components/navigation-icon/NavigationIcon'
import { userIcons } from '~/containers/navigation-icons/NavigationIcons.constants'

import AccountMenu from '~/containers/layout/account-menu/AccountMenu'
import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

const UserIcons = ({ setSidebarOpen }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const anchorRef = useRef(null)
  const { t } = useTranslation()

  const openMenu = () => setMenuAnchorEl(anchorRef.current)
  const closeMenu = () => setMenuAnchorEl(null)

  const icons = userIcons.map(
    (item) =>
      !item.disabled && (
        <NavigationIcon
          buttonProps={item.buttonProps({
            openMenu,
            setSidebarOpen
          })}
          icon={item.icon}
          key={item.tooltip}
          tooltip={t(item.tooltip)}
        />
      )
  )

  return (
    <Box ref={anchorRef} sx={styles.iconBox}>
      {icons}
      <AccountMenu anchorEl={menuAnchorEl} onClose={closeMenu} />
    </Box>
  )
}

export default UserIcons
