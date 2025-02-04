import { useTranslation } from 'react-i18next'
import AccessTimeRounded from '@mui/icons-material/AccessTimeRounded'

import QuizDialog from '~/containers/quiz/quiz-dialog/QuizDialog'

type TimeLimitReminderProps = {
  open: boolean
  timeLimit: string
  onStart: () => void
  onClose: () => void
}

const TimeLimitReminder: React.FC<TimeLimitReminderProps> = ({
  open,
  timeLimit,
  onStart,
  onClose
}) => {
  const { t } = useTranslation()

  const translatedTimeLimit = t(timeLimit)

  return (
    <QuizDialog
      actionText='quiz.start'
      description='quiz.timeLimitReminderDescription'
      descriptionParams={{ timeLimit: translatedTimeLimit }}
      icon={<AccessTimeRounded />}
      onAction={onStart}
      onClose={onClose}
      open={open}
      title='quiz.timeLimitReminderTitle'
    />
  )
}

export default TimeLimitReminder
