import { useTranslation } from 'react-i18next'
import useInputVisibility from '~/hooks/use-input-visibility'
import { Box, FormControlLabel, Typography, TextField, Button, Checkbox } from '@mui/material'

import style from './login-form.style'

const LoginForm = ({ handleSubmit, handleChange, handleBlur, data, errors }) => {
  const { inputVisibility: passwordVisibility, showInputText: showPassword } = useInputVisibility(errors.password)

  const { t } = useTranslation()
    
  return (
    <Box component='form' onSubmit={ handleSubmit }>
      <TextField
        autoFocus
        error={ Boolean(errors.email) }
        fullWidth 
        helperText={ t(errors.email) }
        label={ t( 'common.labels.email' ) }
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
        error={ Boolean(errors.password) } 
        fullWidth
        helperText={ t(errors.password) }
        label={ t( 'common.labels.password' ) }
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
        { t( 'common.labels.login' ) }
      </Button>
    </Box>
  )
}

export default LoginForm
