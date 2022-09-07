import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import HashLink from '~/components/hash-link/HashLink'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import useInputVisibility from '~/hooks/use-input-visibility'
import AppTextField from '~/components/app-text-field/AppTextField'
import { routes } from '~/constants/routes'

import { style } from './SignupForm.styles'

const SignupForm = ({ handleSubmit, handleChange, handleBlur, data, errors, closeModal }) => {
  const { t } = useTranslation()
  const { privacyPolicy, termOfUse } = routes
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const { inputVisibility: passwordVisibility, showInputText: showPassword } = useInputVisibility(errors.password)
  const { inputVisibility: confirmPasswordVisibility, showInputText: showConfirmPassword } = useInputVisibility(
    errors.confirmPassword
  )

  const handleOnAgreementChange = () => {
    setButtonDisabled(!buttonDisabled)
  }

  const policyAgreement = (
    <Box sx={ style.box }>
      <Typography variant='subtitle2'>
        { t('signup.iAgree') }
      </Typography>
      <Typography
        component={ HashLink }
        onClick={ closeModal }
        sx={ style.underlineText }
        to={ termOfUse.route }
        variant='subtitle2'
      >
        { t('common.labels.terms') }
      </Typography>
      <Typography sx={ { ml: '5px' } } variant='subtitle2'>
        { t('signup.and') }
      </Typography>
      <Typography
        component={ HashLink }
        onClick={ closeModal }
        sx={ style.underlineText }
        to={ privacyPolicy.route }
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
          onChange={ handleOnAgreementChange }
          size='large'
          sx={ style.checkboxLabel }
          variant='subtitle2'
        />
      </Box>

      <Button
        disabled={ buttonDisabled } size='large' sx={ style.signupButton }
        type='submit' variant='contained'
      >
        { t('common.labels.signup') }
      </Button>
    </Box>
  )
}

export default SignupForm
