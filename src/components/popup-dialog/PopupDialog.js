import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import useConfirm from '~/hooks/use-confirm'
import useBreakpoints from '~/hooks/use-breakpoints'
import { style } from '~/components/popup-dialog/PopupDialog.style'

const PopupDialog = ({ content, closeModal, isFullScreen, setFullScreen }) => {
  const { checkConfirmation } = useConfirm()
  const size = useBreakpoints()

  const onClose = async () => {
    const confirmed = await checkConfirmation({
      message: 'questions.confirmation',
      title: 'titles.confirmTitle'
    })
    if (confirmed) closeModal()
  }

  useEffect(() => {
    return () => setFullScreen(false)
  }, [setFullScreen])

  return (
    <Dialog
      data-testid='popup' fullScreen={ isFullScreen || size === 'mobile' } maxWidth='xl'
      onClose={ onClose } open
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

export default PopupDialog
