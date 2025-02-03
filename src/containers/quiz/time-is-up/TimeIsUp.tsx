import TimerOutlined from '@mui/icons-material/TimerOutlined'

import QuizDialog, {
  type QuizDialogProps
} from '~/containers/quiz/quiz-dialog/QuizDialog'

import styles from '~/containers/quiz/time-is-up/TimeIsUp.styles'

type TimeLimitReminderProps = Pick<QuizDialogProps, 'open' | 'onClose'> & {
  onStart: () => void
}

const TimeIsUp = ({ open, onStart, onClose }: TimeLimitReminderProps) => {
  return (
    <QuizDialog
      actionText='quiz.viewResults'
      description='quiz.timeIsUpDescription'
      icon={<TimerOutlined sx={styles.icon} />}
      onAction={onStart}
      onClose={onClose}
      open={open}
      title='quiz.timeIsUpTitle'
    />
  )
}

export default TimeIsUp
