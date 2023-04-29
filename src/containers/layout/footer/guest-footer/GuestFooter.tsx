import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { guestRoutes } from '~/router/constants/guestRoutes'
import { styles } from '~/containers/layout/footer/Footer.styles'

const GuestFooter = () => {
  const { privacyPolicy, termOfUse } = guestRoutes
  const { t } = useTranslation()

  return (
    <Container sx={styles.container}>
      <Typography color='primary.50' variant='caption'>
        {t('footer.allRightsReserved')}
      </Typography>
      <Box sx={styles.links}>
        <Typography
          component={RouterLink}
          to={privacyPolicy.path}
          variant='caption'
        >
          {t(`footer.${privacyPolicy.route}`)}
        </Typography>
        <Typography
          component={RouterLink}
          to={termOfUse.path}
          variant='caption'
        >
          {t(`footer.${termOfUse.route}`)}
        </Typography>
      </Box>
    </Container>
  )
}

export default GuestFooter
