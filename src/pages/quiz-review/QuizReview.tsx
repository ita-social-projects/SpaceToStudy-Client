import { useParams } from 'react-router-dom'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { styles } from '~/pages/quiz-review/QuizPreview.styles'
import { FinishedQuiz } from '~/pages/quiz/QuizVariants'

const QuizReview: React.FC = () => {
  const { attemptId = '' } = useParams()

  return (
    <PageWrapper sx={styles.quizzesWrapper}>
      <FinishedQuiz finishedQuizId={attemptId}></FinishedQuiz>
    </PageWrapper>
  )
}

export default QuizReview
