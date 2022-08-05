import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { routes } from '~/constants/routes'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import CardWithButton from '~/components/card-with-button/СardWithButton'
import { mentorCardBoxArray, studentCardBoxArray } from '~/containers/guest-home-page/how-it-works/CardBoxArrays'
import { style } from '~/containers/guest-home-page/how-it-works/how-it-works.style'

const sectionId = routes.guestNavBar.howItWorks.label

const HowItWorks = () => {
  const { t } = useTranslation()

  const [isStudent, setIsStudent] = useState(false)

  const handleChange = () => {
    setIsStudent(!isStudent)
  }

  const cardMap = isStudent ? (
    <CardWithButton array={ mentorCardBoxArray } btnText={ 'Become a mentor' } role={ 'mentor' } />
  ) : (
    <CardWithButton array={ studentCardBoxArray } btnText={ 'Start Learning Today' } role={ 'student' } />
  )

  return (
    <Box id={ sectionId } sx={ style.block }>
      <Box sx={ style.container }>
        <Typography sx={ { mb: '32px' } } variant={ 'h3' }>
          { t('guestHomePage.howItWorks.title') }
        </Typography>

        <Stack alignItems="center" direction="row" spacing={ 1 }>
          <Typography variant={ 'h6' }>
            { t('guestHomePage.howItWorks.learnFromExperts') }
          </Typography>
          <Switch checked={ isStudent } onChange={ handleChange } />
          <Typography color="primary.500" variant={ 'h6' }>
            { t('guestHomePage.howItWorks.shareYourExperience') }
          </Typography>
        </Stack>

        <Box sx={ { mt: '45px' } }>
          { cardMap }
        </Box>
      </Box>
    </Box>
  )
}

export default HowItWorks
