import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import Button from '~scss-components/button/Button'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { guestRoutes } from '~/router/constants/guestRoutes'

import img from '~/assets/img/error-page/400.svg'
import { styles } from '~/pages/error/styles/BadRequest.styles'

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
        <Button
          component={Link}
          size='lg'
          to={guestRoutes.home.path}
        >
          {t('button.toMain')}
        </Button>
      </Box>
      <Box alt='man' component='img' src={img} sx={styles.img} />
    </Container>
  )
}

export default BadRequest
