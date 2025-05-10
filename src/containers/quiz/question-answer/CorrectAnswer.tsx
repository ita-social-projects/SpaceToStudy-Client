import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import Answer from '~/containers/quiz/question-answer/Answer'
import { Question, UserRoleEnum } from '~/types'
import { styles } from '~/containers/quiz/quiz-question/Question.styles'

interface CorrectAnswersProps {
  question: Question
  userRole: UserRoleEnum
  isOpenAnswer: boolean
}

const CorrectAnswers: FC<CorrectAnswersProps> = ({
  question,
  userRole,
  isOpenAnswer
}) => {
  const { t } = useTranslation()

  const message = (
    <Typography sx={{ color: 'text.secondary' }}>
      {t(
        userRole === UserRoleEnum.Student
          ? 'myResourcesPage.questions.reviewMessage'
          : 'myResourcesPage.questions.teacherMessage'
      )}
    </Typography>
  )

  const correctAnswers = question.answers
    .filter((answer) => answer.isCorrect)
    .map((answer) => (
      <Answer
        checked
        isCorrect
        isEditable={false}
        key={answer.text}
        label={answer.text}
        shouldShowCorrectness
        text={answer.text}
        type={question.type}
      />
    ))

  return (
    <Box sx={styles.correctAnswers.root}>
      <Typography sx={styles.correctAnswers.title}>
        {t('myResourcesPage.quizzes.correctAnswers')}
      </Typography>
      <Box sx={styles.correctAnswers.list}>
        {isOpenAnswer ? message : correctAnswers}
      </Box>
    </Box>
  )
}

export default CorrectAnswers
