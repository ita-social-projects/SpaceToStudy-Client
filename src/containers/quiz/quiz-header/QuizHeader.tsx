import { useAppSelector } from '~/hooks/use-redux'
import Box from '@mui/material/Box'

import { UserRoleEnum } from '~/types'
import {
  ActiveQuizInfo,
  FinishedQuizInfo,
  UngradedQuizInfo,
  GradedQuizInfo
} from '~/containers/quiz/quiz-info/QuizInfo'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import styles from '~/containers/quiz/quiz-header/QuizHeader.styles'

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
}

const QuizHeader = ({
  isFinished,
  title,
  description,
  points,
  totalPoints,
  isGraded,
  questionsAnswered,
  createdAt,
  updatedAt
}: QuizHeaderProps) => {
  const { userRole } = useAppSelector((state) => state.appMain)

  const isStudent = userRole === UserRoleEnum.Student

  const isTutor = userRole === UserRoleEnum.Tutor

  return (
    <Box sx={styles.wrapper}>
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
      {!isFinished && isStudent && (
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
    </Box>
  )
}

export default QuizHeader
