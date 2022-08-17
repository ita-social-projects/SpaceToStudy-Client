import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { style } from './email-confirmation-modal.style'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ModalContext } from '~/context/modal-context'
import imgSuccess from '~/assets/img/email-confirmation-modals/success-icon.svg'
import imgReject from '~/assets/img/email-confirmation-modals/not-success-icon.svg'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import useAxios from '~/hooks/use-axios'
import { AuthService } from '~/services/auth-service'

const EmailConfirmModal = ( { confirmToken } ) => {

  const [message, setMessage] = useState()
  const [statusImage, setStatusImage] = useState()
  const { setModal } = useContext(ModalContext)
  const { t } = useTranslation()

  const { response, error, loading, fetchData } = useAxios( { service: () => AuthService.confirmEmail(confirmToken) } )
  // useEffect(() => {
  //   console.log(response, ' : response from useAxios')
  //   console.log(error, ' : error from useAxios')
  //   console.log(loading, ' : loading from useAxios')
  //   console.log(fetchData(), ' : fetchData from useAxios')
  // }, [loading])
  // TODO: fix infinite rerender, and as a cause - infinite call of useAxios

  useEffect(() => {
    if (error) {
      setMessage('Your email has not been verified!')
      setStatusImage(imgReject)
    } else if (loading) {
      setStatusImage()
    } else if (response) {
      if (response.data.status === 204) {
        setMessage('Your email has been successfully verified!')
        setStatusImage(imgSuccess)
      } else if (response.data.status === 400) {
        setMessage('The confirm token is either invalid or has expired!')
        setStatusImage(imgReject)
      }
    }
  }, [response])

  const openLoginDialog = () => {
    setModal(<LoginDialog />)
  }

  return (
    <Box sx={ style.box }>
      <Box>
        { /*{ loading ?*/ }
        { /*  <Loader size={ 20 } />*/ }
        { /*  :*/ }
        { /*  (<Box*/ }
        { /*    alt="email-confirm-icon"*/ }
        { /*    component="img"*/ }
        { /*    src={ statusImage }*/ }
        { /*  />) */ }
        { /*} //TODO fix eslint error - "The closing bracket must be aligned with the opening tag" */ }
        <Box
          alt="email-confirm-icon"
          component="img"
          src={ statusImage }
        />
        <Typography
          component="h2" id="modal-modal-title" style={ style.message }
          variant="h6"
        >
          { message }
          { /*{ t('modals.emailConfirm') }*/ }
          { /*{ t('modals.emailNotConfirm') }*/ }
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

export default EmailConfirmModal
