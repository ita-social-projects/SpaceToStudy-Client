import { useState, useLayoutEffect } from 'react'
import { Dialog, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Box } from '@mui/system'
import useConfirm from '~/hooks/use-confirm'

const style = {
  box: {
    margin: { xs: '10px auto', sm: 0 },
    padding: { xs: 0, sm: 2 }
  },
  icon: { float: 'right', }
}

const Modal = ({ content, closeModal }) => {
  const [width, setWidth] = useState(window.innerWidth)
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
 
  useLayoutEffect(() => {
    const getWindowWidth = () => setWidth(window.innerWidth)
    
    window.addEventListener('resize', getWindowWidth)
    return () => {
      window.removeEventListener('resize', getWindowWidth)
    }
  }, [])

  return (
    <Dialog
      fullScreen={ (width < 600) }
      maxWidth="xl" onClose={ onClose }
      open
    >
      <Box sx={ style.box }>
        <IconButton onClick={ onClose } sx={ style.icon }>
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
