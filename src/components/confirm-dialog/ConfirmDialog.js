import { useTranslation } from 'react-i18next'
import { Button, Dialog, DialogActions, DialogContent, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const ConfirmDialog = ({ message, title, open, onConfirm, onDismiss }) => {
  const { t } = useTranslation()

  return (
    <Dialog onClose={ onDismiss } open={ open }>
      <Typography sx={ { p: '13px 16px' } } variant="h6">
        { t(title) }
      </Typography>
      <IconButton data-testid='closeIcon' onClick={ onDismiss } sx={ { position: 'absolute', right: 16, top: 16, p: 0 } }>
        <CloseIcon />
      </IconButton>
      <DialogContent dividers sx={ { p: 2 } }>
        <Typography variant="subtitle1">
          { t(message) }
        </Typography>
      </DialogContent>
      <DialogActions sx={ { p: '12px' } }>
        <Button onClick={ onConfirm } size="large" variant="tonal">
          { t('common.yes') }
        </Button>
        <Button onClick={ onDismiss } size="large" variant="contained">
          { t('common.no') }
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
