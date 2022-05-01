import React from 'react'
import { Dialog, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Box } from '@mui/system'

const Modal = ({ content, closeModal }) => {
  return (
    <Dialog maxWidth="xl" onClose={ closeModal } open >
      <Box sx={ { p: 2 } }>
        <IconButton onClick={ closeModal } sx={ { float: 'right' } } >
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
