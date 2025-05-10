import { FC, ChangeEventHandler } from 'react'
import FormGroup from '@mui/material/FormGroup'
import RadioGroup from '@mui/material/RadioGroup'
import { determineQuestionType } from '~/components/question-editor/QuestionEditor.constants'
import Answer from '~/containers/quiz/question-answer/Answer'
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
}

const QuestionAnswersBlock: FC<Props> = ({
  question,
  value,
  isEditable,
  shouldShowAnswersCorrectness,
  isAnswerCorrect,
  handleInputChange,
  handleNonInputValueChange
}) => {
  const { type, answers } = question

  const formattedValue = Array.isArray(value)
    ? value.map((v) => v.toLowerCase())
    : typeof value === 'string'
      ? [value.toLowerCase()]
      : []

  const { isMultipleChoice, isOpenAnswer } = determineQuestionType(type)

  const answerSx =
    isAnswerCorrect === undefined
      ? {}
      : { backgroundColor: isAnswerCorrect ? 'success.50' : 'error.50' }

  if (isOpenAnswer) {
    return (
      <Answer
        isCorrect={isAnswerCorrect}
        isEditable={isEditable}
        label={question.text}
        onTextInputChange={handleInputChange}
        shouldShowCorrectness={shouldShowAnswersCorrectness}
        sx={answerSx}
        text={question.text}
        type={type}
        value={typeof value === 'string' ? value : ''}
      />
    )
  }

  const answersList = answers.map((answer) => {
    const isChecked = formattedValue.includes(answer.text.toLowerCase())

    const handleChange = () => {
      if (isMultipleChoice) {
        const prev = (value as string[]) ?? []
        const newValue = prev.includes(answer.text)
          ? prev.filter((item) => item !== answer.text)
          : [...prev, answer.text]

        handleNonInputValueChange(newValue)
      } else {
        handleNonInputValueChange(answer.text)
      }
    }

    return (
      <Answer
        checked={isChecked}
        isCorrect={answer.isCorrect}
        isEditable={isEditable}
        key={answer.text}
        label={answer.text}
        onCheckboxChange={handleChange}
        shouldShowCorrectness={shouldShowAnswersCorrectness}
        text={answer.text}
        type={type}
        value={answer.text}
      />
    )
  })

  return isMultipleChoice ? (
    <FormGroup sx={styles.answersContainer}>{answersList}</FormGroup>
  ) : (
    <RadioGroup sx={styles.answersContainer}>{answersList}</RadioGroup>
  )
}

export default QuestionAnswersBlock
