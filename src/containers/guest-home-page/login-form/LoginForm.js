import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import useInputVisibility from '~/hooks/use-input-visibility'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'

import { ModalContext } from '~/context/modal-context'
import ForgotPassword from '~/containers/guest-home-page/forgot-password/ForgotPassword'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/containers/guest-home-page/login-form/LoginForm.styles'

const LoginForm = ({ handleSubmit, handleChange, handleBlur, data, errors }) => {
  const { inputVisibility: passwordVisibility, showInputText: showPassword } = useInputVisibility(errors.password)
  const { setModal } = useContext(ModalContext)
  const { loading } = useSelector((state) => state.appMain)
  const { t } = useTranslation()

  const openForgotPassword = () => {
    setModal(<ForgotPassword />)
  }

  return (
    <Box component='form' onSubmit={ handleSubmit }>
      <AppTextField
        autoFocus
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
        type={ showPassword ? 'text' : 'password' }
        value={ data.password }
      />

      <Box sx={ styles.checkboxContainer }>
        <FormControlLabel
          control={ <Checkbox /> }
          disabled
          label={ t('login.rememberMe') }
          labelPlacement='end'
          size='large'
          sx={ styles.checkboxLabel }
          variant='subtitle2'
        />
        <Typography onClick={ openForgotPassword } sx={ styles.forgotPass } variant='subtitle2'>
          { t('login.forgotPassword') }
        </Typography>
      </Box>

      <AppButton
        loading={ loading } size='large' sx={ styles.loginButton }
        type='submit' variant='contained'
      >
        { t('common.labels.login') }
      </AppButton>
    </Box>
  )
}

export default LoginForm
