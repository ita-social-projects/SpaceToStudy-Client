import { determineQuestionType } from '~/components/question-editor/QuestionEditor.constants'
import { Question } from '~/types'

export const countPoints = (
  questions: Question[],
  answers: Record<string, string | string[]>
) => {
  const result = questions.map((item) => {
    const userAnswer = answers[item._id]

    const { isMultipleChoice, isSingleChoice, isOpenAnswer } =
      determineQuestionType(item.type)
    if (!userAnswer) return false

    if (isOpenAnswer) {
      return item.answers.some(
        (answer) => answer.text.trim() === String(userAnswer).trim()
      )
    }

    if (isSingleChoice) {
      return item.answers.find((item) => item.isCorrect)?.text === userAnswer
    }

    const isMultiple = isMultipleChoice && Array.isArray(userAnswer)

    if (isMultiple) {
      const correctAnswers = item.answers.filter((item) => item.isCorrect)

      return (
        userAnswer.length === correctAnswers.length &&
        userAnswer.every(
          (item) =>
            correctAnswers.find((answerItem) => answerItem.text === item)
              ?.isCorrect
        )
      )
    }
  })

  const points = result.reduce((acc, item) => (item ? acc + 1 : acc), 0)

  return points
}
