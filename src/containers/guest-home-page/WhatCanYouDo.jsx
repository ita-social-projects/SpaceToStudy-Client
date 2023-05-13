import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import InfoCard from '~/components/info-card/InfoCard'

import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'
import { useModalContext } from '~/context/modal-context'
import { student, tutor } from '~/constants'
import { guestRoutes } from '~/router/constants/guestRoutes'

import learnImg from '~/assets/img/guest-home-page/learnImg.png'
import teachImg from '~/assets/img/guest-home-page/teachImg.png'

import { styles } from '~/containers/guest-home-page/styles/WhatCanYouDo.styles'

const sectionId = guestRoutes.navBar.whatCanYouDo.route

const cardData = [
  {
    id: 1,
    img: learnImg,
    title: 'guestHomePage.whatCanYouDo.learn.title',
    description: 'guestHomePage.whatCanYouDo.learn.description',
    actionLabel: 'guestHomePage.whatCanYouDo.learn.actionLabel',
    actionType: student
  },
  {
    id: 2,
    img: teachImg,
    title: 'guestHomePage.whatCanYouDo.teach.title',
    description: 'guestHomePage.whatCanYouDo.teach.description',
    actionLabel: 'guestHomePage.whatCanYouDo.teach.actionLabel',
    actionType: tutor
  }
]

const WhatCanYouDo = () => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()

  const openDialog = (type) => {
    openModal({ component: <SignupDialog type={type} /> })
  }

  const cards = cardData.map((item) => {
    return (
      <InfoCard
        action={() => openDialog(item.actionType)}
        actionLabel={t(item.actionLabel)}
        description={t(item.description)}
        img={item.img}
        key={item.id}
        link={item.link}
        title={t(item.title)}
      />
    )
  })

  return (
    <Box id={sectionId} sx={styles.container}>
      <TitleWithDescription
        description={t('guestHomePage.whatCanYouDo.description')}
        style={styles.titleWithDescription}
        title={t('guestHomePage.whatCanYouDo.title')}
      />

      <Box sx={styles.cards}>{cards}</Box>
    </Box>
  )
}

export default WhatCanYouDo
