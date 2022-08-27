import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { routes } from '~/constants/routes'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import CardsWithButton from '~/containers/guest-home-page/cards-with-button/CardsWithButton'
import { mentorCardBoxArray, studentCardBoxArray } from '~/containers/guest-home-page/how-it-works/CardBoxArrays'
import { style } from '~/containers/guest-home-page/how-it-works/how-it-works.style'

const sectionId = routes.guestNavBar.howItWorks.label

const HowItWorks = () => {
  const { t } = useTranslation()

  const [isStudent, setIsStudent] = useState(false)

  const handleChange = () => {
    setIsStudent(!isStudent)
  }

  const cardsMap = isStudent ? (
    <CardsWithButton
      array={ mentorCardBoxArray } btnText={ 'Become a mentor' } isStudent={ isStudent }
      role={ 'mentor' }
    />
  ) : (
    <CardsWithButton
      array={ studentCardBoxArray }
      btnText={ 'Start learning today' }
      isStudent={ isStudent }
      role={ 'student' }
    />
  )

  return (
    <Box id={ sectionId } sx={ style.block }>
      <Box sx={ style.container }>
        <Typography sx={ { mb: '32px' } } variant={ 'h3' }>
          { t('guestHomePage.howItWorks.title') }
        </Typography>

        <Stack alignItems='center' spacing={ 1 } sx={ style.switch }>
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
