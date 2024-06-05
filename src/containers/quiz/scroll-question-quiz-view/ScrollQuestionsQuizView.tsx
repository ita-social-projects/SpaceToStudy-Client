import { ChangeEvent, FC } from 'react'
import { Box, SxProps } from '@mui/material'

import { Question, UseFormEventHandler } from '~/types'
import QuizQuestion from '~/containers/quiz/quiz-question/Question'

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
        {...props}
        handleInputChange={handleInputChange(question._id)}
        handleNonInputValueChange={handleNonInputValueChange(question._id)}
        index={index}
        key={question._id}
        question={question}
        showAnswersCorrectness={showAnswersCorrectness}
        showCorrectAnswers={showCorrectAnswers}
        showPoints={showPoints}
        sx={sx?.question}
        value={answers[question._id]}
      />
    )
  })

  return <Box sx={sx?.root}>{questionList}</Box>
}

export default ScrollQuestionsQuizView
