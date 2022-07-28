import { Box } from '@mui/system'
import { Typography, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import CardWithImage from '~/components/card-with-image/CardWithImage'
import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'
import { ModalContext } from '~/context/modal-context'
import { useContext, useState } from 'react'
import { studentCardBoxArray } from '~/containers/guest-home-page/how-it-works/studentCardBoxArray'
import { mentorCardBoxArray } from '~/containers/guest-home-page/how-it-works/mentorCardBoxArray'

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

const titleVariant = {
  xs: 'h6'
}

const descriptionVariant = {
  xs: 'subtitle2'
}

const HowItWorks = () => {
  const { t } = useTranslation()
  const { setModal } = useContext(ModalContext)

  const openDialog = (type) => {
    setModal(<SignupDialog type={ type } />)
  }

  const [isStudent, setIsStudent] = useState(false)

  const handleChange = () => {
    setIsStudent(!isStudent)
  }

  const items = isStudent ? mentorCardBoxArray : studentCardBoxArray

  const cardMap = items.map((item, key) => (
    <CardWithImage
      description={ t(item.description) }
      descriptionVariant={ descriptionVariant }
      image={ item.image }
      key={ key }
      side={ key % 2 === 0 ? 'right' : 'left' }
      title={ t(item.title) }
      titleVariant={ titleVariant }
    />
  ))

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
          <Typography color='primary.500' variant={ 'h6' }>
            { t('guestHomePage.howItWorks.shareYourExperience') }
          </Typography>
        </Stack>

        <Box sx={ { mt: '45px' } }>
          { cardMap }
        </Box>

        <Button onClick={ () => openDialog('student') } sx={ { padding: '16px 32px', mt: '34px' } } variant="contained">
          <Typography>Start learning today</Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default HowItWorks
