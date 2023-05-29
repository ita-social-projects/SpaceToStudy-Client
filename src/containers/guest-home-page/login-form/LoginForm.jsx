import { useTranslation } from 'react-i18next'
import useInputVisibility from '~/hooks/use-input-visibility'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { useModalContext } from '~/context/modal-context'
import ForgotPassword from '~/containers/guest-home-page/forgot-password/ForgotPassword'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/containers/guest-home-page/login-form/LoginForm.styles'

const LoginForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  data,
  errors
}) => {
  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)

  const { authLoading } = useSelector((state) => state.appMain)

  const { openModal } = useModalContext()

  const { t } = useTranslation()

  const openForgotPassword = () => {
    openModal({ component: <ForgotPassword /> })
  }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <AppTextField
        autoFocus
        data-testid={'email'}
        errorMsg={t(errors.email)}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        required
        size='large'
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
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />

      <Typography
        component={ButtonBase}
        onClick={openForgotPassword}
        sx={styles.forgotPass}
        variant='subtitle2'
      >
        {t('login.forgotPassword')}
      </Typography>

      <AppButton
        disabled={!data.email || !data.password}
        loading={authLoading}
        sx={styles.loginButton}
        type='submit'
      >
        {t('common.labels.login')}
      </AppButton>
    </Box>
  )
}

export default LoginForm
