import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import LanguageIcon from '@mui/icons-material/Language'
import MenuIcon from '@mui/icons-material/Menu'
import LoginIcon from '@mui/icons-material/Login'

import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

const GuestIcons = ({ openLoginDialog, setSidebarOpen }) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.iconBox}>
      <Tooltip arrow title={t('iconsTooltip.language')}>
        <IconButton disabled sx={styles.langIcon}>
          <LanguageIcon color='disabled' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={t('iconsTooltip.login')}>
        <IconButton onClick={openLoginDialog} sx={{ display: { md: 'none' } }}>
          <LoginIcon color='primary' />
        </IconButton>
      </Tooltip>
      <Button
        onClick={openLoginDialog}
        size='medium'
        sx={styles.loginButton}
        variant='contained'
      >
        {t('header.loginButton')}
      </Button>

      <Tooltip arrow title={t('iconsTooltip.menu')}>
        <IconButton onClick={setSidebarOpen} sx={styles.menuIcon}>
          <MenuIcon color='primary' />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default GuestIcons
