import Box from '@mui/material/Box'

import SelectableQuestionQuizView from '~/containers/quiz/selectable-question-quiz-view/SelectableQuestionQuizView'
import ScrollQuestionsQuizView from '~/containers/quiz/scroll-question-quiz-view/ScrollQuestionsQuizView'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import useForm from '~/hooks/use-form'

import { styles } from '~/containers/my-quizzes/view-quiz-container/ViewQuizContainer.styles'
import { QuizContentProps } from '~/pages/new-quiz/NewQuiz.constants'
import { defaultResponses } from '~/constants'

import { QuizViewEnum } from '~/types'

const ViewQuizContainer = ({
  questions,
  title,
  description,
  settings
}: QuizContentProps) => {
  const { data, handleInputChange, handleNonInputValueChange } = useForm<
    Record<string, string | string[]>
  >({
    initialValues: defaultResponses.object
  })

  const handleNonInputChange = (key: string) => (value: string | string[]) => {
    handleNonInputValueChange(key, value)
  }

  const questionsView =
    settings.view === QuizViewEnum.Stepper ? (
      <SelectableQuestionQuizView
        answers={data}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputChange}
        questions={questions}
      />
    ) : (
      <ScrollQuestionsQuizView
        answers={data}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputChange}
        questions={questions}
        sx={styles.questionWrapper}
      />
    )

  return (
    <Box>
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
      {questionsView}
    </Box>
  )
}

export default ViewQuizContainer
