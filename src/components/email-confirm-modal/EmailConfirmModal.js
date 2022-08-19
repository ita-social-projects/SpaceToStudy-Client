import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { style } from './email-confirmation-modal.style'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import imgSuccess from '~/assets/img/email-confirmation-modals/success-icon.svg'
import imgReject from '~/assets/img/email-confirmation-modals/not-success-icon.svg'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import useAxios from '~/hooks/use-axios'
import { AuthService } from '~/services/auth-service'
import Loader from '~/components/loader/Loader'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

const EmailConfirmModal = ( { confirmToken, setModal } ) => {

  const { t } = useTranslation()

  const serviceFunction = useCallback(() => AuthService.confirmEmail(confirmToken), [confirmToken])

  const { response, error, loading } = useAxios( { service: serviceFunction } )

  const openLoginDialog = () => {
    setModal(<LoginDialog />)
  }

  if (loading) {
    return (
      <Loader size={ 100 } />
    )
  }

  if (error && error.response.data.code === 'BAD_CONFIRM_TOKEN') {
    return (
      <Box sx={ style.box }>
        <ImgTitleDescription
          description={ t('modals.emailReject-badToken') }
          img={ imgReject }
          style={ style }
          title={ t('modals.emailNotConfirm') }
        />
      </Box>
    )
  }

  if (error && error.response.data.code === 'EMAIL_ALREADY_CONFIRMED') {
    return (
      <Box sx={ style.box }>
        <ImgTitleDescription
          description={ t('modals.emailReject-alreadyConfirmed') }
          img={ imgReject }
          style={ style }
          title={ t('modals.emailNotConfirm') }
        />
      </Box>
    )
  }

  if (response) {
    return (
      <Box sx={ style.box }>
        <ImgTitleDescription
          img={ imgSuccess }
          style={ style }
          title={ t('modals.emailConfirm') }
        />
        <Button
          color='primary' onClick={ openLoginDialog } size="large"
          style={ style.button }
          variant="contained"
        >
          { t('button.goToLogin') }
        </Button>
      </Box>
    )
  }

}

export default EmailConfirmModal
