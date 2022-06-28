import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Typography, Box } from '@mui/material'

import { routes } from '~/constants/routes'
import { style } from './footer.styles'

const Footer = () => {
  const { privacyPolicy, termOfUse } = routes
  const { t } = useTranslation()

  return (
    <Box sx={ style.footer }>
      <Box sx={ style.container }>
        <Typography color="primary.50" variant="caption">
          { t('guestHomePage.footer') }
        </Typography>
        <Box  sx={ style.links }>
          <Typography 
            component={ Link } 
            to={ privacyPolicy.route }
            variant="caption"
          >
            { privacyPolicy.label }
          </Typography>
          <Typography 
            component={ Link }
            to={ termOfUse.route }
            variant="caption"
          >
            { termOfUse.label }
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
