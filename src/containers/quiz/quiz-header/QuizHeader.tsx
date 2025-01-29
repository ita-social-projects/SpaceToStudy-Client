import { useAppSelector } from '~/hooks/use-redux'
import Box from '@mui/material/Box'

import { Question, UserRoleEnum } from '~/types'
import {
  ActiveQuizInfo,
  FinishedQuizInfo,
  UngradedQuizInfo,
  GradedQuizInfo,
  StartViewQuizInfo
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
  isNotStarted: boolean
  quizItems: Question[]
}

const QuizHeader = ({
  isFinished,
  title,
  description,
  points,
  totalPoints,
  isGraded,
  isNotStarted,
  quizItems
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
      {!isFinished && isStudent && !isNotStarted && <ActiveQuizInfo />}
      {isFinished && isStudent && <FinishedQuizInfo />}
      {!isGraded && isTutor && <UngradedQuizInfo />}
      {isGraded && isTutor && (
        <GradedQuizInfo points={points} totalPoints={totalPoints} />
      )}
      {!isFinished && isStudent && isNotStarted && (
        <StartViewQuizInfo questionsAmount={quizItems.length} />
      )}
    </Box>
  )
}

export default QuizHeader
