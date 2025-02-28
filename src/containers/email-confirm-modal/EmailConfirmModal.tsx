import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import Loader from '~/components/loader/Loader'
import Button from '~scss-components/button/Button'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import { styles } from '~/containers/email-confirm-modal/EmailConfirmModal.styles'

import imgSuccess from '~/assets/img/email-confirmation-modals/success-icon.svg'
import imgReject from '~/assets/img/email-confirmation-modals/not-success-icon.svg'

import { AuthService } from '~/services/auth-service'
import useQuery from '~/hooks/use-query'
import { type Component, useModalContext } from '~/context/modal-context'

interface EmailConfirmModalProps {
  confirmToken: string
  openModal: (component: Component) => void
}

const EmailConfirmModal: React.FC<EmailConfirmModalProps> = ({
  confirmToken,
  openModal
}) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()

  const serviceFunction = useCallback(() => {
    return AuthService.confirmEmail(confirmToken)
  }, [confirmToken])

  const { isLoading, error } = useQuery({
    queryFn: serviceFunction,
    queryKey: ['confirm-token'],
    options: {
      refetchOnWindowFocus: false,
      retry: false
    }
  })

  const openLoginDialog = () => {
    openModal({ component: <LoginDialog /> })
  }

  if (isLoading) {
    return (
      <Box sx={styles.box}>
        <Loader size={100} />
      </Box>
    )
  }

  if (!error) {
    return (
      <Box sx={styles.box}>
        <ImgTitleDescription
          img={imgSuccess}
          style={styles}
          title={t('modals.emailConfirm')}
        />
        <Button onClick={openLoginDialog} size='lg' sx={styles.button}>
          {t('button.goToLogin')}
        </Button>
      </Box>
    )
  }

  if (error.code === 'BAD_CONFIRM_TOKEN') {
    return (
      <Box sx={styles.box}>
        <ImgTitleDescription
          description={t('modals.emailReject.badToken')}
          img={imgReject}
          style={styles}
          title={t('modals.emailNotConfirm')}
        />
        <Button onClick={closeModal} size='lg' sx={styles.button}>
          {t('common.confirmButton')}
        </Button>
      </Box>
    )
  }

  if (error.code === 'EMAIL_ALREADY_CONFIRMED') {
    return (
      <Box sx={styles.box}>
        <ImgTitleDescription
          description={t('modals.emailReject.alreadyConfirmed')}
          img={imgReject}
          style={styles}
          title={t('modals.emailAlreadyConfirm')}
        />
        <Button onClick={openLoginDialog} size='lg' sx={styles.button}>
          {t('button.goToLogin')}
        </Button>
      </Box>
    )
  }
}

export default EmailConfirmModal
