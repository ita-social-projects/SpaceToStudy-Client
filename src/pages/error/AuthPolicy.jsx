import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import AppButton from '~/components/app-button/AppButton'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { guestRoutes } from '~/router/constants/guestRoutes'
import error401 from '~/assets/img/error-page/401.svg'

import { styles } from '~/pages/error/styles/AuthPolicy.styles'
import { ButtonVariantEnum, SizeEnum } from '~/types'

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
        <AppButton
          component={Link}
          size={SizeEnum.ExtraLarge}
          to={guestRoutes.home.path}
          variant={ButtonVariantEnum.Contained}
        >
          {t('button.toMain')}
        </AppButton>
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
