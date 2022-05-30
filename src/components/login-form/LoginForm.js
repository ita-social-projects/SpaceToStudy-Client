import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, FormControlLabel, Typography, TextField, Button, Checkbox,IconButton, InputAdornment } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import style from './login-form.style'

const LoginForm = ({ handleSubmit, handleChange, handleBlur, data, dirty, errors }) => {
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation()

  const passwordVisibility = {
    endAdornment: (
      <InputAdornment position='end'>
        <IconButton
          aria-label='toggle password visibility'
          onClick={ () => setShowPassword(!showPassword) }
        >
          { (showPassword ? <Visibility /> : <VisibilityOff />) }
        </IconButton>
      </InputAdornment>
    )
  }
    
  return (
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
      />
      
      <TextField 
        InputProps={ passwordVisibility }
        error={ errors?.password?.error } 
        fullWidth
        helperText={ t(errors?.password?.helperText) }
        label={ t( 'login.password' ) }
        onBlur={ handleBlur('password') }
        onChange={ handleChange('password') }
        required
        type={ (showPassword ? 'text' : 'password') }
        value={ data.password }
      />
        
      <Box sx={ style.checkboxContainer } >
        <FormControlLabel
          control={ <Checkbox /> }
          disabled
          label={ t( 'login.rememberMe' ) }
          labelPlacement='end'
          size='large'
          sx={ style.checkboxLabel }
          variant='subtitle2'
        />
        <Typography sx={ style.underlineText } variant='subtitle2'>
          { t( 'login.forgotPassword' ) }
        </Typography>
      </Box>
        
      <Button
        size='large' sx={ style.loginButton } type='submit'
        variant="contained"
      >
        { t( 'login.loginButton' ) }
      </Button>
    </Box>
  )
}

export default LoginForm
