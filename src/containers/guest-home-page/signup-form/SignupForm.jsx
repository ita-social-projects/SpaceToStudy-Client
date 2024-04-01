import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import HashLink from '~/components/hash-link/HashLink'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import useInputVisibility from '~/hooks/use-input-visibility'
import AppTextField from '~/components/app-text-field/AppTextField'
import { guestRoutes } from '~/router/constants/guestRoutes'
import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/containers/guest-home-page/signup-form/SignupForm.styles'

const SignupForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  data,
  errors
}) => {
  const { t } = useTranslation()
  const { privacyPolicy, termOfUse } = guestRoutes
  const [isAgreementChecked, setIsAgreementChecked] = useState(false)
  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)
  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors.confirmPassword)
  const { authLoading } = useSelector((state) => state.appMain)

  const handleOnAgreementChange = () => {
    setIsAgreementChecked((prev) => !prev)
  }

  const isValid = useMemo(
    () =>
      Object.values(errors).every((elem) => elem === '') &&
      Object.values(data).every((elem) => elem !== ''),
    [data, errors]
  )

  const policyAgreement = (
    <Box sx={styles.box}>
      <Typography variant='subtitle2'>{t('signup.iAgree')}</Typography>
      <Typography
        component={HashLink}
        rel='noopener noreferrer'
        sx={styles.underlineText}
        target='_blank'
        to={termOfUse.path}
        variant='subtitle2'
      >
        {t('common.labels.terms')}
      </Typography>
      <Typography sx={{ ml: '5px' }} variant='subtitle2'>
        {t('signup.and')}
      </Typography>
      <Typography
        component={HashLink}
        rel='noopener noreferrer'
        sx={styles.underlineText}
        target='_blank'
        to={privacyPolicy.path}
        variant='subtitle2'
      >
        {t('common.labels.privacyPolicy')}
      </Typography>
    </Box>
  )

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Box sx={{ display: { md: 'block', lg: 'flex' }, gap: '15px' }}>
        <AppTextField
          autoFocus
          errorMsg={t(errors.firstName)}
          fullWidth
          label={t('common.labels.firstName')}
          onBlur={handleBlur('firstName')}
          onChange={handleChange('firstName')}
          required
          sx={{ mb: '5px' }}
          type='text'
          value={data.firstName}
        />

        <AppTextField
          errorMsg={t(errors.lastName)}
          fullWidth
          label={t('common.labels.lastName')}
          onBlur={handleBlur('lastName')}
          onChange={handleChange('lastName')}
          required
          sx={{ mb: '5px' }}
          type='text'
          value={data.lastName}
        />
      </Box>

      <AppTextField
        errorMsg={t(errors.email)}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        required
        sx={{ mb: '5px' }}
        type='email'
        value={data.email}
      />

      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={t(errors.password)}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        required
        sx={{ mb: '5px' }}
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />

      <AppTextField
        InputProps={confirmPasswordVisibility}
        errorMsg={t(errors.confirmPassword)}
        fullWidth
        label={t('common.labels.confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleChange('confirmPassword')}
        required
        type={showConfirmPassword ? 'text' : 'password'}
        value={data.confirmPassword}
      />

      <Box sx={styles.checkboxContainer}>
        <FormControlLabel
          control={<Checkbox />}
          label={policyAgreement}
          labelPlacement='end'
          onChange={handleOnAgreementChange}
          sx={styles.checkboxLabel}
          value={isAgreementChecked}
        />
      </Box>

      <AppButton
        disabled={!isValid || !isAgreementChecked}
        loading={authLoading}
        sx={styles.signupButton}
        type='submit'
      >
        {t('common.labels.signup')}
      </AppButton>
    </Box>
  )
}

export default SignupForm
