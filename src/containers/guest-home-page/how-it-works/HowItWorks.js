import { Box } from '@mui/system'
import { Typography, Button, FormGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'

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
  iconBar: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '615px',
    height: '90px'
  }
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
              { t('guestHomePage.howItWorks.switch.learnFromExperts') }
            </Typography>
            <Switch defaultChecked inputProps={ { 'aria-label': 'ant design' } } />
            <Typography sx={ { color: 'primary.500' } } variant={ 'h6' }>
              { t('guestHomePage.howItWorks.switch.shareYourExperience') }
            </Typography>
          </Stack>
        </FormGroup>


        { items.map((item,key) => (
          <Box key={ key } sx={ style.iconBar }>
           
            <Box component="img" src={ item.image } sx={ { mr: '60px',witdh:'88px',height:'88px' } }></Box>
            <Box sx={ { width: '466px', height: '76px' } }>
              <Typography sx={ { mb: '10px' } } variant={ 'h6' }>
                { t(item.title) }
              </Typography>
              <Typography variant={ 'subtitle2' } >
                { t(item.description) }
              </Typography>
            </Box>
          </Box>
        )) }
        

        <Button sx={ { padding: '16px 32px' } } variant="contained">
          <Typography>Start learning today</Typography>
        </Button> 
      </Box>
    </Box>
  )
}

export default HowItWorks
