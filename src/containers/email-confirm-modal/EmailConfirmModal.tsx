import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import Loader from '~/components/loader/Loader'
import AppButton from '~/components/app-button/AppButton'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import { styles } from '~/containers/email-confirm-modal/EmailConfirmModal.styles'

import imgSuccess from '~/assets/img/email-confirmation-modals/success-icon.svg'
import imgReject from '~/assets/img/email-confirmation-modals/not-success-icon.svg'

import { AuthService } from '~/services/auth-service'
import { ButtonVariantEnum } from '~/types'
import useAxios from '~/hooks/use-axios'
import { Component, useModalContext } from '~/context/modal-context'

interface EmailConfirmModalProps {
  confirmToken: string
  openModal: (component: Component, delayToClose?: number) => void
}

const EmailConfirmModal = ({
  confirmToken,
  openModal
}: EmailConfirmModalProps) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()

  const serviceFunction = useCallback(
    () => AuthService.confirmEmail(confirmToken),
    [confirmToken]
  )

  const { response, error, loading } = useAxios({
    service: serviceFunction,
    defaultResponse: null
  })

  const openLoginDialog = () => {
    openModal({ component: <LoginDialog /> })
  }

  if (loading) {
    return <Loader size={100} />
  }

  if (
    (error && error.code === 'BAD_CONFIRM_TOKEN') ||
    (error && error.code === 'DOCUMENT_NOT_FOUND' && response === null)
  ) {
    return (
      <Box sx={styles.box}>
        <ImgTitleDescription
          description={t('modals.emailReject.badToken')}
          img={imgReject}
          style={styles}
          title={t('modals.emailNotConfirm')}
        />
        <AppButton
          onClick={closeModal}
          sx={styles.button}
          variant={ButtonVariantEnum.Contained}
        >
          {t('common.confirmButton')}
        </AppButton>
      </Box>
    )
  }

  if (error && error.code === 'EMAIL_ALREADY_CONFIRMED') {
    return (
      <Box sx={styles.box}>
        <ImgTitleDescription
          description={t('modals.emailReject.alreadyConfirmed')}
          img={imgReject}
          style={styles}
          title={t('modals.emailAlreadyConfirm')}
        />
        <AppButton
          onClick={openLoginDialog}
          sx={styles.button}
          variant={ButtonVariantEnum.Contained}
        >
          {t('common.confirmButton')}
        </AppButton>
      </Box>
    )
  }

  if (response !== null) {
    return (
      <Box sx={styles.box}>
        <ImgTitleDescription
          img={imgSuccess}
          style={styles}
          title={t('modals.emailConfirm')}
        />
        <AppButton
          onClick={openLoginDialog}
          sx={styles.button}
          variant={ButtonVariantEnum.Contained}
        >
          {t('button.goToLogin')}
        </AppButton>
      </Box>
    )
  }
}

export default EmailConfirmModal
