import { useTranslation } from 'react-i18next'
import { Box, Typography, Button } from '@mui/material'

import { style } from '~/containers/guest-home-page/google-login/google-login.style'
import google from '~/assets/img/login-dialog/google.svg'


const GoogleLogin = ({ type }) => {
  const { t } = useTranslation()

  return (
    <Box>
      <Box sx={ style.linesBox }>
        <Typography sx={ style.continue } variant="body2">
          { t( `${type}.continue` ) }
        </Typography>
      </Box>
        
      <Button size='large' sx={ style.google } variant="outlined">
        <Box
          alt="google icon" component='img' src={ google }
          sx={ { pr: 1 } }
        />
        { t( `${type}.googleButton` ) }
      </Button>
        
      <Box sx={ style.haveAccount }>
        <Typography sx={ { pr: 1 } } variant="body2">
          { t( `${type}.haveAccount` ) }
        </Typography>
        <Typography
          sx={ style.underlineText } 
          variant="body2"
        >
          { t( `${type}.joinUs` ) }
        </Typography>
      </Box>
    </Box>   
  )
}

export default GoogleLogin
