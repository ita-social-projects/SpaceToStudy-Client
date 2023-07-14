import { useTranslation } from 'react-i18next'

import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/components/confirm-dialog/ConfirmDialog.styles'

const ConfirmDialog = ({
  message,
  title,
  confirmButton,
  cancelButton,
  open,
  onConfirm,
  onDismiss
}) => {
  const { t } = useTranslation()

  return (
    <Dialog
      PaperProps={{ sx: styles.root }}
      data-testid='confirmDialog'
      onClose={onDismiss}
      open={open}
    >
      <Typography sx={styles.title}>{t(title)}</Typography>
      <IconButton onClick={onDismiss} sx={styles.icon}>
        <CloseIcon />
      </IconButton>
      <DialogContent sx={styles.content}>
        <Typography>{t(message)}</Typography>
      </DialogContent>
      <DialogActions sx={styles.actions}>
        <AppButton onClick={onConfirm}>
          {confirmButton ? confirmButton : t('common.yes')}
        </AppButton>
        <AppButton onClick={onDismiss} variant={'tonal'}>
          {cancelButton ? cancelButton : t('common.no')}
        </AppButton>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
