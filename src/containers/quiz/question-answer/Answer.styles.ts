import {
  AnswerStatus,
  AnswerStatusEnum
} from '~/containers/quiz/question-answer/Answer.types'

const getColor = (
  status: AnswerStatus,
  successColor = 'success.main',
  errorColor = 'error.main'
) => {
  const isCorrect = status === AnswerStatusEnum.Correct
  const isIncorrect = status === AnswerStatusEnum.Incorrect

  const answeredStatusColor = isCorrect ? successColor : errorColor

  const isAnswered = isCorrect || isIncorrect
  const color = isAnswered ? answeredStatusColor : undefined

  return color
}

export const styles = {
  root: (status: AnswerStatus, isOpenAnswer: boolean) => {
    const bgcolor = getColor(status, 'success.50', 'error.50')

    return {
      p: isOpenAnswer ? undefined : '4px 12px 7px 3px',
      borderRadius: 2,
      display: 'flex',
      alignItems: 'center',
      bgcolor
    }
  },
  label: {
    m: '0px',
    flex: '1'
  },
  icon: (status: AnswerStatus) => {
    const color = getColor(status, 'success.50', 'error.50')

    return {
      color
    }
  }
}
