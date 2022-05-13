import { useTranslation } from 'react-i18next'
import { Typography, Box, Button } from '@mui/material'

import { WelcomeBlockStyles as style } from '~/containers/guest-home-page/styles/WelcomeBlockStyles'

const WelcomeBlock = () => {
  const { t } = useTranslation()

  return (
    <Box sx={ style.container } >
      <Box sx={ style.title } >
        <Typography sx={ style.h1 } variant={ 'h1' } >
          { t('guestHomePage.welcomeBlock.title.titlePart1') }
          <br />
          <Box component="span" sx={ style.blue } >
            { t('guestHomePage.welcomeBlock.title.titlePart2') }
          </Box >
          <br />
          { t('guestHomePage.welcomeBlock.title.titlePart3') }
          <Box component="span" sx={ style.green } >
            { t('guestHomePage.welcomeBlock.title.titlePart4') }
          </Box >
        </Typography >
      </Box >

      <Typography sx={ style.subtitle } variant={ 'subtitle1' } >
        { t('guestHomePage.welcomeBlock.subtitle.subtitlePart1') }
        <br />
        { t('guestHomePage.welcomeBlock.subtitle.subtitlePart2') }
      </Typography >

      <Button sx={ style.getStartBtn } >
        <Typography >
          { t('guestHomePage.welcomeBlock.btnText') }
        </Typography >
      </Button >
    </Box >
  )
}

export default WelcomeBlock
