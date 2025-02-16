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

  return (
    <PageWrapper sx={styles.quizzesWrapper}>
      {userRole === UserRoleEnum.Tutor && <TutorQuiz />}
      {userRole === UserRoleEnum.Student && isFinished && (
        <FinishedQuiz finishedQuizId={finishedQuizId} />
      )}
      {userRole === UserRoleEnum.Student && !isFinished && (
        <ActiveQuiz finishQuiz={finishQuiz} />
      )}
    </PageWrapper>
  )
}

export default QuizPage
