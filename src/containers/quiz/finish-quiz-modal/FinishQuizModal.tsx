import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded'

import QuizDialog from '~/containers/quiz/quiz-dialog/QuizDialog'

type FinishQuizModalProps = {
  open: boolean
  onCancel: () => void
  onFinish: () => void
}

const FinishQuizModal = ({
  open,
  onCancel,
  onFinish
}: FinishQuizModalProps) => {
  return (
    <QuizDialog
      actionText='quiz.confirm'
      description='quiz.warning'
      icon={<ErrorOutlineRounded />}
      onAction={onFinish}
      onSecondaryAction={onCancel}
      open={open}
      secondaryActionText='quiz.cancel'
      title='quiz.areYouSure'
    />
  )
}

export default FinishQuizModal
