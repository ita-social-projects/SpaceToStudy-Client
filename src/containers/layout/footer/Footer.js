import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { guestRoutes } from '~/router/constants/guestRoutes'
import { styles } from '~/containers/layout/footer/Footer.styles'

const Footer = () => {
  const { privacyPolicy, termOfUse } = guestRoutes
  const { t } = useTranslation()

  return (
    <Box sx={ styles.footer }>
      <Container sx={ styles.container }>
        <Typography color='primary.50' variant='caption'>
          { t('footer.allRightsReserved') }
        </Typography>
        <Box sx={ styles.links }>
          <Typography component={ Link } to={ privacyPolicy.route } variant='caption'>
            { t(`footer.${privacyPolicy.label}`) }
          </Typography>
          <Typography component={ Link } to={ termOfUse.route } variant='caption'>
            { t(`footer.${termOfUse.label}`) }
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
