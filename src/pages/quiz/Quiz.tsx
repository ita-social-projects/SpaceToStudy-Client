import { useState, useCallback } from 'react'
import { useAppSelector } from '~/hooks/use-redux'

import PageWrapper from '~/components/page-wrapper/PageWrapper'

import styles from '~/pages/quiz/Quiz.styles'

import { UserRoleEnum } from '~/types'
import { ActiveQuiz, FinishedQuiz, TutorQuiz } from '~/pages/quiz/QuizVariants'

const QuizPage: React.FC = () => {
  const { userRole } = useAppSelector((state) => state.appMain)

  const [isFinished, setIsFinished] = useState(false)
  const [finishedQuizId, setFinishedQuizId] = useState('')

  const finishQuiz = useCallback((finishedQuizId: string) => {
    setFinishedQuizId(finishedQuizId)
    setIsFinished(true)
  }, [])

  const getQuizVariant = () => {
    if (userRole === UserRoleEnum.Tutor) {
      return <TutorQuiz />
    }

    if (userRole === UserRoleEnum.Student) {
      if (isFinished) {
        return <FinishedQuiz finishedQuizId={finishedQuizId} />
      }

      return <ActiveQuiz finishQuiz={finishQuiz} />
    }
  }

  const quizVariant = getQuizVariant()

  return <PageWrapper sx={styles.quizzesWrapper}>{quizVariant}</PageWrapper>
}

export default QuizPage
