import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useAppDispatch } from '~/hooks/use-redux'
import useForm from '~/hooks/use-form'
import { useModalContext } from '~/context/modal-context'

import AppTextField from '~/components/app-text-field/AppTextField'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import Button from '~scss-components/button/Button'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import NotificationModal from '~/containers/guest-home-page/notification-modal/NotificationModal'
import { styles } from '~/containers/guest-home-page/forgot-password/ForgotPassword.styles'

import info from '~/assets/img/guest-home-page/info.svg'
import { AuthService } from '~/services/auth-service'
import { snackbarVariants } from '~/constants'
import { email } from '~/utils/validations/login'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'
import { ButtonTypeEnum, type ForgotPasswordParams } from '~/types'
import useMutation from '~/hooks/use-mutation'
import { type ResponseError } from '~/exceptions'

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation()
  const { openModal, closeModal } = useModalContext()
  const dispatch = useAppDispatch()

  const handleBackToLogin = useCallback(() => {
    openModal({ component: <LoginDialog /> })
  }, [openModal])

  const { handleSubmit, handleInputChange, handleBlur, errors, data } =
    useForm<ForgotPasswordParams>({
      onSubmit: (data) => {
        if (data) {
          sendEmail(data)
        }
      },
      initialValues: { email: '' },
      validations: { email },
      submitWithData: true
    })

  const handleSuccessSending = useCallback(() => {
    openModal({
      component: (
        <NotificationModal
          buttonTitle={t('common.confirmButton')}
          description={
            <Typography component='span'>
              {t('login.weSentEmail')}
              <Typography component='span' variant='subtitle2'>
                {data.email}
              </Typography>
              {t('login.emailArrive')}
            </Typography>
          }
          img={info}
          onClose={closeModal}
          title={t('login.passwordReset')}
        />
      )
    })
  }, [closeModal, data, openModal, t])

  const handleError = useCallback(
    (error: ResponseError) => {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: getErrorKey(error)
        })
      )
    },
    [dispatch]
  )

  const { isPending, mutate: sendEmail } = useMutation({
    mutationFn: AuthService.forgotPassword,
    onSuccess: handleSuccessSending,
    onError: handleError
  })

  return (
    <Box sx={styles.root}>
      <TitleWithDescription
        description={t('login.enterEmail')}
        style={styles.titleWithDescription}
        title={t('login.forgotPassword')}
      />
      <Box component='form' onSubmit={handleSubmit}>
        <AppTextField
          autoFocus
          errorMsg={t(errors.email)}
          fullWidth
          label={t('common.labels.email')}
          onBlur={handleBlur('email')}
          onChange={handleInputChange('email')}
          required
          sx={{ mb: '16px', mt: '32px' }}
          type='email'
          value={data.email}
        />
        <Button
          loading={isPending}
          sx={styles.sentPassword}
          type={ButtonTypeEnum.Submit}
        >
          {t('login.sendPassword')}
        </Button>
      </Box>
      <Button
        onClick={handleBackToLogin}
        size='md'
        sx={styles.backButton}
        variant='text-secondary'
      >
        {t('login.backToLogin')}
      </Button>
    </Box>
  )
}

export default ForgotPassword
