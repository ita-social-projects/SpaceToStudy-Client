import { AnswerStatus, AnswerStatusEnum } from '~/containers/quiz/question-answer/Answer.types'

export const styles = {
  root: (status: AnswerStatus, isOpenAnswer: boolean) => {
    const isCorrect = status === AnswerStatusEnum.Correct
    const isIncorrect = status === AnswerStatusEnum.Incorrect

    const unsweredStatusColor = isCorrect ? 'success.50' : 'error.50'

    const bgcolor = isCorrect || isIncorrect ? unsweredStatusColor : undefined

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
    const isCorrect = status === AnswerStatusEnum.Correct
    const isIncorrect = status === AnswerStatusEnum.Incorrect

    const unsweredStatusColor = isCorrect ? 'success.main' : 'error.main'

    const color = isCorrect || isIncorrect ? unsweredStatusColor : undefined

    return {
      color
    }
  }
}
