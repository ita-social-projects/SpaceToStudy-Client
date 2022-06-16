import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Box, FormControlLabel, Typography, TextField, Button, Checkbox } from '@mui/material'
import useInputVisibility from '~/hooks/use-input-visibility'

import style from './signup-form.style'

const SignupForm = ({ handleSubmit, handleChange, handleBlur, data, errors }) => {
  const { t } = useTranslation()
  const { inputVisibility: passwordVisibility, showInputText: showPassword } = useInputVisibility(errors.password)
  const { inputVisibility: confirmPasswordVisibility, showInputText: showConfirmPassword } = useInputVisibility(errors.confirmPassword)

  const checkboxLabel = (
    <Box sx={ style.box }>
      <Typography variant='subtitle2'>
        { t( 'signup.iAgree' ) }
      </Typography>
      <Typography 
        component={ Link }  
        sx={ style.underlineText } to={ '/' } 
        variant='subtitle2'
      >
        { t( 'signup.terms' ) }
      </Typography>
      <Typography sx={ { ml: '5px' } } variant='subtitle2'>
        { t( 'signup.and' ) }
      </Typography>
      <Typography 
        component={ Link }  
        sx={ style.underlineText } to={ '/' } 
        variant='subtitle2'
      >
        { t( 'signup.privacy' ) }
      </Typography>
    </Box>
  )
    
  return (
    <Box component='form' onSubmit={ handleSubmit }>
      <TextField
        autoFocus
        error={ Boolean(errors.firstName) }
        fullWidth 
        helperText={ t(errors.firstName) }
        label={ t( 'signup.firstName' ) }
        onBlur={ handleBlur('firstName') }
        onChange={ handleChange('firstName') }
        required
        size='large'
        sx={ { mb: '16px' } }
        type='text'
        value={ data.firstName }
      />

      <TextField
        error={ Boolean(errors.lastName) }
        fullWidth 
        helperText={ t(errors.lastName) }
        label={ t( 'signup.lastName' ) }
        onBlur={ handleBlur('lastName') }
        onChange={ handleChange('lastName') }
        required
        size='large'
        sx={ { mb: '16px' } }
        type='text'
        value={ data.lastName }
      />

      <TextField
        error={ Boolean(errors.email) }
        fullWidth 
        helperText={ t(errors.email) }
        label={ t( 'signup.email' ) }
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
        label={ t( 'signup.password' ) }
        onBlur={ handleBlur('password') }
        onChange={ handleChange('password') }
        required
        sx={ { mb: '16px' } }
        type={ (showPassword ? 'text' : 'password') }
        value={ data.password }
      />

      <TextField 
        InputProps={ confirmPasswordVisibility }
        error={ Boolean(errors.confirmPassword) } 
        fullWidth
        helperText={ t(errors.confirmPassword) }
        label={ t( 'signup.confirmPassword' ) }
        onBlur={ handleBlur('confirmPassword') }
        onChange={ handleChange('confirmPassword') }
        required
        type={ (showConfirmPassword ? 'text' : 'password') }
        value={ data.confirmPassword }
      />
        
      <Box sx={ style.checkboxContainer } >
        <FormControlLabel
          control={ <Checkbox /> }
          label={ checkboxLabel }
          labelPlacement='end'
          size='large'
          sx={ style.checkboxLabel }
          variant='subtitle2'
        />       
      </Box>
        
      <Button
        size='large' sx={ style.signupButton } type='submit'
        variant="contained"
      >
        { t( 'signup.signupButton' ) }
      </Button>
    </Box>
  )
}

export default SignupForm
