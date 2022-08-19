import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { style } from './emailConfirmationModal.style'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import imgSuccess from '~/assets/img/email-confirmation-modals/success-icon.svg'
import imgReject from '~/assets/img/email-confirmation-modals/not-success-icon.svg'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import useAxios from '~/hooks/use-axios'
import { AuthService } from '~/services/auth-service'
import Loader from '~/components/loader/Loader'

const EmailConfirmModal = ( { confirmToken, setModal } ) => {

  const { t } = useTranslation()

  const serviceFunction = useCallback(() => AuthService.confirmEmail(confirmToken), [confirmToken])

  const { response, error, loading } = useAxios( { service: serviceFunction } )

  const openLoginDialog = () => {
    setModal(<LoginDialog />)
  }

  if (loading) {
    return (
      <Box>
        <Loader size={ 100 } />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={ style.box }>
        <Box>
          <Box
            alt="email-reject-icon"
            component="img"
            src={ imgReject }
          />
          <Typography
            component="h2" data-testid='reject-message'
            style={ style.message }
            variant="h6"
          >
            { t('modals.emailNotConfirm') }
          </Typography>
          <Button
            color='primary' data-testid='toLoginButton' onClick={ openLoginDialog }
            size="large"
            style={ style.button }
            variant="contained"
          >
            { t('button.goToLogin') }
          </Button>
        </Box>
      </Box>
    )
  }

  if (response) {
    return (
      <Box sx={ style.box }>
        <Box>
          <Box
            alt="email-confirm-icon"
            component="img"
            src={ imgSuccess }
          />
          <Typography
            component="h2" data-testid='confirm-message'
            style={ style.message }
            variant="h6"
          >
            { t('modals.emailConfirm') }
          </Typography>
          <Button
            color='primary' onClick={ openLoginDialog } size="large"
            style={ style.button }
            variant="contained"
          >
            { t('button.goToLogin') }
          </Button>
        </Box>
      </Box>
    )
  }

}

export default EmailConfirmModal
