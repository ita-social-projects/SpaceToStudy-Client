import { ChangeEvent, FC } from 'react'

import Box from '@mui/material/Box'
import { SxProps } from '@mui/material/styles'

import QuizQuestion from '~/containers/quiz/quiz-question/Question'
import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/containers/quiz/scroll-question-quiz-view/ScrollQuestionsQuizView.styles'
import { Question, UseFormEventHandler } from '~/types'

export interface QuizViewProps {
  questions: Question[]
  handleInputChange: UseFormEventHandler<
    Record<string, string | string[]>,
    ChangeEvent<HTMLInputElement>
  >
  handleNonInputValueChange: (key: string) => (value: string | string[]) => void
  answers: Record<string, string | string[]>
  isEditable?: boolean
  showCorrectAnswers?: boolean
  showPoints?: boolean
  showAnswersCorrectness?: boolean
  sx?: { root?: SxProps; question?: SxProps }
}

const ScrollQuestionsQuizView: FC<QuizViewProps> = ({
  questions,
  handleInputChange,
  handleNonInputValueChange,
  answers,
  sx,
  showCorrectAnswers = false,
  showPoints = false,
  showAnswersCorrectness = false,
  ...props
}) => {
  const questionList = questions.map((question, index) => {
    return (
      <QuizQuestion
        handleInputChange={handleInputChange(question._id)}
        handleNonInputValueChange={handleNonInputValueChange(question._id)}
        index={index}
        key={question._id}
        question={question}
        showAnswersCorrectness={showAnswersCorrectness}
        showCorrectAnswers={showCorrectAnswers}
        showPoints={showPoints}
        sx={spliceSx(styles.question, sx?.question)}
        value={answers[question._id]}
        {...props}
      />
    )
  })

  return <Box sx={sx?.root}>{questionList}</Box>
}

export default ScrollQuestionsQuizView
