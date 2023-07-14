import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import AppButton from '~/components/app-button/AppButton'
import NavigationIcon from '~/components/navigation-icon/NavigationIcon'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import { guestIcons } from '~/containers/navigation-icons/NavigationIcons.constants'
import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'
import { useModalContext } from '~/context/modal-context'

const GuestIcons = ({ setSidebarOpen }) => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()

  const openLoginDialog = useCallback(() => {
    openModal({ component: <LoginDialog /> })
  }, [openModal])

  const icons = guestIcons.map(
    (item) =>
      !item.disabled && (
        <NavigationIcon
          buttonProps={item.buttonProps({ openLoginDialog, setSidebarOpen })}
          icon={item.icon}
          key={item.tooltip}
          tooltip={t(item.tooltip)}
        />
      )
  )

  return (
    <Box sx={styles.iconBox}>
      {icons}
      <AppButton
        onClick={openLoginDialog}
        size={'medium'}
        sx={styles.loginButton}
      >
        {t('header.loginButton')}
      </AppButton>
    </Box>
  )
}

export default GuestIcons
