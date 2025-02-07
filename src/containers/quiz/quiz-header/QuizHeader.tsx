import { useAppSelector } from '~/hooks/use-redux'
import Box from '@mui/material/Box'

import {
  type Question,
  type QuizAttempt,
  type QuizTimeLimit,
  UserRoleEnum
} from '~/types'
import {
  ActiveQuizInfo,
  FinishedQuizInfo,
  UngradedQuizInfo,
  GradedQuizInfo,
  StartViewQuizInfo
} from '~/containers/quiz/quiz-info/QuizInfo'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import styles from '~/containers/quiz/quiz-header/QuizHeader.styles'
import { useQuery } from '@tanstack/react-query'
import { ResourceService } from '~/services/resource-service'
import { useParams } from 'react-router-dom'
import { useCallback } from 'react'
import Loader from '~/components/loader/Loader'

type QuizHeaderProps = {
  isFinished: boolean
  title: string
  description: string
  points: number
  totalPoints: number
  isGraded: boolean
  questionsAnswered: number
  createdAt: string
  updatedAt: string
  isNotStarted: boolean
  quizItems: Question[]
  settings: {
    attemptLimit: QuizAttempt
    timeLimit: QuizTimeLimit
  }
  handlePreview: (value: boolean) => void
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  isFinished,
  title,
  description,
  points,
  totalPoints,
  isGraded,
  questionsAnswered,
  createdAt,
  updatedAt,
  isNotStarted,
  quizItems,
  settings,
  handlePreview
}: QuizHeaderProps) => {
  const { userRole } = useAppSelector((state) => state.appMain)
  const isStudent = userRole === UserRoleEnum.Student

  const isTutor = userRole === UserRoleEnum.Tutor
  const { id: cooperationId, quizId } = useParams()

  const getQuizzes = useCallback(() => {
    if (cooperationId && quizId) {
      return ResourceService.getFinishedQuizzesByQuizId(cooperationId, quizId)
    }
  }, [cooperationId, quizId])

  const { data: finishedQuizzes = [], isLoading } = useQuery({
    queryKey: ['quizzes', cooperationId, quizId],
    queryFn: getQuizzes
  })
  if (isLoading || !finishedQuizzes) {
    return <Loader pageLoad size={50} />
  }
  return (
    <Box sx={styles.wrapper}>
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
      {!isFinished && isStudent && !isNotStarted && (
        <ActiveQuizInfo
          questionsAnswered={questionsAnswered}
          totalPoints={totalPoints}
        />
      )}
      {isFinished && isStudent && (
        <FinishedQuizInfo
          createdAt={createdAt}
          points={points}
          totalPoints={totalPoints}
          updatedAt={updatedAt}
        />
      )}
      {!isGraded && isTutor && <UngradedQuizInfo />}
      {isGraded && isTutor && (
        <GradedQuizInfo points={points} totalPoints={totalPoints} />
      )}
      {!isFinished && isStudent && isNotStarted && (
        <StartViewQuizInfo
          attempts={settings.attemptLimit}
          handleStartButton={handlePreview}
          questionsAmount={quizItems.length}
          timeLimit={settings.timeLimit}
          usedAttempts={finishedQuizzes}
        />
      )}
    </Box>
  )
}

export default QuizHeader
