import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import QuizQuestion from '~/containers/my-quizzes//scroll-question/ScrollQuestions'

import { QuizViewProps } from '~/types'
import { styles } from '~/containers/my-quizzes/scroll-question-quiz-view/ScrollQuestionsQuizView.styles'

const ScrollQuestionsQuizView: FC<QuizViewProps> = ({ questions }) => {
  const questionList = questions.map((question, index) => (
    <QuizQuestion index={index} key={question._id} question={question} />
  ))

  return (
    <Box>
      <Typography sx={styles.description}>
        Lorem ipsum dolor sit amet consectetur. Elementum at diam vulputate
        suspendisse nulla tortor tempor odio tortor. Eu eleifend quam eget et
        nulla.
      </Typography>
      <Box>{questionList}</Box>
    </Box>
  )
}

export default ScrollQuestionsQuizView
