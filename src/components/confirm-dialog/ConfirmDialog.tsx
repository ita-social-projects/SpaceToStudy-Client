import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import AppButton from '~/components/app-button/AppButton'
import { ButtonVariantEnum } from '~/types'

import { styles } from '~/components/confirm-dialog/ConfirmDialog.styles'

interface ConfirmDialogProps {
  message: string
  title: string
  confirmBtn?: string
  cancelBtn?: string
  open: boolean
  onConfirm: () => void
  onDismiss: () => void
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  message,
  title,
  confirmBtn = 'common.yes',
  cancelBtn = 'common.no',
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
        <AppButton onClick={onConfirm}>{t(confirmBtn)}</AppButton>
        <AppButton onClick={onDismiss} variant={ButtonVariantEnum.Tonal}>
          {t(cancelBtn)}
        </AppButton>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
