import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import InfoCard from '~/components/info-card/InfoCard'

import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'
import { ModalContext } from '~/context/modal-context'
import { student, mentor } from '~/constants'
import { routes } from '~/constants/routes'

import learnImg from '~/assets/img/guest-home-page/learnImg.png'
import teachImg from '~/assets/img/guest-home-page/teachImg.png'

import { styles } from '~/containers/guest-home-page/styles/WhatCanYouDo.styles'

const sectionId = routes.guestNavBar.whatCanYouDo.label

const cardWidth = {
  md: '427px',
  xs: '343px'
}

const cardData = [
  {
    id: 1,
    img: learnImg,
    title: 'guestHomePage.whatCanYouDo.learn.title',
    description: 'guestHomePage.whatCanYouDo.learn.description',
    actionLabel: 'guestHomePage.whatCanYouDo.learn.actionLabel',
    actionType: student,
    cardWidth
  },
  {
    id: 2,
    img: teachImg,
    title: 'guestHomePage.whatCanYouDo.teach.title',
    description: 'guestHomePage.whatCanYouDo.teach.description',
    actionLabel: 'guestHomePage.whatCanYouDo.teach.actionLabel',
    actionType: mentor,
    cardWidth
  }
]

const WhatCanYouDo = () => {
  const { t } = useTranslation()
  const { setModal } = useContext(ModalContext)

  const openDialog = (type) => {
    setModal(<SignupDialog type={ type } />)
  }

  const cards = cardData.map((item) => {
    return (
      <InfoCard
        action={ () => openDialog(item.actionType) }
        actionLabel={ t(item.actionLabel) }
        cardWidth={ item.cardWidth }
        description={ t(item.description) }
        img={ item.img }
        key={ item.id }
        link={ item.link }
        title={ t(item.title) }
      />
    )
  })

  return (
    <Box id={ sectionId } sx={ styles.container }>
      <TitleWithDescription
        description={ t('guestHomePage.whatCanYouDo.description') }
        descriptionStyles={ { typography: { xs: 'subtitle1' } } }
        title={ t('guestHomePage.whatCanYouDo.title') }
        titleStyles={ { typography: { md: 'h3', xs: 'h4' } } }
      />

      <Box sx={ styles.cards }>
        { cards }
      </Box>
    </Box>
  )
}

export default WhatCanYouDo
