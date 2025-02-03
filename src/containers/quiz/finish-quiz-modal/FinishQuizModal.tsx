import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded'

import QuizDialog, {
  type QuizDialogProps
} from '~/containers/quiz/quiz-dialog/QuizDialog'

type FinishQuizModalProps = Pick<QuizDialogProps, 'open'> & {
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
