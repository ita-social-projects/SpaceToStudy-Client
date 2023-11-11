import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// import SelectableQuestionQuizView from '~/containers/my-quizzes/selectable-question-quiz-view/SelectableQuestionQuizView'

import ScrollQuestionsQuizView from '~/containers/my-quizzes/scroll-question-quiz-view/ScrollQuestionsQuizView'

import { styles } from '~/containers/my-quizzes/view-quiz-container/ViewQuizContainer.styles'
import { QuizContentProps } from '~/pages/new-quiz/NewQuiz.constants'

const ViewQuizContainer = ({ questions }: QuizContentProps) => {
  return (
    <Box>
      <Typography sx={styles.title}>
        Lorem ipsum dolor sit amet consectetur
      </Typography>
      {/* <SelectableQuestionQuizView questions={questions} /> */}
      <ScrollQuestionsQuizView questions={questions} />
    </Box>
  )
}

export default ViewQuizContainer
