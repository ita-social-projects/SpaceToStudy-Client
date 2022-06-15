import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Typography, Box, Button } from '@mui/material'

import { styles } from '~/containers/guest-home-page/styles/welcome.styles'
import titleMd from '~/assets/img/guest-home-page/titleMd.svg'
import titleSm from '~/assets/img/guest-home-page/titleSm.svg'
import titleXs from '~/assets/img/guest-home-page/titleXs.svg'
import useBreakpoints from '~/hooks/use-breakpoints'
import { routes } from '~/constants/routes'

//TODO add possibility for button to redirect user to the specified url.

const link = routes.guestNavBar.whatCanYouDo.route

const WelcomeBlock = () => {
  const { t } = useTranslation()
  const size = useBreakpoints()

  const images = {
    desktop: titleMd,
    tablet: titleSm,
    mobile: titleXs
  }

  return (
    <Box className='section' sx={ styles.container }>
      <Box
        alt='Title'
        component='img' data-testid='titleImg' src={ images[size] }
        sx={ styles.title }
      />
      <Typography data-testid='description' sx={ styles.subtitle }>
        { t('guestHomePage.welcomeBlock.description') }
      </Typography>

      <Button
        component={ Link }
        data-testid='getStarted' sx={ styles.getStartBtn } to={ link }
        variant='contained'
      >
        { t('guestHomePage.welcomeBlock.getStarted') }
      </Button>
    </Box>
  )
}

export default WelcomeBlock
