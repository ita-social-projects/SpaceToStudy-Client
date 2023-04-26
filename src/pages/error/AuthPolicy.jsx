import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { guestRoutes } from '~/router/constants/guestRoutes'
import error401 from '~/assets/img/error-page/401.svg'

import { styles } from '~/pages/error/styles/AuthPolicy.styles'

const AuthPolicy = () => {
  const { t } = useTranslation()

  return (
    <Container sx={styles.container}>
      <Box sx={styles.errorInfo}>
        <TitleWithDescription
          description={t('errorPage.401.description')}
          style={styles.titleWithDescription}
          title={t('errorPage.401.title')}
        />
        <Button
          component={Link}
          size='extraLarge'
          to={guestRoutes.home.path}
          variant='contained'
        >
          {t('button.toMain')}
        </Button>
      </Box>
      <Box
        alt='Authorization error'
        component='img'
        src={error401}
        sx={styles.errorImage}
      />
    </Container>
  )
}

export default AuthPolicy
