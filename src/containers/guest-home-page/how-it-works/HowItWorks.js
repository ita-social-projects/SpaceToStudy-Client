import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import { useState } from 'react'
import ShareYourExperience from '~/containers/share-your-experience/ShareYourExperience'
import LearnFromExperts from '~/containers/learn-from-experts/LearnFromExperts'

const style = {
  block: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pb: '80px'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}

const HowItWorks = () => {
  const { t } = useTranslation()

  const [isStudent, setIsStudent] = useState(false)

  const handleChange = () => {
    setIsStudent(!isStudent)
  }

  const cardMap = isStudent ? <ShareYourExperience /> : <LearnFromExperts /> 

  return (
    <Box sx={ style.block }>
      <Box sx={ style.container }>
        <Typography sx={ { mb: '32px' } } variant={ 'h3' }>
          { t('guestHomePage.howItWorks.title') }
        </Typography>

        <Stack alignItems="center" direction="row" spacing={ 1 }>
          <Typography variant={ 'h6' }>
            { t('guestHomePage.howItWorks.learnFromExperts') }
          </Typography>
          <Switch checked={ isStudent } inputProps={ { 'aria-label': 'ant design' } } onChange={ handleChange } />
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
