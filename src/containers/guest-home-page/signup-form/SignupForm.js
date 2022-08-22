import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Box, FormControlLabel, Typography, Button, Checkbox } from '@mui/material'
import useInputVisibility from '~/hooks/use-input-visibility'
import AppTextField from '~/components/app-text-field/AppTextField'

import { style } from './signup-form.style'

const SignupForm = ({ handleSubmit, handleChange, handleBlur, data, errors }) => {
  const { t } = useTranslation()
  const { inputVisibility: passwordVisibility, showInputText: showPassword } = useInputVisibility(errors.password)
  const { inputVisibility: confirmPasswordVisibility, showInputText: showConfirmPassword } = useInputVisibility(
    errors.confirmPassword
  )

  const policyAgreement = (
    <Box sx={ style.box }>
      <Typography variant='subtitle2'>
        { t('signup.iAgree') }
      </Typography>
      <Typography
        component={ Link } sx={ style.underlineText } to={ '/' }
        variant='subtitle2'
      >
        { t('common.labels.terms') }
      </Typography>
      <Typography sx={ { ml: '5px' } } variant='subtitle2'>
        { t('signup.and') }
      </Typography>
      <Typography
        component={ Link } sx={ style.underlineText } to={ '/' }
        variant='subtitle2'
      >
        { t('common.labels.privacyPolicy') }
      </Typography>
    </Box>
  )

  return (
    <Box component='form' onSubmit={ handleSubmit }>
      <Box sx={ { display: { md: 'block', lg: 'flex' }, gap: '15px' } }>
        <AppTextField
          autoFocus
          errorMsg={ t(errors.firstName) }
          fullWidth
          label={ t('common.labels.firstName') }
          onBlur={ handleBlur('firstName') }
          onChange={ handleChange('firstName') }
          required
          size='large'
          sx={ { mb: '5px' } }
          type='text'
          value={ data.firstName }
        />

        <AppTextField
          errorMsg={ t(errors.lastName) }
          fullWidth
          label={ t('common.labels.lastName') }
          onBlur={ handleBlur('lastName') }
          onChange={ handleChange('lastName') }
          required
          size='large'
          sx={ { mb: '5px' } }
          type='text'
          value={ data.lastName }
        />
      </Box>

      <AppTextField
        errorMsg={ t(errors.email) }
        fullWidth
        label={ t('common.labels.email') }
        onBlur={ handleBlur('email') }
        onChange={ handleChange('email') }
        required
        size='large'
        sx={ { mb: '5px' } }
        type='email'
        value={ data.email }
      />

      <AppTextField
        InputProps={ passwordVisibility }
        errorMsg={ t(errors.password) }
        fullWidth
        label={ t('common.labels.password') }
        onBlur={ handleBlur('password') }
        onChange={ handleChange('password') }
        required
        size='large'
        sx={ { mb: '5px' } }
        type={ showPassword ? 'text' : 'password' }
        value={ data.password }
      />

      <AppTextField
        InputProps={ confirmPasswordVisibility }
        errorMsg={ t(errors.confirmPassword) }
        fullWidth
        label={ t('common.labels.confirmPassword') }
        onBlur={ handleBlur('confirmPassword') }
        onChange={ handleChange('confirmPassword') }
        required
        size='large'
        type={ showConfirmPassword ? 'text' : 'password' }
        value={ data.confirmPassword }
      />

      <Box sx={ style.checkboxContainer }>
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
        variant='contained'
      >
        { t('common.labels.signup') }
      </Button>
    </Box>
  )
}

export default SignupForm
