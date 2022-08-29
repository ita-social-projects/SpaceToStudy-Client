import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import LanguageIcon from '@mui/icons-material/Language'
import MenuIcon from '@mui/icons-material/Menu'
import LoginIcon from '@mui/icons-material/Login'

import { style } from '~/containers/navigation-icons/NavigationIcons.styles'

const GuestIcons = ({ openLoginDialog, setIsSidebarOpen }) => {
  const { t } = useTranslation()

  return (
    <Box sx={ style.iconBox }>
      <Tooltip arrow title={ t('iconsTooltip.language') }>
        <IconButton sx={ style.langIcon }>
          <LanguageIcon color='primary' />
        </IconButton>
      </Tooltip>

      <Tooltip arrow title={ t('iconsTooltip.login') }>
        <IconButton onClick={ openLoginDialog } sx={ { display: { md: 'none' } } }>
          <LoginIcon color='primary' />
        </IconButton>
      </Tooltip>
      <Button
        onClick={ openLoginDialog } size='medium' sx={ style.loginButton }
        variant='contained'
      >
        { t('header.loginButton') }
      </Button>

      <Tooltip arrow title={ t('iconsTooltip.menu') }>
        <IconButton onClick={ () => setIsSidebarOpen(true) } sx={ style.menuIcon }>
          <MenuIcon color='primary' />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default GuestIcons
