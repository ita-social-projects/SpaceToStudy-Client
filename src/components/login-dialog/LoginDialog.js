import { useState } from 'react'
import { Box, FormControl, FormControlLabel, Typography, TextField, Button, Checkbox } from '@mui/material'
import { useTranslation } from 'react-i18next'

import login from '~/assets/login.svg'
import useForm from '~/hooks/use-form'
import validationSchema from '~/constants/validation/login'
import { endAdornment } from '~/services/isVisible'
import style from './LoginDialog.style'

const LoginDialog = () => {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(true)

  const { handleSubmit, handleChange, handleBlur, data, errors } = useForm(
    {
      onSubmit: () => console.log({ data }),
      initialValues: { email: '', password: '', rememberMe: false },
      validationSchema: validationSchema
    }
  )

  return (
    <Box sx={ style.form }>
      <Box
        alt="login" component='img' src={ login }
        sx={ { maxWidth: '593px', display: { xs: 'none', sm: 'none', md: 'inherit' } } }
      />
      
      <Box>
        <Typography sx={ style.h2 } variant="h2">
          { t( 'login.head' ) }
        </Typography>
        
        <Box component='form' onSubmit={ handleSubmit }>

        
          <TextField
            error={ errors?.email?.error }
            fullWidth 
            helperText={ t(errors?.email?.helperText) }
            label={ t( 'login.email' ) }
            onBlur={ handleBlur('email') }
            onChange={ handleChange('email') }
            required
            size='large'
            sx={ { mb: '16px' } }
            type='email'
            value={ data.email }
          ></TextField>
          <TextField 
            InputProps={ endAdornment( showPassword, setShowPassword ) }
            error={ errors?.password?.error }
            fullWidth 
            helperText={ t(errors?.password?.helperText) }
            label={ t( 'login.password' ) }
            onBlur={ handleBlur('password') }
            onChange={ handleChange('password') }
            required
            type='password'
            value={ data.password }
          ></TextField>
        
          <Box sx={ style.checkboxContainer } >
            <FormControlLabel
              checked={ data.rememberMe }
              control={ <Checkbox /> }
              label={ t( 'login.rememberMe' ) }
              labelPlacement='end'
              onChange={ handleChange('rememberMe') }
              sx={ { color: 'primary.900', fontSize:'24px' } }
            />
            <Typography sx={ style.underlineText } variant='subtitle2'>
              { t( 'login.forgotPassword' ) }
            </Typography>
          </Box>
        
          <Button
            size='large' sx={ { width: '100%' } } type='submit'
            variant="contained"
          >
            { t( 'login.loginButton' ) }
          </Button>
        
          <Box sx={ style.linesBox }>
            <Box sx={ style.line } />
            <Typography variant="overline">
              { t( 'login.continue' ) }
            </Typography>
            <Box sx={ style.line } />
          </Box>
        
          <Button size='large' sx={ style.google } variant="outlined">GOOGLE</Button>
        
          <Box sx={ { display: 'flex' } }>
            <Typography sx={ { pr: 1 } } variant="body2">
              { t( 'login.haveAccount' ) }
            </Typography>
            <Typography sx={ style.underlineText } variant="body2">
              { t( 'login.joinUs' ) }
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginDialog
