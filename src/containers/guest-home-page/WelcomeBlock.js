import { useTranslation } from 'react-i18next'
import { Typography, Box, Button } from '@mui/material'

import { welcomeBlockStyles as style } from '~/containers/guest-home-page/styles/welcome-block.styles'
import titleMd from '~/assets/img/guest-home-page/titleMd.svg'
import titleSm from '~/assets/img/guest-home-page/titleSm.svg'
import titleXs from '~/assets/img/guest-home-page/titleXs.svg'
import useBreakpoints from '~/hooks/use-breakpoints'

const WelcomeBlock = () => {
  const { t } = useTranslation()
  const size = useBreakpoints()

  const images = {
    desktop: titleMd,
    tablet: titleSm,
    mobile: titleXs
  }

  return (
    <Box sx={ style.container }>
      <Box
        alt='Title' component='img' src={ images[size] }
        sx={ style.title }
      />
      <Typography sx={ style.subtitle }>
        { t('guestHomePage.welcomeBlock.description') }
      </Typography>

      <Button sx={ style.getStartBtn } variant="contained">
        { t('guestHomePage.welcomeBlock.getStarted') }
      </Button>
    </Box>
  )
}

export default WelcomeBlock
