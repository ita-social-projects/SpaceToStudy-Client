import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LogoutIcon from '@mui/icons-material/Logout'

import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'
import { studentRoutes } from '~/router/constants/studentRoutes'

const AdminIcons = () => {
  const { t } = useTranslation()

  return (
    <Box sx={ styles.iconBox }>
      <Tooltip arrow title={ t('iconsTooltip.logout') }>
        <IconButton component={ Link } to={ studentRoutes.accountMenu.logout.route }>
          <LogoutIcon color='primary' />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default AdminIcons
