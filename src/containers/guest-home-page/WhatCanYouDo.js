import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'

import { routes } from '~/constants/routes'
import Heading from '~/components/heading/Heading'
import InfoCard from '~/components/info-card/InfoCard'
import { whatCanYouDoStyles as style } from '~/containers/guest-home-page/styles/what-can-you-do.styles'
import learnImg from '~/assets/img/guest-home-page/learnImg.svg'
import teachImg from '~/assets/img/guest-home-page/teachImg.svg'

const sectionId = routes.guestNavBar.whatCanYouDo.label

const cardData = [
  {
    id: 1,
    img: learnImg,
    title: 'guestHomePage.whatCanYouDo.learn.title',
    description: 'guestHomePage.whatCanYouDo.learn.description',
    btnText: 'guestHomePage.whatCanYouDo.learn.action'
  },
  {
    id: 2,
    img: teachImg,
    title: 'guestHomePage.whatCanYouDo.teach.title',
    description: 'guestHomePage.whatCanYouDo.teach.description',
    btnText: 'guestHomePage.whatCanYouDo.teach.action'
  }
]

const WhatCanYouDo = () => {
  const { t } = useTranslation()

  const cards = cardData.map(item => {
    return (
      <InfoCard
        btnText={ t(item.btnText) }
        description={ t(item.description) }
        img={ item.img }
        key={ item.id }
        link={ item.link }
        title={ t(item.title) }
      />)
  })

  return (
    <Box id={ sectionId } sx={ style.container }>
      <Heading description={ t('guestHomePage.whatCanYouDo.description') } title={ t('guestHomePage.whatCanYouDo.title') } />

      <Box sx={ style.cards }>
        { cards }
      </Box>
    </Box>
  )
}

export default  WhatCanYouDo
