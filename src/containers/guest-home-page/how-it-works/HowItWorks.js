import { Box } from '@mui/system'
import { Typography, Button, FormGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import ImageWithTitleAndDescription from '~/components/image-with-title-and-description/ImageWithTitleAndDescription'


const style = {
  block: {
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
    pb: '300px'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
}

const titleVariant = {
  xs:'h6'
  
}

const descriptionVariant = {
  xs: 'subtitle2'
}


const HowItWorks = ( { items } ) => {
  const { t } = useTranslation()

  return (
    <Box sx={ style.block }>
      <Box sx={ style.container }>
        <Typography variant={ 'h3' }>
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


        { items.map((item,key) => (
          <ImageWithTitleAndDescription 
            description={ t(item.description) }
            descriptionVariant={ descriptionVariant }
            image={ item.image }
            key={ key }
            title={ t(item.title) }
            titleVariant={ titleVariant }
          />
        )) }
        

        <Button sx={ { padding: '16px 32px' } } variant="contained">
          <Typography>Start learning today</Typography>
        </Button> 
      </Box>
    </Box>
  )
}

export default HowItWorks
