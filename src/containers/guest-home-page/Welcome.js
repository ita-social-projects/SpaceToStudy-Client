import { useTranslation } from 'react-i18next'
import { Typography, Box, Button } from '@mui/material'
import HashLink from '~/components/hash-link/HashLink'

import { styles } from '~/containers/guest-home-page/styles/welcome.styles'
import titleMd from '~/assets/img/guest-home-page/titleMd.svg'
import titleSm from '~/assets/img/guest-home-page/titleSm.svg'
import titleXs from '~/assets/img/guest-home-page/titleXs.svg'
import useBreakpoints from '~/hooks/use-breakpoints'
import { routes } from '~/constants/routes'

const scrollTo = routes.guestNavBar.whatCanYouDo.route

const Welcome = () => {
  const { t } = useTranslation()
  const { isDesktop, isTablet, isMobile } = useBreakpoints()

  const image = (isDesktop && titleMd) || (isTablet && titleSm) || (isMobile && titleXs)

  return (
    <Box className='section' sx={ styles.container }>
      <Box
        alt='Title' component='img' src={ image }
        sx={ styles.title }
      />
      <Typography data-testid='welcomeDescription' sx={ styles.subtitle }>
        { t('guestHomePage.welcomeBlock.description') }
      </Typography>

      <Button
        component={ HashLink }
        data-testid='welcomeGetStarted'
        sx={ styles.getStartBtn }
        to={ scrollTo }
        variant='contained'
      >
        { t('guestHomePage.welcomeBlock.getStarted') }
      </Button>
    </Box>
  )
}

export default Welcome
