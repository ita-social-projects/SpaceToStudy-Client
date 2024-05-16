import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import AppButton from '~/components/app-button/AppButton'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { guestRoutes } from '~/router/constants/guestRoutes'

import img from '~/assets/img/error-page/400.svg'
import { styles } from '~/pages/error/styles/BadRequest.styles'
import { ButtonVariantEnum, SizeEnum } from '~/types'

const BadRequest = () => {
  const { t } = useTranslation()

  return (
    <Container sx={styles.container}>
      <Box sx={styles.info}>
        <TitleWithDescription
          description={t('errorPage.400.description')}
          style={styles.titleWithDescription}
          title={t('errorPage.400.title')}
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
      <Box alt='man' component='img' src={img} sx={styles.img} />
    </Container>
  )
}

export default BadRequest
