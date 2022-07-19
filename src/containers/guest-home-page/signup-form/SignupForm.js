import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Box, FormControlLabel, Typography, TextField, Button, Checkbox, Tooltip } from '@mui/material'
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
      <Box sx={ { display: { md: 'block', lg: 'flex' }, gap: '15px' } }>
        <TextField
          FormHelperTextProps={ { sx: style.helperText } }
          autoFocus
          error={ Boolean(errors.firstName) }
          fullWidth
          helperText={ errors.firstName ? 
            (<Tooltip title={ t(errors.firstName) }>
              <Typography variant="caption">
                { t(errors.firstName) }
              </Typography>
            </Tooltip>)
            : ' ' }
          label={ t( 'common.labels.firstName' ) }
          onBlur={ handleBlur('firstName') }
          onChange={ handleChange('firstName') }
          required
          size='large'
          sx={ { mb: '5px' } }
          type='text'
          value={ data.firstName }
        />

        <TextField
          FormHelperTextProps={ { sx: style.helperText } }
          error={ Boolean(errors.lastName) }
          fullWidth 
          helperText={ errors.lastName ? 
            (<Tooltip title={ t(errors.lastName) }>
              <Typography variant="caption">
                { t(errors.lastName) }
              </Typography>
            </Tooltip>)
            : ' ' }
          label={ t( 'common.labels.lastName' ) }
          onBlur={ handleBlur('lastName') }
          onChange={ handleChange('lastName') }
          required
          size='large'
          sx={ { mb: '5px' } }
          type='text'
          value={ data.lastName }
        />
      </Box>

      <TextField
        FormHelperTextProps={ { sx: style.helperText } }
        error={ Boolean(errors.email) }
        fullWidth 
        helperText={ errors.email ? 
          (<Tooltip title={ t(errors.email) }>
            <Typography variant="caption">
              { t(errors.email) }
            </Typography>
          </Tooltip>)
          : ' ' }
        label={ t( 'common.labels.email' ) }
        onBlur={ handleBlur('email') }
        onChange={ handleChange('email') }
        required
        size='large'
        sx={ { mb: '5px' } }
        type='email'
        value={ data.email }
      />
      
      <TextField
        FormHelperTextProps={ { sx: style.helperText } }
        InputProps={ passwordVisibility }
        error={ Boolean(errors.password) } 
        fullWidth
        helperText={ errors.password ? 
          (<Tooltip title={ t(errors.password) }>
            <Typography variant="caption">
              { t(errors.password) }
            </Typography>
          </Tooltip>)
          : ' ' }
        label={ t( 'common.labels.password' ) }
        onBlur={ handleBlur('password') }
        onChange={ handleChange('password') }
        required
        sx={ { mb: '5px' } }
        type={ (showPassword ? 'text' : 'password') }
        value={ data.password }
      />

      <TextField 
        FormHelperTextProps={ { sx: style.helperText } }
        InputProps={ confirmPasswordVisibility }
        error={ Boolean(errors.confirmPassword) } 
        fullWidth
        helperText={ errors.confirmPassword ? 
          (<Tooltip title={ t(errors.confirmPassword) }>
            <Typography variant="caption">
              { t(errors.confirmPassword) }
            </Typography>
          </Tooltip>)
          : ' ' }
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
