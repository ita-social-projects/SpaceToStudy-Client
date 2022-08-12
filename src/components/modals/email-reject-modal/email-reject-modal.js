import { Button, Dialog, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import { style } from '../email-confirmation-modal.style'
import { useState } from 'react'
import img from '~/assets/img/email-confirmation-modals/not-success-icon.svg'
import { styles } from '~/pages/error/styles/bad-request.styles'

const EmailRejectModal = () => {
  const [open, setOpen] = useState(true)

  const clickOpen = () => {
    setOpen(true)
  }

  const close = () => {
    setOpen(false)
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
          <Box
            alt="email-confirm-icon"
            component="img"
            src={ img }
            sx={ styles.img }
          />
          <Typography
            component="h2" id="modal-modal-title" style={ style.message }
            variant="h6"
          >
            Your email address has not been verified!
          </Typography>
          <Button
            color='primary' size="large" style={ style.button }
            variant="contained"
          >
            Go to login
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}

export default EmailRejectModal
