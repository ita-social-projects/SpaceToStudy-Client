import { useTranslation } from 'react-i18next'
import { Button, Dialog, DialogActions, DialogContent, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { style } from '~/components/confirm-dialog/confirm-dialog.style'

const ConfirmDialog = ({ message, title, open, onConfirm, onDismiss }) => {
  const { t } = useTranslation()

  return (
    <Dialog
      PaperProps={ { sx: style.root } } data-testid='confirmDialog' onClose={ onDismiss }
      open={ open }
    >
      <Typography sx={ style.title } variant='h6'>
        { t(title) }
      </Typography>
      <IconButton onClick={ onDismiss } sx={ style.icon }>
        <CloseIcon />
      </IconButton>
      <DialogContent dividers sx={ style.content }>
        <Typography variant='subtitle1'>
          { t(message) }
        </Typography>
      </DialogContent>
      <DialogActions sx={ style.actions }>
        <Button onClick={ onConfirm } size='large' variant='tonal'>
          { t('common.yes') }
        </Button>
        <Button onClick={ onDismiss } size='large' variant='contained'>
          { t('common.no') }
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
