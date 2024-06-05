import { questionType } from '~/components/question-editor/QuestionEditor.constants'
import { Question } from '~/types'

interface GetQuestionStatusParams {
  question: Question
  answer: null | string | string[]
  showAnswersCorrectness: boolean
}

export const isCorrectAnswer = (
  question: Question,
  answer: null | string | string[]
) => {
  if (!answer) return false
  const { isMultipleChoice, isOpenAnswer } = questionType(question.type)

  if (isOpenAnswer) {
    return true
  } else if (isMultipleChoice && Array.isArray(answer)) {
    const correctAnswers = question.answers.filter((item) => item.isCorrect)

    return (
      answer.every(
        (item) => question.answers.find((i) => i.text === item)?.isCorrect
      ) && answer.length === correctAnswers.length
    )
  } else {
    return question.answers.find((item) => item.isCorrect)?.text === answer
  }
}

export const getQuestionStatus = ({
  answer,
  question,
  showAnswersCorrectness
}: GetQuestionStatusParams) => {
  const isAnswered = Boolean(answer)

  const isCorrect = isAnswered && isCorrectAnswer(question, answer)
  const baseState = isCorrect ? 'correct' : 'incorrect'
  const shouldShowState = isAnswered || showAnswersCorrectness
  const answeredState = showAnswersCorrectness ? baseState : 'answered'

  return shouldShowState ? answeredState : 'unanswered'
}
