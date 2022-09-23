import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'

import { guestRoutes } from '~/router/constants/guestRoutes'
import CardsWithButton from '~/containers/guest-home-page/cards-with-button/CardsWithButton'
import { tutorCardBoxArray, studentCardBoxArray } from '~/containers/guest-home-page/how-it-works/CardBoxArrays'
import { tutor, student } from '~/constants'

import { styles } from '~/containers/guest-home-page/how-it-works/HowItWorks.styles'

const sectionId = guestRoutes.navBar.howItWorks.label

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

  return (
    <Box id={ sectionId } sx={ styles.block }>
      <Box sx={ styles.container }>
        <Typography sx={ { mb: '32px' } } variant={ 'h3' }>
          { t('guestHomePage.howItWorks.title') }
        </Typography>

        <Stack alignItems='center' spacing={ 1 } sx={ styles.switch }>
          <Typography color={ isStudent ? 'primary.500' : 'primary.900' } variant={ 'h6' }>
            { t('guestHomePage.howItWorks.learnFromExperts') }
          </Typography>
          <Switch checked={ isStudent } data-testid='switch' onChange={ handleChange } />
          <Typography color={ isStudent ? 'primary.900' : 'primary.500' } variant={ 'h6' }>
            { t('guestHomePage.howItWorks.shareYourExperience') }
          </Typography>
        </Stack>

        <Box sx={ { mt: '45px' } }>
          { cardsMap }
        </Box>
      </Box>
    </Box>
  )
}

export default HowItWorks
