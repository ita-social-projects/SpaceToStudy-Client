import { determineQuestionType } from '~/components/question-editor/QuestionEditor.constants'
import { Question } from '~/types'
import { normalizeString } from './normalize-string'

export const checkAnswerCorrectness = (
  question: Question,
  userAnswer: null | string | string[]
) => {
  const { isMultipleChoice, isSingleChoice, isOpenAnswer } =
    determineQuestionType(question.type)

  const isUnanswered =
    !userAnswer || (Array.isArray(userAnswer) && !userAnswer.length)
  if (isUnanswered) return false

  if (isOpenAnswer) {
    const normalizedUserAnswer = normalizeString(String(userAnswer))
    return question.answers.some(
      (answer) => normalizeString(answer.text) === normalizedUserAnswer
    )
  }

  if (isSingleChoice && typeof userAnswer === 'string') {
    const correctAnswer = question.answers.find((item) => item.isCorrect)
    return (
      normalizeString(correctAnswer?.text ?? '') === normalizeString(userAnswer)
    )
  }

  if (isMultipleChoice && Array.isArray(userAnswer)) {
    const correctAnswers = question.answers
      .filter((item) => item.isCorrect)
      .map((item) => normalizeString(item.text))

    const userAnswersNormalized = userAnswer.map(normalizeString)

    return (
      userAnswersNormalized.length === correctAnswers.length &&
      userAnswersNormalized.every((item) => correctAnswers.includes(item))
    )
  }

  return false
}
