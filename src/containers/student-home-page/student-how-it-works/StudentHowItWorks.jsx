import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'

import Button from '~scss-components/button/Button'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { howItWorksCards } from '~/containers/student-home-page/student-how-it-works/HowItWorksCards'
import { styles } from '~/containers/student-home-page/student-how-it-works/student-how-it-works.styles'

import { authRoutes } from '~/router/constants/authRoutes'

const StudentHowItWorks = () => {
  const { t } = useTranslation()

  const { path } = authRoutes.findOffers

  const cards = howItWorksCards.map((item) => {
    return (
      <Box key={item.id} sx={styles.cardWrapper}>
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

      <Button component={Link} size='lg' to={path}>
        {t('studentHomePage.findTutorBlock.button')}
      </Button>
    </Box>
  )
}

export default StudentHowItWorks
