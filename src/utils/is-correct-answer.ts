import { determineQuestionType } from '~/components/question-editor/QuestionEditor.constants'
import { Question } from '~/types'

export const isCorrectAnswer = (
  question: Question,
  userAnswer: null | string | string[]
) => {
  const { isMultipleChoice, isSingleChoice, isOpenAnswer } =
    determineQuestionType(question.type)

  const isUnanswered =
    !userAnswer || (Array.isArray(userAnswer) && !userAnswer.length)
  if (isUnanswered) return false

  if (isOpenAnswer) {
    if (typeof userAnswer !== 'string') return false
    const correctAnswer = question.answers.find((item) => {
      return item.text.trim() === userAnswer.trim()
    })
    return Boolean(correctAnswer)
  }

  if (isSingleChoice) {
    return question.answers.find((item) => item.isCorrect)?.text === userAnswer
  }

  if (isMultipleChoice && Array.isArray(userAnswer)) {
    const correctAnswers = question.answers.filter((item) => item.isCorrect)

    return (
      userAnswer.length === correctAnswers.length &&
      userAnswer.every(
        (item) =>
          question.answers.find((answerItem) => answerItem.text === item)
            ?.isCorrect
      )
    )
  }
}
