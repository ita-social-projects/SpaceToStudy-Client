import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { studentRoutes } from '~/router/constants/studentRoutes'
import { howItWorksCards } from '~/containers/student-home-page/student-how-it-works/HowItWorksCards'

import { styles } from '~/containers/student-home-page/student-how-it-works/student-how-it-works.styles'
import { authRoutes } from '~/router/constants/authRoutes'

const sectionId = studentRoutes.navBar.howItWorks.route

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
    <Box className='section' id={sectionId} sx={styles.container}>
      <TitleWithDescription
        description={t('studentHomePage.howItWorks.description')}
        style={styles.sectionTitleComp}
        title={t('studentHomePage.howItWorks.title')}
      />

      <Box sx={styles.cardsContainer}>{cards}</Box>

      <Button component={Link} size='extraLarge' to={path} variant='contained'>
        {t('studentHomePage.findTutorBlock.button')}
      </Button>
    </Box>
  )
}

export default StudentHowItWorks
