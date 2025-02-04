import TimerOutlined from '@mui/icons-material/TimerOutlined'

import QuizDialog from '~/containers/quiz/quiz-dialog/QuizDialog'

import styles from '~/containers/quiz/time-is-up/TimeIsUp.styles'

type TimeIsUpProps = {
  open: boolean
  onStart: () => void
  onClose: () => void
}

const TimeIsUp: React.FC<TimeIsUpProps> = ({ open, onStart, onClose }) => {
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
