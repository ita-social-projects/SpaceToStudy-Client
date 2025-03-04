import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import useForm from '~/hooks/use-form'
import useMutation from '~/hooks/use-mutation'
import useInputVisibility from '~/hooks/use-input-visibility'

import { AuthService } from '~/services/auth-service'

import Box from '@mui/material/Box'

import Button from '~scss-components/button/Button'
import AppTextField from '~/components/app-text-field/AppTextField'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import { styles } from '~/containers/guest-home-page/reset-password/ResetPassword.styles'

import { ButtonTypeEnum, type NewPassword } from '~/types'
import { confirmPassword, password } from '~/utils/validations/login'
import imgSuccess from '~/assets/img/email-confirmation-modals/success-icon.svg'
import { type Component } from '~/context/modal-context'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'

interface ResetPasswordProps {
  resetToken: string
  openModal: (component: Component) => void
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
  resetToken,
  openModal
}) => {
  const { t } = useTranslation()
  const { handleErrorAlert } = useSnackbarAlert()

  const handleResetPassword = useCallback(
    (password: string) => {
      return AuthService.resetPassword(resetToken, password)
    },
    [resetToken]
  )

  const handleSuccess = useCallback(() => {
    openModal({
      component: (
        <Box sx={styles.box}>
          <ImgTitleDescription
            img={imgSuccess}
            style={styles}
            title={t('login.successReset')}
          />
          <Button
            onClick={() => openModal({ component: <LoginDialog /> })}
            size='lg'
            sx={styles.button}
          >
            {t('button.goToLogin')}
          </Button>
        </Box>
      )
    })
  }, [openModal, t])

  const { isPending, mutate: resetPassword } = useMutation({
    mutationFn: handleResetPassword,
    onSuccess: handleSuccess,
    onError: handleErrorAlert
  })

  const { handleSubmit, handleInputChange, handleBlur, errors, data } =
    useForm<NewPassword>({
      onSubmit: (data) => {
        if (data) {
          resetPassword(data.password)
        }
      },
      initialValues: { password: '', confirmPassword: '' },
      validations: { password, confirmPassword },
      submitWithData: true
    })

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
          sx={{ mb: '5px' }}
          type={showConfirmPassword ? 'text' : 'password'}
          value={data.confirmPassword}
        />
        <Button
          fullWidth
          loading={isPending}
          size='lg'
          type={ButtonTypeEnum.Submit}
        >
          {t('login.savePassword')}
        </Button>
      </Box>
    </Box>
  )
}

export default ResetPassword
