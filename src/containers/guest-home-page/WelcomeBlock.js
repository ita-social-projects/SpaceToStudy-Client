import { useTranslation } from 'react-i18next'
import { Typography, Box, Button } from '@mui/material'

import { WelcomeBlockStyles as style } from '~/containers/guest-home-page/styles/welcomeBlockStyles'
import titleMd from '~/assets/images/titleMd.svg'
import titleSm from '~/assets/images/titleSm.svg'
import titleXs from '~/assets/images/titleXs.svg'
import useBreakpoints from '~/hooks/use-breakpoints'

const WelcomeBlock = () => {
  const { t } = useTranslation()
  const size = useBreakpoints()

  const images = {
    md: titleMd,
    sm: titleSm,
    xs: titleXs
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
