import { useTranslation } from 'react-i18next'
import { Typography, Box, Button } from '@mui/material'

import { whatCanYouDoStyles as style } from '~/containers/guest-home-page/styles/what-can-you-do-styles'
import learnImg from '~/assets/img/guest-home-page/learnImg.svg'
import teachImg from '~/assets/img/guest-home-page/teachImg.svg'


const WhatCanYouDo = () => {
  const { t } = useTranslation()

  return (
    <Box sx={ style.container }>
      <Typography sx={ style.title }>
        { t('guestHomePage.whatCanYouDo.title') }
      </Typography>

      <Typography sx={ style.description }>
        { t('guestHomePage.whatCanYouDo.description') }
      </Typography>

      <Box sx={ style.cards }>
        <Box sx={ style.card }>
          <Box
            alt='Learn from experts' component='img' src={ learnImg }
            sx={ style.cardImg }
          ></Box>
          <Typography sx={ style.cardTitle }>
            { t('guestHomePage.whatCanYouDo.learn.title') }
          </Typography>
          <Typography sx={ style.cardDescription } variant='body1'>
            { t('guestHomePage.whatCanYouDo.learn.description') }
          </Typography>
          <Button variant='contained'>
            { t('guestHomePage.whatCanYouDo.learn.begin') }
          </Button>
        </Box>

        <Box sx={ style.card }>
          <Box
            alt='Learn from experts' component='img' src={ teachImg }
            sx={ style.cardImg }
          ></Box>
          <Typography sx={ style.cardTitle }>
            { t('guestHomePage.whatCanYouDo.teach.title') }
          </Typography>
          <Typography sx={ style.cardDescription } variant='body1'>
            { t('guestHomePage.whatCanYouDo.teach.description') }
          </Typography>
          <Button variant='contained'>
            { t('guestHomePage.whatCanYouDo.teach.begin') }
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default  WhatCanYouDo
