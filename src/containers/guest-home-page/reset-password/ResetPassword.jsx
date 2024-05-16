import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import useInputVisibility from '~/hooks/use-input-visibility'

import { AuthService } from '~/services/auth-service'
import { useAppDispatch } from '~/hooks/use-redux'

import Box from '@mui/material/Box'

import Loader from '~/components/loader/Loader'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import { styles } from '~/containers/guest-home-page/reset-password/ResetPassword.styles'

import { ButtonVariantEnum, SizeEnum } from '~/types'
import { confirmPassword, password } from '~/utils/validations/login'
import { snackbarVariants } from '~/constants'
import imgSuccess from '~/assets/img/email-confirmation-modals/success-icon.svg'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

const ResetPassword = ({ resetToken, openModal }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const successNotification = useMemo(
    () => (
      <Box sx={styles.box}>
        <ImgTitleDescription
          img={imgSuccess}
          style={styles}
          title={t('login.successReset')}
        />
        <AppButton
          onClick={() => openModal({ component: <LoginDialog /> })}
          size={SizeEnum.Large}
          sx={styles.button}
          variant={ButtonVariantEnum.Contained}
        >
          {t('button.goToLogin')}
        </AppButton>
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
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: getErrorKey(error)
        })
      )
    } else if (response !== null) {
      openModal({ component: successNotification }, 5000)
    }
  }, [error, openModal, response, dispatch, successNotification])

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
        description={t('login.prevPassMatch')}
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
        <AppButton
          disabled={loading}
          fullWidth
          size={SizeEnum.Large}
          type='submit'
          variant={ButtonVariantEnum.Contained}
        >
          {loading ? <Loader size={20} /> : t('login.savePassword')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default ResetPassword
