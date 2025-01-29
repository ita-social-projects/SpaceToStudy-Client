import Box from '@mui/material/Box'

import SelectableQuestionQuizView from '~/containers/quiz/selectable-question-quiz-view/SelectableQuestionQuizView'
import ScrollQuestionsQuizView from '~/containers/quiz/scroll-question-quiz-view/ScrollQuestionsQuizView'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/containers/my-quizzes/view-quiz-container/ViewQuizContainer.styles'
import { QuizContentProps } from '~/pages/new-quiz/NewQuiz.constants'

import { QuizViewEnum, CreateQuizParams } from '~/types'

const ViewQuizContainer = ({
  data,
  handleInputChange,
  handleNonInputValueChange
}: QuizContentProps) => {
  const handleNonInputChange =
    <K extends keyof CreateQuizParams>(key: K) =>
    (value: CreateQuizParams[K]) => {
      handleNonInputValueChange(key, value)
    }

  const questionsView =
    data.settings.view === QuizViewEnum.Stepper ? (
      <SelectableQuestionQuizView
        answers={data}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputChange}
        questions={data.items}
      />
    ) : (
      <ScrollQuestionsQuizView
        answers={data}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputChange}
        questions={data.items}
        sx={styles.questionWrapper}
      />
    )

  return (
    <Box>
      <TitleWithDescription
        description={data.description}
        style={styles.titleWithDescription}
        title={data.title}
      />
      {questionsView}
    </Box>
  )
}

export default ViewQuizContainer
