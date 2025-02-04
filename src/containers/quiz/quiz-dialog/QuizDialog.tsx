import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import CloseRounded from '@mui/icons-material/CloseRounded'

import { IconButton } from '~/design-system/components/icon-button/IconButton'
import Button from '~/design-system/components/button/Button'

import styles from '~/containers/quiz/quiz-dialog/QuizDialog.styles'

type QuizDialogProps = {
  open: boolean
  icon: React.ReactNode
  title: string
  description: string
  actionText: string
  descriptionParams?: Record<string, string>
  secondaryActionText?: string
  onAction: () => void
  onSecondaryAction?: () => void
  onClose?: () => void
}

const QuizDialog: React.FC<QuizDialogProps> = ({
  open,
  icon,
  title,
  description,
  actionText,
  descriptionParams,
  secondaryActionText,
  onAction,
  onSecondaryAction,
  onClose
}) => {
  const { t } = useTranslation()

  return (
    <Dialog PaperProps={{ sx: styles.wrapper }} open={open}>
      <Box sx={styles.body}>
        <Box sx={styles.titleWrapper}>
          {icon}
          <DialogTitle sx={styles.title}>{t(title)}</DialogTitle>
        </Box>
        <DialogContent sx={styles.description}>
          {t(description, descriptionParams)}
        </DialogContent>
      </Box>
      <DialogActions sx={styles.actions}>
        {onClose && (
          <IconButton onClick={onClose} sx={styles.closeButton}>
            <CloseRounded />
          </IconButton>
        )}
        {onSecondaryAction && (
          <Button onClick={onSecondaryAction} variant='tonal'>
            {secondaryActionText && t(secondaryActionText)}
          </Button>
        )}
        <Button onClick={onAction}>{t(actionText)}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default QuizDialog
