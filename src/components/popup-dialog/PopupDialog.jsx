import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'

import { styles } from '~/components/popup-dialog/PopupDialog.styles'
import useBreakpoints from '~/hooks/use-breakpoints'
import useConfirm from '~/hooks/use-confirm'

const PopupDialog = ({
  content,
  closeModal,
  paperProps,
  timerId,
  closeModalAfterDelay
}) => {
  const { checkConfirmation } = useConfirm()
  const { isMobile } = useBreakpoints()

  const onClose = async () => {
    const confirmed = await checkConfirmation({
      message: 'questions.unsavedChanges',
      title: 'titles.confirmTitle'
    })
    if (confirmed) closeModal()
  }

  const handleMouseOver = () => timerId && clearTimeout(timerId)
  const handleMouseLeave = () => timerId && closeModalAfterDelay()
  const handleClose = () => void onClose()

  return (
    <Dialog
      PaperProps={paperProps}
      data-testid='popup'
      disableRestoreFocus
      fullScreen={isMobile}
      maxWidth='xl'
      onClick={(e) => e.stopPropagation()}
      onClose={handleClose}
      open
    >
      <Box
        data-testid='popupContent'
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        sx={styles.box}
      >
        <IconButton onClick={handleClose} sx={styles.icon}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.contentWraper}>{content}</Box>
      </Box>
    </Dialog>
  )
}

export default PopupDialog
