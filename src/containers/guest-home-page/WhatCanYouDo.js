import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import InfoCard from '~/components/info-card/InfoCard'
import { routes } from '~/constants/routes'
import { styles } from '~/containers/guest-home-page/styles/what-can-you-do.styles'
import learnImg from '~/assets/img/guest-home-page/learnImg.png'
import teachImg from '~/assets/img/guest-home-page/teachImg.png'

const sectionId = routes.guestNavBar.whatCanYouDo.label

const titleVariant = {
  md: 'h3',
  xs: 'h4'
}

const descriptionVariant = {
  xs: 'subtitle1'
}

const cardWidth = {
  md: '427px',
  xs: '343px',
}

const cardData = [
  {
    id: 1,
    img: learnImg,
    title: 'guestHomePage.whatCanYouDo.learn.title',
    description: 'guestHomePage.whatCanYouDo.learn.description',
    actionLabel: 'guestHomePage.whatCanYouDo.learn.actionLabel',
    cardWidth
  },
  {
    id: 2,
    img: teachImg,
    title: 'guestHomePage.whatCanYouDo.teach.title',
    description: 'guestHomePage.whatCanYouDo.teach.description',
    actionLabel: 'guestHomePage.whatCanYouDo.teach.actionLabel',
    cardWidth
  }
]

const WhatCanYouDo = () => {
  const { t } = useTranslation()

  const cards = cardData.map(item => {
    return (
      <InfoCard
        actionLabel={ t(item.actionLabel) }
        cardWidth={ item.cardWidth }
        description={ t(item.description) }
        img={ item.img }
        key={ item.id }
        link={ item.link }
        title={ t(item.title) }
      />)
  })

  return (
    <Box id={ sectionId } sx={ styles.container }>
      <TitleWithDescription
        description={ t('guestHomePage.whatCanYouDo.description') }
        descriptionVariant={ descriptionVariant }
        title={ t('guestHomePage.whatCanYouDo.title') }
        titleVariant={ titleVariant }
      />

      <Box sx={ styles.cards }>
        { cards }
      </Box>
    </Box>
  )
}

export default  WhatCanYouDo
