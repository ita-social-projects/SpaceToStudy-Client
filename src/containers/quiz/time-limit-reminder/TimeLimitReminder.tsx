import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import AccessTimeRounded from '@mui/icons-material/AccessTimeRounded'
import CloseRounded from '@mui/icons-material/CloseRounded'

import { IconButton } from '~/design-system/components/icon-button/IconButton'
import Button from '~/design-system/components/button/Button'

import styles from '~/containers/quiz/time-limit-reminder/TimeLimitReminder.styles'

type TimeLimitReminderProps = {
  open: boolean
  minutes: number
  handleStart: () => void
  handleClose: () => void
}

const TimeLimitReminder = ({
  open,
  minutes,
  handleStart,
  handleClose
}: TimeLimitReminderProps) => {
  const { t } = useTranslation()

  return (
    <Dialog open={open} sx={styles.wrapper}>
      <Box sx={styles.body}>
        <Box sx={styles.titleWrapper}>
          <AccessTimeRounded />
          <DialogTitle sx={styles.title}>
            {t('quiz.timeLimitReminderTitle')}
          </DialogTitle>
        </Box>
        <DialogContent sx={styles.description}>
          {t('quiz.timeLimitReminderDescription', { minutes })}
        </DialogContent>
      </Box>
      <DialogActions sx={styles.actions}>
        <IconButton onClick={handleClose} sx={styles.closeButton}>
          <CloseRounded />
        </IconButton>
        <Button autoFocus onClick={handleStart}>
          {t('quiz.start')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TimeLimitReminder
