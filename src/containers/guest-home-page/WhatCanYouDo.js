import { useTranslation } from 'react-i18next'
import { Typography, Box } from '@mui/material'

import Card from '~/components/card/Card'
import { whatCanYouDoStyles as style } from '~/containers/guest-home-page/styles/what-can-you-do.styles'
import learnImg from '~/assets/img/guest-home-page/learnImg.svg'
import teachImg from '~/assets/img/guest-home-page/teachImg.svg'

const cardData = [
  {
    id: 1,
    img: learnImg,
    title: 'guestHomePage.whatCanYouDo.learn.title',
    description: 'guestHomePage.whatCanYouDo.learn.description',
    btnText: 'guestHomePage.whatCanYouDo.learn.begin',
    link: '#'
  },
  {
    id: 2,
    img: teachImg,
    title: 'guestHomePage.whatCanYouDo.teach.title',
    description: 'guestHomePage.whatCanYouDo.teach.description',
    btnText: 'guestHomePage.whatCanYouDo.teach.begin',
    link: '#'
  }
]

const WhatCanYouDo = () => {
  const { t } = useTranslation()

  const cards = cardData.map(item => {
    return (
      <Card
        btnText={ t(item.btnText) }
        description={ t(item.description) }
        img={ item.img }
        key={ item.id }
        link={ item.link }
        title={ t(item.title) }
      />)
  })

  return (
    <Box sx={ style.container }>
      <Typography sx={ style.title }>
        { t('guestHomePage.whatCanYouDo.title') }
      </Typography>

      <Typography sx={ style.description } variant='subtitle1'>
        { t('guestHomePage.whatCanYouDo.description') }
      </Typography>

      <Box sx={ style.cards }>
        { cards }
      </Box>
    </Box>
  )
}

export default  WhatCanYouDo
