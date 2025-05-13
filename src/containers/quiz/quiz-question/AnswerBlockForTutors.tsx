import { type ChangeEventHandler } from 'react'
import Box from '@mui/material/Box'

import TutorAnswerGrading from './TutorAnswerGrading'
import AnswerBlock from './AnswerBlock'
import { determineQuestionType } from '~/components/question-editor/QuestionEditor.constants'
import { styles } from './Question.styles'
import { type Question } from '~/types'

interface Props {
  question: Question
  value: string | string[] | null
  isEditable?: boolean
  shouldShowAnswersCorrectness?: boolean
  isAnswerCorrect?: boolean
  handleInputChange: ChangeEventHandler
  handleNonInputValueChange: (value: string | string[]) => void
  onGradeChange: (isCorrect: boolean) => void
}

const AnswerBlockForTutor: React.FC<Props> = ({
  question,
  value,
  isEditable,
  shouldShowAnswersCorrectness,
  isAnswerCorrect,
  handleInputChange,
  handleNonInputValueChange,
  onGradeChange
}) => {
  const { isOpenAnswer } = determineQuestionType(question.type)

  if (!isOpenAnswer) {
    return (
      <AnswerBlock
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputValueChange}
        isAnswerCorrect={isAnswerCorrect}
        isEditable={isEditable}
        question={question}
        shouldShowAnswersCorrectness={shouldShowAnswersCorrectness}
        value={value}
      />
    )
  }

  return (
    <Box sx={styles.tutorOpenAnswerContainer}>
      <AnswerBlock
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputValueChange}
        isAnswerCorrect={isAnswerCorrect}
        isEditable={isEditable}
        question={question}
        shouldShowAnswersCorrectness={shouldShowAnswersCorrectness}
        value={value}
      />
      <TutorAnswerGrading
        onUpdate={onGradeChange}
        questionText={question.text}
      />
    </Box>
  )
}

export default AnswerBlockForTutor
