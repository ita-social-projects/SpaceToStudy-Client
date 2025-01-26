import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded'

import Button from '~/design-system/components/button/Button'

import styles from '~/containers/quiz/finish-quiz-modal/FinishQuizModal.styles'

type FinishQuizModalProps = {
  open: boolean
  handleCancel: () => void
  handleFinish: () => void
}

const FinishQuizModal = ({
  open,
  handleCancel,
  handleFinish
}: FinishQuizModalProps) => {
  const { t } = useTranslation()

  return (
    <Dialog open={open} sx={styles.dialog}>
      <Box sx={styles.body}>
        <Box sx={styles.titleWrapper}>
          <ErrorOutlineRounded />
          <DialogTitle sx={styles.title}>{t('quiz.areYouSure')}</DialogTitle>
        </Box>
        <DialogContent sx={styles.content}>{t('quiz.warning')}</DialogContent>
      </Box>
      <DialogActions sx={styles.actions}>
        <Button autoFocus onClick={handleCancel} variant='tonal'>
          {t('quiz.cancel')}
        </Button>
        <Button onClick={handleFinish}>{t('quiz.confirm')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FinishQuizModal
