import { Button, Dialog, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import { style } from './email-confirmation-modal.style'
import { useContext, useEffect, useState } from 'react'
import imgSuccess from '~/assets/img/email-confirmation-modals/success-icon.svg'
import imgReject from '~/assets/img/email-confirmation-modals/not-success-icon.svg'
import { styles } from '~/pages/error/styles/bad-request.styles'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import { ModalContext } from '~/context/modal-context'
import { useTranslation } from 'react-i18next'
import useAxios from '~/hooks/use-axios'
import { confirmService } from '~/services/confirm-service'

const EmailConfirmModal = ( { confirmToken } ) => {
  console.log( confirmToken , 'confirmToken inside EmailConfirmModal')
  const [open, setOpen] = useState(true)
  const [message, setMessage] = useState()
  const [statusImage, setStatusImage] = useState(imgSuccess)
  const [isLoading, setIsLoading] = useState(false)
  const { setModal } = useContext(ModalContext)
  const { t } = useTranslation()

  //TODO: useAxios - u need to check what has come from confirmToken
  const { response, error, loading, fetchData } = useAxios( { confirmService } )
  // useEffect(() => {
  //   console.log(response, ' : response from useAxios')
  //   console.log(error, ' : error from useAxios')
  //   console.log(loading, ' : loading from useAxios')
  //   console.log(fetchData(), ' : fetchData from useAxios')
  // }, [])

  useEffect(() => {
    if (error) {
      setMessage('Your email has not been verified!')
      setStatusImage(imgReject)
    } else if (loading) {
      setIsLoading(true)
    } else if (response) {
      setMessage('Your email has been successfully verified!')
      setStatusImage(imgSuccess)
    }
  }, [response])

  const close = () => {
    setOpen(false)
  }
  
  const openLoginDialog = () => {
    setModal(<LoginDialog />)
    close()
  }

  return (
    <Dialog
      PaperProps={ {
        style: {
          boxShadow: 'none',
          width: '744px',
          height: '396px',
          borderRadius: '8px',
        },
      } }
      onClose={ close }
      open={ open }
      sx={ style.dialog }
    >
      <Box sx={ style.box }>
        <IconButton
          aria-label="close"
          onClick={ close }
          sx={ {
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          } }
        >
          <CloseIcon />
        </IconButton>
        <Box>
          { /*TODO: here add positive-scenario-image, error, negative*/ }
          <Box
            alt="email-confirm-icon"
            component="img"
            src={ statusImage }
            sx={ styles.img }
          />
          <Typography
            component="h2" id="modal-modal-title" style={ style.message }
            variant="h6"
          >
            { /*TODO: here add positive scenario text, error, negative*/ }

            { /*Your email has been successfully verified!*/ }
            { t('modals.emailConfirm') }
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
    </Dialog>
  )
}

export default EmailConfirmModal
