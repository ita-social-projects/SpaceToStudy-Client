import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { guestRoutes } from '~/router/constants/guestRoutes'
import CardsWithButton from '~/containers/guest-home-page/cards-with-button/CardsWithButton'
import { tutorCardBoxArray, studentCardBoxArray } from '~/containers/guest-home-page/how-it-works/CardBoxArrays'
import { tutor, student } from '~/constants'

import { styles } from '~/containers/guest-home-page/how-it-works/HowItWorks.styles'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

const sectionId = guestRoutes.navBar.howItWorks.route

const HowItWorks = () => {
  const { t } = useTranslation()

  const [isStudent, setIsStudent] = useState(false)

  const handleChange = () => {
    setIsStudent(!isStudent)
  }

  const cardsMap = isStudent ? (
    <CardsWithButton
      array={ tutorCardBoxArray } btnText={ 'Become a tutor' } isStudent={ isStudent }
      role={ tutor }
    />
  ) : (
    <CardsWithButton
      array={ studentCardBoxArray }
      btnText={ 'Start learning today' }
      isStudent={ isStudent }
      role={ student }
    />
  )

  const switchOptions = {
    left: {
      text: t('guestHomePage.howItWorks.learnFromExperts')
    },
    right: {
      text: t('guestHomePage.howItWorks.shareYourExperience')
    }
  }

  return (
    <Box id={ sectionId } sx={ styles.block }>
      <Box sx={ styles.container }>
        <Typography sx={ { mb: '32px' } } variant={ 'h3' }>
          { t('guestHomePage.howItWorks.title') }
        </Typography>

        <AppContentSwitcher
          active={ isStudent }
          handleChange={ handleChange }
          styles={ styles.switch }
          switchOptions={ switchOptions }
          typographyVariant={ 'h6' }
        />

        <Box sx={ { mt: '45px' } }>
          { cardsMap }
        </Box>
      </Box>
    </Box>
  )
}

export default HowItWorks
