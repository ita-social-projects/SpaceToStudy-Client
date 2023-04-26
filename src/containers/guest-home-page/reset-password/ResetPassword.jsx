import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import useInputVisibility from '~/hooks/use-input-visibility'

import { AuthService } from '~/services/auth-service'
import { useSnackBarContext } from '~/context/snackbar-context'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import AppTextField from '~/components/app-text-field/AppTextField'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import LoginDialog from '../login-dialog/LoginDialog'
import Loader from '~/components/loader/Loader'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

import { confirmPassword, password } from '~/utils/validations/login'
import { snackbarVariants } from '~/constants'
import { styles } from './ResetPassword.styles'
import imgSuccess from '~/assets/img/email-confirmation-modals/success-icon.svg'

const ResetPassword = ({ resetToken, openModal }) => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()

  const successNotification = useMemo(
    () => (
      <Box sx={styles.box}>
        <ImgTitleDescription
          img={imgSuccess}
          style={styles}
          title={t('login.sucsessReset')}
        />
        <Button
          color='primary'
          onClick={() => openModal({ component: <LoginDialog /> })}
          size='large'
          style={styles.button}
          variant='contained'
        >
          {t('button.goToLogin')}
        </Button>
      </Box>
    ),
    [openModal, t]
  )

  const {
    response,
    error,
    loading,
    fetchData: sendResetPassword
  } = useAxios({
    service: (newPassword) =>
      AuthService.resetPassword(resetToken, newPassword),
    fetchOnMount: false,
    defaultResponse: null
  })

  useEffect(() => {
    if (error) {
      setAlert({
        severity: snackbarVariants.error,
        message: `errors.${error.code}`
      })
    } else if (response !== null) {
      openModal({ component: successNotification }, 5000)
    }
  }, [error, openModal, response, setAlert, successNotification])

  const { handleSubmit, handleInputChange, handleBlur, errors, data } = useForm(
    {
      onSubmit: () => sendResetPassword({ password: data.password }),
      initialValues: { password: '', confirmPassword: '' },
      validations: { password, confirmPassword }
    }
  )

  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)
  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors.confirmPassword)

  return (
    <Box sx={styles.container}>
      <TitleWithDescription
        description={t('login.resetPasswordDesc')}
        style={styles.titleWithDescription}
        title={t('login.newPassword')}
      />
      <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
        <AppTextField
          InputProps={passwordVisibility}
          errorMsg={t(errors.password)}
          fullWidth
          label={t('common.labels.password')}
          onBlur={handleBlur('password')}
          onChange={handleInputChange('password')}
          required
          size='large'
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
          onChange={handleInputChange('confirmPassword')}
          required
          size='large'
          type={showConfirmPassword ? 'text' : 'password'}
          value={data.confirmPassword}
        />
        <Button
          disabled={loading}
          fullWidth
          size='large'
          type='submit'
          variant='contained'
        >
          {loading ? <Loader size={20} /> : t('login.savePassword')}
        </Button>
      </Box>
    </Box>
  )
}

export default ResetPassword
