import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import useConfirm from '~/hooks/use-confirm'
import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/popup-dialog/PopupDialog.styles'

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
      message: 'questions.confirmation',
      title: 'titles.confirmTitle'
    })
    if (confirmed) closeModal()
  }

  const handleMouseOver = timerId ? () => clearTimeout(timerId) : null

  const handleMouseLeave = timerId ? () => closeModalAfterDelay() : null

  return (
    <Dialog
      PaperProps={paperProps}
      data-testid='popup'
      fullScreen={isMobile}
      maxWidth='xl'
      onClose={onClose}
      open
    >
      <Box
        data-testid='popupContent'
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        sx={styles.box}
      >
        <IconButton onClick={onClose} sx={styles.icon}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.contentWraper}>{content}</Box>
      </Box>
    </Dialog>
  )
}

export default PopupDialog
