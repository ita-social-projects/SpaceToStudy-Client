import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Button, Box } from '@mui/material'
import { routes } from '~/constants/routes'
import plantImg from '~/assets/img/error-page/404-plant.svg'
import manImg from '~/assets/img/error-page/404-man.svg'
import useBreakpoints from '~/hooks/use-breakpoints'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { style } from '~/pages/error/styles/not-found.style'

const NotFound = () => {
  const { t } = useTranslation()
  const { isDesktop, isTablet, isMobile } = useBreakpoints()

  const desktop = { title: 'h2', description: 'subtitle1' }
  const tablet = { title: 'h3', description: 'subtitle1' }
  const mobile = { title: 'h4', description: 'subtitle2' }

  const windowSize = (isDesktop && desktop) || (isTablet && tablet) || (isMobile && mobile)

  return (
    <Box sx={ style.root }>
      <Box sx={ style.box }>
        <TitleWithDescription
          description={ t('errorPage.404.description') }
          descriptionStyles={ { typography: windowSize.description } }
          title={ t('errorPage.404.title') }
          titleStyles={ { typography: windowSize.title, lineHeight: '61px' } }
        />
        <Button
          component={ Link } sx={ style.button } to={ routes.home.route }
          variant='contained'
        >
          { t('button.toMain') }
        </Button>
      </Box>

      <Box sx={ style.imgBox }>
        <Box
          alt='man with bag' component='img' src={ manImg }
          sx={ style.manImg }
        />
        <Box
          alt='flowerpot' component='img' src={ plantImg }
          sx={ style.plantImg }
        />
      </Box>
    </Box>
  )
}

export default NotFound
