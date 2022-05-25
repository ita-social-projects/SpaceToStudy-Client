import { Dialog, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Box } from '@mui/system'
import useConfirm from '~/hooks/use-confirm'

const Modal = ({ content, closeModal }) => {
  const { checkConfirmation } = useConfirm()

  const onClose = async () => {
    const confirmed = await checkConfirmation({
      message: 'questions.confirmation',
      title: 'titles.confirmTitle' 
    })
    if (confirmed) {
      closeModal()
    }
  }

  return (
    <Dialog maxWidth="xl" onClose={ onClose } open>
      <Box sx={ { p: 2 } }>
        <IconButton onClick={ onClose } sx={ { float: 'right' } }>
          <CloseIcon />
        </IconButton>
        <Box>
          { content }
        </Box>
      </Box>
    </Dialog>
  )
}

export default Modal
