import { useCallback } from 'react'
import { Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { studentRoutes } from '~/constants/routes'
import { howItWorksCards } from './HowItWorksCards'

import { styles } from './student-how-it-works.styles'

const sectionId = studentRoutes.navBar.howItWorks.label

const StudentHowItWorks = () => {

  const { t } = useTranslation()
  const navigate = useNavigate()

  const redirect = useCallback(() => {
    return navigate(studentRoutes.navBar.findMentor.route)
  }, [studentRoutes.navBar.findMentor.route, navigate])

  const cards = howItWorksCards.map((item, index) => {
    return (
      <Box key={ index } sx={ styles.cardWrapper }>
        <Box 
          alt={ item.title } 
          component='img' 
          src={ item.image }  
          sx={ styles.cardImg }  
        ></Box>

        <TitleWithDescription
          description={ t(item.description) }
          descriptionStyles={ styles.cardDescription }
          title={ t(item.title) }
          titleStyles={ styles.cardTitle }
        />
      </Box>
    )
  })

  return (
    <Box className='section' id={ sectionId } sx={ styles.container }>
      <TitleWithDescription
        description={ t('studentHomePage.howItWorks.description') }
        descriptionStyles={ styles.sectionDescription }
        title={ t('studentHomePage.howItWorks.title') }
        titleStyles={ styles.sectionTitle }
      />

      <Box sx={ styles.cardsContainer }>
        { cards }
      </Box>

      <Button
        onClick={ redirect } size="extraLarge" variant="contained"
      >
        { t('studentHomePage.findMentorBlock.button') }
      </Button>
    </Box>
  )
}

export default StudentHowItWorks
