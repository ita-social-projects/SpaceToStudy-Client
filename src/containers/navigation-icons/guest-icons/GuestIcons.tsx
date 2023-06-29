import { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import AppButton from '~/components/app-button/AppButton'
import NavigationIcon from '~/components/navigation-icon/NavigationIcon'
import { useModalContext } from '~/context/modal-context'
import { guestIcons } from '~/containers/navigation-icons/NavigationIcons.constants'
import { SizeEnum } from '~/types'
import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

interface GuestIconsProps {
  setSidebarOpen: () => void
}

const GuestIcons: FC<GuestIconsProps> = ({ setSidebarOpen }) => {
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
        size={SizeEnum.Medium}
        sx={styles.loginButton}
      >
        {t('header.loginButton')}
      </AppButton>
    </Box>
  )
}

export default GuestIcons
