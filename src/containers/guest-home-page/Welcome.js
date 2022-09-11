import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import HashLink from '~/components/hash-link/HashLink'

import { styles } from '~/containers/guest-home-page/styles/welcome.styles'
import titleMd from '~/assets/img/guest-home-page/titleMd.svg'
import titleSm from '~/assets/img/guest-home-page/titleSm.svg'
import titleXs from '~/assets/img/guest-home-page/titleXs.svg'
import useBreakpoints from '~/hooks/use-breakpoints'
import { guestRoutes } from '~/router/constants/guestRoutes'

const scrollTo = guestRoutes.guestNavBar.whatCanYouDo.path

const Welcome = () => {
  const { t } = useTranslation()
  const { isDesktop, isTablet, isMobile } = useBreakpoints()

  const image = (isDesktop && titleMd) || (isTablet && titleSm) || (isMobile && titleXs)

  return (
    <Box className='section' sx={ styles.container }>
      <Box
        alt='Title' component='img' src={ image.toString() }
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
