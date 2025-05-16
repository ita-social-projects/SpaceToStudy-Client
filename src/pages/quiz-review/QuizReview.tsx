import { useParams } from 'react-router-dom'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { styles } from '~/pages/quiz-review/QuizReview.styles'
import { Attempt } from '~/pages/quiz/QuizVariants'

const QuizReview: React.FC = () => {
  const { attemptId = '' } = useParams()

  return (
    <PageWrapper sx={styles.quizzesWrapper}>
      <Attempt attemptId={attemptId} />
    </PageWrapper>
  )
}

export default QuizReview
