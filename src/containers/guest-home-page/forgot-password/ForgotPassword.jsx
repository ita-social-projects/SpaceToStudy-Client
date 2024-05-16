import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useAppDispatch } from '~/hooks/use-redux'
import useForm from '~/hooks/use-form'
import { useModalContext } from '~/context/modal-context'

import AppTextField from '~/components/app-text-field/AppTextField'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import AppButton from '~/components/app-button/AppButton'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import NotificationModal from '~/containers/guest-home-page/notification-modal/NotificationModal'
import { styles } from '~/containers/guest-home-page/forgot-password/ForgotPassword.styles'

import info from '~/assets/img/guest-home-page/info.svg'
import { AuthService } from '~/services/auth-service'
import { snackbarVariants } from '~/constants'
import { email } from '~/utils/validations/login'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'
import { ButtonVariantEnum, SizeEnum } from '~/types'

const ForgotPassword = () => {
  const { t } = useTranslation()
  const { openModal, closeModal } = useModalContext()
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const backToLogin = () => {
    openModal({ component: <LoginDialog /> })
  }

  const sendEmail = async (data) => {
    try {
      setLoading(true)
      await AuthService.forgotPassword(data)
      openModal(
        {
          component: (
            <NotificationModal
              buttonTitle={t('common.confirmButton')}
              description={description}
              img={info}
              onClose={closeModal}
              title={t('login.passwordReset')}
            />
          )
        },
        5000
      )
    } catch (e) {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: getErrorKey(e.response.data)
        })
      )
    } finally {
      setLoading(false)
    }
  }

  const { handleSubmit, handleInputChange, handleBlur, errors, data } = useForm(
    {
      onSubmit: async () => sendEmail(data),
      initialValues: { email: '' },
      validations: { email }
    }
  )

  const description = (
    <Typography component='span'>
      {t('login.weSentEmail')}
      <Typography component='span' variant='subtitle2'>
        {data.email}
      </Typography>
      {t('login.emailArrive')}
    </Typography>
  )

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
          size='large'
          sx={{ mb: '16px', mt: '32px' }}
          type='email'
          value={data.email}
        />
        <AppButton loading={loading} sx={styles.sentPassword} type='submit'>
          {t('login.sendPassword')}
        </AppButton>
      </Box>

      <AppButton
        onClick={backToLogin}
        size={SizeEnum.Large}
        sx={styles.backButton}
        variant={ButtonVariantEnum.Text}
      >
        {t('login.backToLogin')}
      </AppButton>
    </Box>
  )
}

export default ForgotPassword
