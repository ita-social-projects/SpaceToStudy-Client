import { Box } from '@mui/system'
import { Typography, Button, FormGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import CardWithImage from '~/components/card-with-image/CardWithImage'
import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'
import { ModalContext } from '~/context/modal-context'
import { useContext } from 'react'

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

const HowItWorks = ({ items }) => {
  const { t } = useTranslation()
  const { setModal } = useContext(ModalContext)

  const openDialog = (type) => {
    setModal(<SignupDialog type={ type } />)
  }

  return (
    <Box sx={ style.block }>
      <Box sx={ style.container }>
        <Typography sx={ { mb: '32px' } } variant={ 'h3' }>
          { t('guestHomePage.howItWorks.title') }
        </Typography>

        <FormGroup>
          <Stack alignItems="center" direction="row" spacing={ 1 }>
            <Typography variant={ 'h6' }>
              { t('guestHomePage.howItWorks.learnFromExperts') }
            </Typography>
            <Switch defaultChecked inputProps={ { 'aria-label': 'ant design' } } />
            <Typography sx={ { color: 'primary.500' } } variant={ 'h6' }>
              { t('guestHomePage.howItWorks.shareYourExperience') }
            </Typography>
          </Stack>
        </FormGroup>
        
        <Box sx={ { mt: '45px' } }>
          { items.map((item, key) => (
            <CardWithImage
              description={ t(item.description) }
              descriptionVariant={ descriptionVariant }
              image={ item.image }
              key={ key }
              side={ key % 2 === 0 ? 'right' : 'left' }
              title={ t(item.title) }
              titleVariant={ titleVariant }
            />
          )) }
        </Box>

        <Button onClick={ () => openDialog('student') } sx={ { padding: '16px 32px', mt: '34px' } } variant="contained">
          <Typography>Start learning today</Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default HowItWorks
