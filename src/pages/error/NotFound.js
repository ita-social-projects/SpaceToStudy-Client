import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { guestRoutes } from '~/router/constants/guestRoutes'
import plantImg from '~/assets/img/error-page/404-plant.svg'
import manImg from '~/assets/img/error-page/404-man.svg'
import useBreakpoints from '~/hooks/use-breakpoints'

import { styles } from '~/pages/error/styles/NotFound.styles'

const NotFound = () => {
  const { t } = useTranslation()
  const { isDesktop, isTablet, isMobile } = useBreakpoints()

  const desktopTypography = { title: 'h2', description: 'subtitle1' }
  const tabletTypography = { title: 'h3', description: 'subtitle1' }
  const mobileTypography = { title: 'h4', description: 'subtitle2' }

  const windowSizeTypography =
    (isDesktop && desktopTypography) || (isTablet && tabletTypography) || (isMobile && mobileTypography)

  return (
    <Box sx={ styles.root }>
      <Box sx={ styles.box }>
        <TitleWithDescription
          description={ t('errorPage.404.description') }
          descriptionStyles={ { typography: windowSizeTypography.description } }
          title={ t('errorPage.404.title') }
          titleStyles={ { typography: windowSizeTypography.title, lineHeight: '61px' } }
        />
        <Button
          component={ Link } sx={ styles.button } to={ guestRoutes.home.path }
          variant='contained'
        >
          { t('button.toMain') }
        </Button>
      </Box>

      <Box sx={ styles.imgBox }>
        <Box
          alt='man with bag' component='img' src={ manImg }
          sx={ styles.manImg }
        />
        <Box
          alt='flowerpot' component='img' src={ plantImg }
          sx={ styles.plantImg }
        />
      </Box>
    </Box>
  )
}

export default NotFound
