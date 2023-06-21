import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'

import { styles } from '~/components/confirm-dialog/ConfirmDialog.styles'

interface ConfirmDialogProps {
  message: string
  title: string
  mainBtnTitle?: string
  secondaryBtnTitle?: string
  open: boolean
  onConfirm: () => void
  onDismiss: () => void
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  message,
  title,
  mainBtnTitle,
  secondaryBtnTitle,
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
      <Typography sx={styles.title} variant='h6'>
        {t(title)}
      </Typography>
      <IconButton onClick={onDismiss} sx={styles.icon}>
        <CloseIcon />
      </IconButton>
      <DialogContent sx={styles.content}>
        <Typography variant='subtitle1'>{t(message)}</Typography>
      </DialogContent>
      <DialogActions sx={styles.actions}>
        <Button onClick={onConfirm} size='large' variant='tonal'>
          {secondaryBtnTitle ? secondaryBtnTitle : t('common.yes')}
        </Button>
        <Button onClick={onDismiss} size='large' variant='contained'>
          {mainBtnTitle ? mainBtnTitle : t('common.no')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
