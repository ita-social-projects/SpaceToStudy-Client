import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'

import Button from '~scss-components/button/Button'
import { styles } from '~/components/confirm-dialog/ConfirmDialog.styles'
import { IconButton } from '~/design-system/components/icon-button/IconButton'

import { Box } from '@mui/material'

interface ConfirmDialogProps {
  message: string
  title: string
  confirmButton?: string
  cancelButton?: string
  revertButtons?: boolean
  open: boolean
  onConfirm: () => void
  onDismiss: () => void
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  message,
  title,
  confirmButton,
  cancelButton,
  revertButtons = false,
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
      <Box sx={styles.header}>
        <Typography sx={styles.title}>{t(title)}</Typography>
        <IconButton onClick={onDismiss} sx={styles.icon}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={styles.content}>
        <Typography>{t(message)}</Typography>
      </DialogContent>
      <DialogActions sx={styles.actions(revertButtons)}>
        <Button onClick={onDismiss} variant='tonal'>
          {cancelButton || t('common.no')}
        </Button>
        <Button onClick={onConfirm}>{confirmButton || t('common.yes')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
