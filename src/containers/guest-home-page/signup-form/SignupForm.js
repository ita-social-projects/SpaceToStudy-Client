import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Box, FormControlLabel, Typography, TextField, Button, Checkbox } from '@mui/material'
import useInputVisibility from '~/hooks/use-input-visibility'

import { style } from './signup-form.style'

const SignupForm = ({ handleSubmit, handleChange, handleBlur, data, errors }) => {
  const { t } = useTranslation()
  const { inputVisibility: passwordVisibility, showInputText: showPassword } = useInputVisibility(errors.password)
  const { inputVisibility: confirmPasswordVisibility, showInputText: showConfirmPassword } = useInputVisibility(errors.confirmPassword)

  const policyAgreement = (
    <Box sx={ style.box }>
      <Typography variant='subtitle2'>
        { t( 'signup.iAgree' ) }
      </Typography>
      <Typography 
        component={ Link }  
        sx={ style.underlineText } to={ '/' } 
        variant='subtitle2'
      >
        { t( 'common.labels.terms' ) }
      </Typography>
      <Typography sx={ { ml: '5px' } } variant='subtitle2'>
        { t( 'signup.and' ) }
      </Typography>
      <Typography 
        component={ Link }  
        sx={ style.underlineText } to={ '/' } 
        variant='subtitle2'
      >
        { t( 'common.labels.privacyPolicy' ) }
      </Typography>
    </Box>
  )
    
  return (
    <Box component='form' onSubmit={ handleSubmit }>
      <TextField
        autoFocus
        error={ Boolean(errors.firstName) }
        fullWidth 
        helperText={ t(errors.firstName, { name: 'First name' }) }
        label={ t( 'common.labels.firstName' ) }
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
        helperText={ t(errors.lastName, { name: 'Last name' }) }
        label={ t( 'common.labels.lastName' ) }
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
        sx={ { mb: '16px' } }
        type={ (showPassword ? 'text' : 'password') }
        value={ data.password }
      />

      <TextField 
        InputProps={ confirmPasswordVisibility }
        error={ Boolean(errors.confirmPassword) } 
        fullWidth
        helperText={ t(errors.confirmPassword) }
        label={ t( 'common.labels.confirmPassword' ) }
        onBlur={ handleBlur('confirmPassword') }
        onChange={ handleChange('confirmPassword') }
        required
        type={ (showConfirmPassword ? 'text' : 'password') }
        value={ data.confirmPassword }
      />
        
      <Box sx={ style.checkboxContainer } >
        <FormControlLabel
          control={ <Checkbox /> }
          label={ policyAgreement }
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
        { t( 'common.labels.signup' ) }
      </Button>
    </Box>
  )
}

export default SignupForm
