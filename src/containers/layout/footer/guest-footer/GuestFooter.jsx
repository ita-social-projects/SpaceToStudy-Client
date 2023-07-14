import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { styles } from '~/containers/layout/footer/Footer.styles'
import { guestRoutes } from '~/router/constants/guestRoutes'

const GuestFooter = () => {
  const { privacyPolicy, termOfUse } = guestRoutes
  const { t } = useTranslation()

  return (
    <Container sx={styles.container}>
      <Typography variant={'caption'}>
        {t('footer.allRightsReserved')}
      </Typography>
      <Box sx={styles.links}>
        <Typography
          component={RouterLink}
          to={privacyPolicy.path}
          variant={'caption'}
        >
          {t('footer.privacyPolicy')}
        </Typography>
        <Typography
          component={RouterLink}
          to={termOfUse.path}
          variant={'caption'}
        >
          {t('footer.termOfUse')}
        </Typography>
      </Box>
    </Container>
  )
}

export default GuestFooter
