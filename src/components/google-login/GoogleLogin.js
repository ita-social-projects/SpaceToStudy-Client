import { useTranslation } from 'react-i18next'
import { Box, Typography, Button } from '@mui/material'

import style from './google-login.style'
import google from '~/assets/img/login-dialog/google.svg'


const GoogleLogin = () => {
  const { t } = useTranslation()
    
  return (
    <Box>
      <Box sx={ style.linesBox }>
        <Box sx={ style.line } />
        <Typography variant="overline">
          { t( 'login.continue' ) }
        </Typography>
        <Box sx={ style.line } />
      </Box>
        
      <Button size='large' sx={ style.google } variant="outlined">
        <Box
          alt="google icon" component='img' src={ google }
          sx={ { pr: 1 } }
        />
        { t('login.googleButton') }
      </Button>
        
      <Box sx={ { display: 'flex' } }>
        <Typography sx={ { pr: 1 } } variant="body2">
          { t( 'login.haveAccount' ) }
        </Typography>
        <Typography
          sx={ style.underlineText } 
          variant="body2"
        >
          { t( 'login.joinUs' ) }
        </Typography>
      </Box>
    </Box>   
  )
}

export default GoogleLogin
