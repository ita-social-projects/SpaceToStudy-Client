import { useAppSelector } from '~/hooks/use-redux'

import PageWrapper from '~/components/page-wrapper/PageWrapper'

import styles from '~/pages/quiz/Quiz.styles'

import { UserRoleEnum } from '~/types'
import { ActiveQuiz, TutorQuiz } from '~/pages/quiz/QuizVariants'

const QuizPage: React.FC = () => {
  const { userRole } = useAppSelector((state) => state.appMain)

  const getQuizVariant = () => {
    if (userRole === UserRoleEnum.Tutor) {
      return <TutorQuiz />
    }

    if (userRole === UserRoleEnum.Student) {
      return <ActiveQuiz />
    }
  }

  const quizVariant = getQuizVariant()

  return <PageWrapper sx={styles.quizzesWrapper}>{quizVariant}</PageWrapper>
}

export default QuizPage
