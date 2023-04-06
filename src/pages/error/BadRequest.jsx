import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

import { guestRoutes } from '~/router/constants/guestRoutes'
import useBreakpoints from '~/hooks/use-breakpoints'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import img from '~/assets/img/error-page/400.svg'
import { styles } from './styles/BadRequest.styles'

const BadRequest = () => {
  const { t } = useTranslation()
  const { isDesktop, isTablet, isMobile } = useBreakpoints()

  const desktopTypography = { title: 'h2', description: 'subtitle1' }
  const tabletTypography = { title: 'h3', description: 'subtitle1' }
  const mobileTypography = { title: 'h4', description: 'subtitle2' }

  const windowSizeTypography =
    (isDesktop && desktopTypography) ||
    (isTablet && tabletTypography) ||
    (isMobile && mobileTypography)

  return (
    <Container sx={styles.container}>
      <Box sx={styles.info}>
        <TitleWithDescription
          description={t('errorPage.400.description')}
          descriptionStyles={{ typography: windowSizeTypography.description }}
          title={t('errorPage.400.title')}
          titleStyles={{ typography: windowSizeTypography.title }}
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
      <Box alt='man' component='img' src={img} sx={styles.img} />
    </Container>
  )
}

export default BadRequest
