import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import info from '~/assets/img/login-dialog/info.svg'

const InfoPopup = ( { email, afterEmail, beforeEmail } ) => {
  const { t } = useTranslation()
  
  const style = {
    root: {
      maxWidth: '672px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }  
    
  return (
    <Box >
      <Box component='img' src={ info } sx={ { display: 'flex', margin: '0 auto' } } />
      <Box sx={ style.root }>
        <Typography sx={ { fontWeight: 900 } }variant='h5'>
          { t('login.passwordReset') }
        </Typography>
        <Typography variant='button'>
          { t(`${ beforeEmail }`) }
          { /* </Typography> */ }
          <br />
          <Typography component='span' sx={ { fontWeight: 700 } }> 
            { t(`${ email }`) }
          </Typography>
          { /* <Typography component='span'> */ }
          { t(`${ afterEmail }`) }
        </Typography>

      </Box>
    </Box>


  )
}

export default InfoPopup
