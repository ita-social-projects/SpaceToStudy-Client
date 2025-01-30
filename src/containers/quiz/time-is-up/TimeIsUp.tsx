import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import TimerOutlined from '@mui/icons-material/TimerOutlined'
import CloseRounded from '@mui/icons-material/CloseRounded'

import { IconButton } from '~/design-system/components/icon-button/IconButton'
import Button from '~/design-system/components/button/Button'

import styles from '~/containers/quiz/time-is-up/TimeIsUp.styles'

type TimeLimitReminderProps = {
  open: boolean
  handleStart: () => void
  handleClose: () => void
}

const TimeIsUp = ({
  open,
  handleStart,
  handleClose
}: TimeLimitReminderProps) => {
  const { t } = useTranslation()

  return (
    <Dialog open={open} sx={styles.wrapper}>
      <Box sx={styles.body}>
        <Box sx={styles.titleWrapper}>
          <TimerOutlined sx={styles.icon} />
          <DialogTitle sx={styles.title}>{t('quiz.timeIsUpTitle')}</DialogTitle>
        </Box>
        <DialogContent sx={styles.description}>
          {t('quiz.timeIsUpDescription')}
        </DialogContent>
      </Box>
      <DialogActions sx={styles.actions}>
        <IconButton onClick={handleClose} sx={styles.closeButton}>
          <CloseRounded />
        </IconButton>
        <Button autoFocus onClick={handleStart}>
          {t('quiz.viewResults')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TimeIsUp
