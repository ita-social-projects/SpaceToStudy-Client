import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { styles } from '~/containers/quiz/quiz-question/Question.styles'
import { AnswerStatusEnum } from '~/containers/quiz/question-answer/Answer.types'

interface Props {
  isCorrect?: boolean
  shouldShow: boolean
}

const AnswerCorrectnessIcon: React.FC<Props> = ({ isCorrect, shouldShow }) => {
  if (!shouldShow || isCorrect === undefined) return null

  return isCorrect ? (
    <CheckIcon sx={styles.icon(AnswerStatusEnum.Correct)} />
  ) : (
    <CloseIcon sx={styles.icon(AnswerStatusEnum.Incorrect)} />
  )
}

export default AnswerCorrectnessIcon
