import Box from '@mui/material/Box'

import {
  ActiveQuizInfo,
  FinishedQuizInfo,
  TutorQuizInfo
} from '~/containers/quiz/quiz-info/QuizInfo'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import styles from '~/containers/quiz/quiz-header/QuizHeader.styles'

type QuizHeaderProps = {
  title: string
  description: string
  points: number
  totalPoints: number
  questionsAnswered?: number
  createdAt: string
  updatedAt: string
  hasTimeLimit?: boolean
  initialTime?: number
  onTimeEnd?: () => void
  type: 'active' | 'finished' | 'tutor'
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  title,
  description,
  points,
  totalPoints,
  questionsAnswered,
  createdAt,
  updatedAt,
  hasTimeLimit = false,
  initialTime = 0,
  type,
  onTimeEnd
}) => {
  const getQuizInfoVariant = () => {
    if (type === 'active') {
      return (
        <ActiveQuizInfo
          hasTimeLimit={hasTimeLimit}
          initialTime={initialTime}
          onTimeEnd={onTimeEnd}
          questionsAnswered={questionsAnswered ?? 0}
          totalPoints={totalPoints}
        />
      )
    }

    if (type === 'finished') {
      return (
        <FinishedQuizInfo
          createdAt={createdAt}
          points={points}
          totalPoints={totalPoints}
          updatedAt={updatedAt}
        />
      )
    }

    if (type === 'tutor') {
      return <TutorQuizInfo points={points} totalPoints={totalPoints} />
    }
  }

  const quizInfoVariant = getQuizInfoVariant()

  return (
    <Box sx={styles.wrapper}>
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
      {quizInfoVariant}
    </Box>
  )
}

export default QuizHeader
