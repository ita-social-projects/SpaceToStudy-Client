import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'

import AppButton from '~/components/app-button/AppButton'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { howItWorksCards } from '~/containers/student-home-page/student-how-it-works/HowItWorksCards'
import { styles } from '~/containers/student-home-page/student-how-it-works/student-how-it-works.styles'

import { authRoutes } from '~/router/constants/authRoutes'

import { ButtonVariantEnum, SizeEnum } from '~/types'

const StudentHowItWorks = () => {
  const { t } = useTranslation()

  const { path } = authRoutes.findOffers

  const cards = howItWorksCards.map((item, index) => {
    return (
      <Box key={index} sx={styles.cardWrapper}>
        <Box
          alt={item.title}
          component='img'
          src={item.image}
          sx={styles.cardImg}
        ></Box>

        <TitleWithDescription
          description={t(item.description)}
          style={styles.titleWithDescription}
          title={t(item.title)}
        />
      </Box>
    )
  })

  return (
    <Box className='section' sx={styles.container}>
      <TitleWithDescription
        description={t('studentHomePage.howItWorks.description')}
        style={styles.sectionTitleComp}
        title={t('studentHomePage.howItWorks.title')}
      />

      <Box sx={styles.cardsContainer}>{cards}</Box>

      <AppButton
        component={Link}
        size={SizeEnum.XXL}
        to={path}
        variant={ButtonVariantEnum.Contained}
      >
        {t('studentHomePage.findTutorBlock.button')}
      </AppButton>
    </Box>
  )
}

export default StudentHowItWorks
