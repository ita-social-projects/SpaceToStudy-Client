import { determineQuestionType } from '~/components/question-editor/QuestionEditor.constants'
import { Question } from '~/types'

export const isCorrectAnswer = (
  question: Question,
  userAnswer: null | string | string[]
) => {
  const { isMultipleChoice, isSingleChoice, isOpenAnswer } =
    determineQuestionType(question.type)

  const normalize = (str: string) => str.trim().toLowerCase()

  const isUnanswered =
    !userAnswer || (Array.isArray(userAnswer) && !userAnswer.length)
  if (isUnanswered) return false

  if (isOpenAnswer) {
    const normalizedUserAnswer = normalize(String(userAnswer))
    return question.answers.some(
      (answer) => normalize(answer.text) === normalizedUserAnswer
    )
  }

  if (isSingleChoice && typeof userAnswer === 'string') {
    const correctAnswer = question.answers.find((item) => item.isCorrect)
    return normalize(correctAnswer?.text || '') === normalize(userAnswer)
  }

  if (isMultipleChoice && Array.isArray(userAnswer)) {
    const correctAnswers = question.answers
      .filter((item) => item.isCorrect)
      .map((item) => normalize(item.text))

    const userAnswersNormalized = userAnswer.map(normalize)

    return (
      userAnswersNormalized.length === correctAnswers.length &&
      userAnswersNormalized.every((item) => correctAnswers.includes(item))
    )
  }

  return false
}
